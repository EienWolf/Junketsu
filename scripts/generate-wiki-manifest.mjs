import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener equivalente de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WIKI_DIR = path.join(__dirname, '../public/assets/wiki');
const MANIFEST_PATH = path.join(WIKI_DIR, 'manifest.json');
const GLOSSARY_PATH = path.join(WIKI_DIR, 'glossary.md');

function extractMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const commentMatches = [...content.matchAll(/<!--([\s\S]*?)-->/g)];
    const metadata = {
      description: '',
      category: '',
      type: '',
      tags: [],
      aliases: [],
      roll: '',
      rollEnemy: '',
      stat: '',
      trigger: '',
      great_success: '',
      cost: '',
      repeat: '',
      exclude: '',
      notes: '',
      custom: {},
      hasContent: false,
    };

    // Procesar todos los comentarios
    const allComments = commentMatches.map((match) => match[1].trim());
    let lastGenericComment = '';

    for (const comment of allComments) {
      if (comment.match(/^.*:.*$/)) {
        const [key, ...values] = comment.split(':');
        const value = values.join(':').trim();

        switch (key.toLowerCase()) {
          case 'description':
            metadata.description = value;
            break;
          case 'cost':
            metadata.cost = value;
            break;
          case 'great_success':
            metadata.great_success = value;
            break;
          case 'category':
            metadata.category = value;
            break;
          case 'type':
            metadata.type = value;
            break;
          case 'detonante':
            metadata.trigger = value;
            break;
          case 'stat':
            metadata.stat = value;
            break;
          case 'tirada':
            metadata.roll = value;
            break;
          case 'tirada enemiga':
            metadata.rollEnemy = value;
            break;
          case 'repeat':
            metadata.repeat = value;
            break;
          case 'exclude':
            metadata.exclude = value;
            break;
          case 'notes':
            metadata.notes = value;
            break;
          case 'tags':
            metadata.tags = value.split(',').map((t) => t.trim());
            break;
          case 'aliases':
            metadata.aliases = value
              .split(',')
              .map((alias) => generateAliases(alias.trim()))
              .flat()
              .filter((v, i, a) => a.indexOf(v) === i);
            break;
          default:
            metadata.custom[key.trim()] = value;
        }
      } else {
        lastGenericComment = comment;
      }
    }

    if (!metadata.description && lastGenericComment) {
      metadata.description = lastGenericComment;
    }

    metadata.description = metadata.description
      .replace(/\n+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    // Verificar si hay contenido real aparte de los comentarios
    const contentWithoutComments = content
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
    metadata.hasContent = contentWithoutComments.length > 10;

    return metadata;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return {
      description: '',
      aliases: [],
      custom: {},
      hasContent: false,
    };
  }
}

function generateAliases(alias) {
  const baseName = alias.replace('.md', '');
  return [
    baseName,
    baseName.replace(/-/g, ' '),
    baseName.replace(/-/g, '_'),
    baseName.toLowerCase(),
    baseName.replace(/[^a-z0-9]/gi, ''),
  ].filter((value, index, self) => self.indexOf(value) === index);
}

function generateManifest(dir = WIKI_DIR, baseRoute = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...generateManifest(fullPath, `${baseRoute}${entry.name}/`));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const id = entry.name.replace('.md', '');
      const metadata = extractMetadata(fullPath);

      result.push({
        id: id,
        aliases: [...generateAliases(entry.name), ...metadata.aliases].filter(
          (v, i, a) => a.indexOf(v) === i,
        ),
        route: baseRoute,
        ...metadata,
      });
    }
  }
  return result;
}

function generateLLMGlossary(manifest) {
  // 1. Agrupar por categorías principales
  const grouped = manifest.reduce((acc, entry) => {
    acc[entry.category] = acc[entry.category] || [];
    acc[entry.category].push(entry);
    return acc;
  }, {});

  // 2. Generar estructura delimitada
  return Object.entries(grouped)
    .map(([category, entries]) => {
      if (category == '') {
        return '';
      }
      const categoryHeader = `[CATEGORÍA] ${category}`;
      const entriesText = entries
        .map((entry) => {
          const custom = [];
          custom.push(`[[${entry.id}]]`);
          custom.push(`[TIPO] ${entry.type}`);
          if (entry.type.toLowerCase() == 'skill') {
            custom.push(`<<Stat>> ${entry.stat}`);
          }
          if (
            (entry.type.toLowerCase() == 'accion simple') |
            (entry.type.toLowerCase() == 'reaction') |
            (entry.type.toLowerCase() == 'attack')
          ) {
            custom.push(`<<COSTO>> ${entry.cost}`);
          }
          if (entry.type.toLowerCase() == 'accion simple') {
            // custom.push(`<<REPETIR>> ${entry.repeat}`);
            // custom.push(`<<EXCLUSIÓN>> ${entry.exclude}`);
          }
          if (entry.type.toLowerCase() == 'reaccion') {
            custom.push(`<<Detonante>> ${entry.trigger}`);
          }
          if (
            (entry.type.toLowerCase() == 'reaccion') |
            (entry.type.toLowerCase() == 'attack')
          ) {
            custom.push(`<<Tirada>> ${entry.roll}`);
            custom.push(`<<Tirada Enemiga>> ${entry.rollEnemy}`);
            custom.push(`<<Super Exito>> ${entry.great_success}`);
          }
          const tags = entry.tags
            .map((t) => `${t.replace(/\s/g, '_')}`)
            .join(' | ');
          custom.push(`[TAGS] ${tags}`);
          custom.push(`[Efecto] ${entry.description}`);
          if (entry.notes) {
            custom.push(`[Notas] ${entry.notes}`);
          }
          custom.push('----');
          return custom.join('\n');
        })
        .join('\n');

      return `${categoryHeader}\n${entriesText}\n[/CATEGORÍA]\n`;
    })
    .join('\n');
}

const manifest = generateManifest();
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log('Manifest generated successfully!');

const glossaryContent = generateLLMGlossary(manifest);
fs.writeFileSync(GLOSSARY_PATH, glossaryContent);
console.log('Glossary generated successfully!');
