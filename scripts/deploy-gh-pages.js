import git from 'isomorphic-git';
import defaultHttp from 'isomorphic-git/http/node';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const args = process.argv.slice(2);

const repoUrl = args[0] || 'https://github.com/Balwantsingh10/amrit-mati.git';
const token = args[1];

// Copy index.html to 404.html for GitHub Pages SPA routing
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
}

// Custom HTTP wrapper with 5-minute timeout for large video packs
const customHttp = {
  async request(params) {
    params.fetchOptions = {
      ...params.fetchOptions,
      timeout: 300000
    };
    return defaultHttp.request(params);
  }
};

async function deployToGhPages() {
  console.log('Preparing dist directory for GitHub Pages deployment...');

  // Initialize git in dist folder if not already
  const distGitDir = path.join(distDir, '.git');
  if (fs.existsSync(distGitDir)) {
    fs.rmSync(distGitDir, { recursive: true, force: true });
  }

  await git.init({ fs, dir: distDir, defaultBranch: 'gh-pages' });

  // Add all files in dist
  const filesToAdd = [];
  function walk(currentDir) {
    const list = fs.readdirSync(currentDir);
    for (const item of list) {
      if (item === '.git') continue;
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        const relPath = path.relative(distDir, fullPath).replace(/\\/g, '/');
        filesToAdd.push(relPath);
      }
    }
  }

  walk(distDir);
  for (const filepath of filesToAdd) {
    await git.add({ fs, dir: distDir, filepath });
  }

  await git.commit({
    fs,
    dir: distDir,
    author: {
      name: 'GitHub Pages Deployer',
      email: 'deploy@amritmati.in'
    },
    message: `Deploy to GitHub Pages: ${new Date().toISOString()}`
  });

  console.log(`Setting remote origin: ${repoUrl}`);
  await git.addRemote({ fs, dir: distDir, remote: 'origin', url: repoUrl, force: true });

  console.log('Pushing to gh-pages branch...');
  const pushResult = await git.push({
    fs,
    http: customHttp,
    dir: distDir,
    remote: 'origin',
    ref: 'gh-pages',
    force: true,
    onProgress: (evt) => {
      if (evt.phase) {
        console.log(`Progress: ${evt.phase} ${evt.loaded || ''}/${evt.total || ''}`);
      }
    },
    onAuth: () => ({ username: token || 'git', password: token || '' })
  });

  console.log('✓ Successfully deployed to gh-pages branch!', JSON.stringify(pushResult, null, 2));
}

deployToGhPages().catch(console.error);
