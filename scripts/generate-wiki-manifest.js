const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '../public/assets/wiki');
const MANIFEST_PATH = path.join(WIKI_DIR, 'manifest.json');

function generateManifest(dir = WIKI_DIR, baseRoute = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...generateManifest(fullPath, `${baseRoute}${entry.name}/`));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const id = entry.name.replace('.md', '');
      result.push({
        id: id,
        route: baseRoute,
      });
    }
  }
  return result;
}

const manifest = generateManifest();
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log('Manifest generated successfully!');
