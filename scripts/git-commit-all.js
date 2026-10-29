import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

const dir = process.cwd();
const message = process.argv.slice(2).join(' ') || `Update: ${new Date().toISOString()}`;

async function commitAll() {
  const filesToAdd = [];

  function walk(currentDir) {
    const list = fs.readdirSync(currentDir);
    for (const item of list) {
      if (item === 'node_modules' || item === '.git' || item === 'dist' || item === '.oxlintrc.json') {
        continue;
      }
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const relPath = path.relative(dir, fullPath).replace(/\\/g, '/');
        filesToAdd.push(relPath);
      }
    }
  }

  walk(dir);
  for (const filepath of filesToAdd) {
    await git.add({ fs, dir, filepath });
  }

  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Amrit Mati Developer',
      email: 'dev@amritmati.in'
    },
    message
  });

  console.log(`Committed changes (${sha.slice(0, 7)}): "${message}"`);
}

commitAll().catch(console.error);
