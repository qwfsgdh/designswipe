const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full.includes('.git')) continue;
      if (full.includes('node_modules')) continue;
      walk(full);
    } else {
      if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        let s = fs.readFileSync(full, 'utf8');
        const before = s;
        s = s.replace(/(["'])(@?[A-Za-z0-9_\/\.\-]+)@[0-9]+(?:\.[0-9]+)*(?:-[A-Za-z0-9\.\-]+)?(["'])/g, '$1$2$3');
        if (s !== before) {
          fs.writeFileSync(full, s, 'utf8');
          console.log('patched', full);
        }
      }
    }
  }
}

walk(process.cwd());
console.log('done');
