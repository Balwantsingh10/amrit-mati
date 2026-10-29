import git from 'isomorphic-git';
import defaultHttp from 'isomorphic-git/http/node';
import fs from 'fs';

const dir = process.cwd();
const args = process.argv.slice(2);

const repoUrl = args[0];
const token = args[1];

if (!repoUrl) {
  console.log(`
Usage:
  node scripts/git-push.js <GITHUB_REPO_URL> [GITHUB_PERSONAL_ACCESS_TOKEN]
`);
  process.exit(1);
}

// Custom HTTP wrapper with 5-minute timeout for large video packs
const customHttp = {
  async request(params) {
    params.fetchOptions = {
      ...params.fetchOptions,
      timeout: 300000 // 5 minutes timeout for 8MB video upload
    };
    return defaultHttp.request(params);
  }
};

async function pushToGithub() {
  console.log(`Setting remote origin: ${repoUrl}`);
  try {
    await git.addRemote({ fs, dir, remote: 'origin', url: repoUrl, force: true });
  } catch (e) {
    // remote already exists
  }

  console.log('Uploading repository and video assets to GitHub (this takes ~20-30s)...');
  const pushResult = await git.push({
    fs,
    http: customHttp,
    dir,
    remote: 'origin',
    ref: 'main',
    force: true,
    onProgress: (evt) => {
      if (evt.phase) {
        console.log(`Progress: ${evt.phase} ${evt.loaded || ''}/${evt.total || ''}`);
      }
    },
    onAuth: () => ({ username: token || 'git', password: token || '' })
  });

  console.log('✓ Successfully pushed to GitHub!', JSON.stringify(pushResult, null, 2));
}

pushToGithub().catch(console.error);
