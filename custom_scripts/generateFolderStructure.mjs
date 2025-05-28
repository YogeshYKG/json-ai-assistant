// generateFolderStructure.mjs 

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ignore from 'ignore';

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..'); // One level up from script
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/documents/folderStructure');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'folderStructure.md');
const IGNORE_FILE = path.join(PROJECT_ROOT, '.gitignore');

const ig = ignore();
if (fs.existsSync(IGNORE_FILE)) {
  ig.add(fs.readFileSync(IGNORE_FILE).toString());
}
ig.add(['node_modules', '.git']); // extra ignore rules

/**
 * Recursively builds a markdown tree.
 */
function buildTree(dir, indent = '') {
  const entries = fs.readdirSync(dir).filter(entry => {
    const relativePath = path.relative(PROJECT_ROOT, path.join(dir, entry));
    return !ig.ignores(relativePath);
  });

  entries.sort((a, b) => a.localeCompare(b));

  let md = '';

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(PROJECT_ROOT, fullPath);
    const isDir = fs.statSync(fullPath).isDirectory();
    const emoji = isDir ? '📁' : '📄';

    md += `${indent}- ${emoji} \`${entry}\`\n`;

    if (isDir) {
      md += buildTree(fullPath, indent + '  ');
    }
  }

  return md;
}

// Header
const timestamp = new Date().toLocaleString();
const header = `## 📂 Folder Structure\n> Generated on \`${timestamp}\`\n\n`;

// Build output
const structure = buildTree(PROJECT_ROOT);
const finalMd = header + structure;

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Write to file
fs.writeFileSync(OUTPUT_FILE, finalMd, 'utf8');

console.log(`✅ Folder structure saved to: ${OUTPUT_FILE}`);