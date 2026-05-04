const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace the import
    // Matches `import { ..., motion, ... } from 'framer-motion'`
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]framer-motion['"]/g, (match, p1) => {
        const parts = p1.split(',').map(s => s.trim());
        const newParts = parts.map(p => p === 'motion' ? 'm' : p);
        return `import { ${newParts.join(', ')} } from 'framer-motion'`;
    });

    // Replace JSX tags
    content = content.replace(/<motion\./g, '<m.');
    content = content.replace(/<\/motion\./g, '</m.');

    // Replace motion(Component)
    content = content.replace(/\bmotion\(/g, 'm(');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            replaceInFile(fullPath);
        }
    }
}

walk(dir);
console.log('Done replacing motion with m.');
