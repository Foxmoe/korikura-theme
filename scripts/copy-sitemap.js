import fs from 'fs-extra';
import path from 'path';

const root = process.cwd();

const candidates = [
  'dist/client/sitemap-index.xml',
  'dist/sitemap-index.xml',
  'dist/client/sitemap-0.xml',
  'dist/sitemap-0.xml'
];

const source = candidates
  .map(p => path.join(root, p))
  .find(fs.existsSync);

if (!source) {
  console.log('[korikura] sitemap-index.xml not found.');
  process.exit(1);
}

const target = path.join(path.dirname(source), 'sitemap.xml');

fs.copySync(source, target);

console.log('[korikura] sitemap.xml generated from:', source);
