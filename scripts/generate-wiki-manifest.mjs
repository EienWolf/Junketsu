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
      aliases: [],
      custom: {},
      hasContent: false, // Nueva propiedad
    };

    // Procesar todos los comentarios
    const allComments = commentMatches.map((match) => match[1].trim());
    let lastGenericComment = '';

    for (const comment of allComments) {
      if (comment.match(/^\w+:/)) {
        const [key, ...values] = comment.split(':');
        const value = values.join(':').trim();

        switch (key.toLowerCase()) {
          case 'description':
            metadata.description = value;
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
        description: metadata.description,
        hasContent: metadata.hasContent, // Se agrega la propiedad al manifiesto
        ...metadata.custom,
      });
    }
  }
  return result;
}

function generateGlossary(manifest) {
  // Agrupar entradas por ruta
  const grouped = manifest.reduce((acc, entry) => {
    const category = entry.route.replace('es/', '').replace(/\//g, ' > ');
    if (!acc[category]) acc[category] = [];
    acc[category].push(entry);
    return acc;
  }, {});

  let glossary = '# Glosario de Acciones y Estados\n\n';

  for (const [category, entries] of Object.entries(grouped)) {
    glossary += `## ${category.toUpperCase()}\n\n`;

    for (const entry of entries) {
      glossary += `### ${entry.id}\n`;

      if (entry.description) {
        const cleanDescription = entry.description
          .replace(/\n/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
        glossary += `- Descripción: ${cleanDescription}\n`;
      }

      // if (Object.keys(entry.custom).length > 0) {
      //   glossary += `- Custom:\n${Object.entries(entry.custom)
      //     .map(([k, v]) => `  - ${k}: ${v}`)
      //     .join('\n')}\n`;
      // }
    }
  }

  return glossary;
}

function generateLLMGlossary(manifest) {
  return manifest
    .map((entry) => {
      const cleanDescription = entry.description
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();

      return `[ENTRY]
ID: ${entry.id}
DESCRIPTION: ${cleanDescription}
[/ENTRY]`;
    })
    .join('\n\n');
}

const manifest = generateManifest();
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log('Manifest generated successfully!');

const glossaryContent = generateGlossary(manifest);
fs.writeFileSync(GLOSSARY_PATH, glossaryContent);
console.log('Glossary generated successfully!');
