const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '../public/assets/wiki');
const MANIFEST_PATH = path.join(WIKI_DIR, 'manifest.json');

function extractMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const commentMatches = [...content.matchAll(/<!--([\s\S]*?)-->/g)];
    const metadata = {
      description: '',
      aliases: [],
      custom: {},
    };

    // Procesar todos los comentarios
    const allComments = commentMatches.map((match) => match[1].trim());
    let lastGenericComment = '';

    for (const comment of allComments) {
      // Detectar comentarios con formato clave:valor
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
              .map((a) => a.trim())
              .filter(Boolean);
            break;
          default:
            metadata.custom[key.trim()] = value;
        }
      } else {
        // Guardar el último comentario genérico sin formato clave:valor
        lastGenericComment = comment;
      }
    }

    // Prioridad para la descripción:
    // 1. Comentario con formato description:
    // 2. Último comentario genérico
    // 3. Cadena vacía si no hay ninguno
    if (!metadata.description && lastGenericComment) {
      metadata.description = lastGenericComment;
    }

    // Limpieza final de la descripción
    metadata.description = metadata.description
      .replace(/\n+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    return metadata;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return {
      description: '',
      aliases: [],
      custom: {},
    };
  }
}

function generateAliases(alias) {
  const baseName = filename.replace('.md', '');
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
        ...metadata.custom,
      });
    }
  }
  return result;
}

const manifest = generateManifest();
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log('Manifest generated successfully!');
