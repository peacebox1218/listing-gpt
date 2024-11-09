const fs = require('fs');
const path = require('path');

const targetDir = process.cwd();
console.log('Current directory:', targetDir);
console.log('\nDirectory structure:');

function listDir(dir, indent = '') {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stats = fs.statSync(fullPath);
      console.log(`${indent}${stats.isDirectory() ? '📁' : '📄'} ${file}`);
      if (stats.isDirectory()) {
        listDir(fullPath, `${indent}  `);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
}

listDir(targetDir);
