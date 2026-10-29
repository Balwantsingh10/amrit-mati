import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

const dir = process.cwd();

async function initAndCommit() {
  console.log('Initializing git repository in:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  // Get list of all files to add (excluding node_modules, dist, etc.)
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
  console.log(`Adding ${filesToAdd.length} files to git index...`);

  for (const filepath of filesToAdd) {
    await git.add({ fs, dir, filepath });
  }

  console.log('Creating initial commit on main branch...');
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Amrit Mati Developer',
      email: 'dev@amritmati.in'
    },
    message: 'Initial commit: Amrit Mati premium Indian pantry ecommerce with video & CI/CD'
  });

  console.log('Successfully committed! Commit SHA:', sha);
}

initAndCommit().catch(console.error);
