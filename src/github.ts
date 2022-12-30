import 'dotenv/config';

import { Octokit } from '@octokit/rest';

const client = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
interface File {
  path: string;
  mode: '100644' | '100755' | '040000' | '160000' | '120000';
  type: 'commit' | 'tree' | 'blob';
  sha?: string | null;
  content: string;
}

export async function publishToGithubRepo(repoOwner: string, repoName: string, files: { name: string; contents: string }[]) {
  console.log('Pushing to github repo...');

  let commits = await client.repos.listCommits({
    owner: repoOwner,
    repo: repoName,
  });

  // map to the proper format
  const commitableFiles: File[] = files.map(({ name, contents }) => {
    return {
      path: name,
      mode: '100644',
      type: 'commit',
      content: contents,
    };
  });

  if (!commits) {
    // push commit to empty repo
    await client.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: 'README.md',
      message: 'Initial commit',
      content: Buffer.from('Initial commit').toString('base64'),
    });

    commits = await client.repos.listCommits({
      owner: repoOwner,
      repo: repoName,
    });
  }

  // get latest commit hash
  const commitSHA = commits.data[0].sha;

  // equivalent to adding files in git
  const {
    data: { sha: currentTreeSHA },
  } = await client.git.createTree({
    owner: repoOwner,
    repo: repoName,
    tree: commitableFiles,
    base_tree: commitSHA,
    message: 'Updated programatically by New Order DAO',
    parents: [commitSHA],
  });

  // make the commit on the tree and push it
  const {
    data: { sha: newCommitSHA },
  } = await client.git.createCommit({
    owner: repoOwner,
    repo: repoName,
    tree: currentTreeSHA,
    message: 'Updated programatically by New Order DAO',
    parents: [commitSHA],
  });

  await client.git.updateRef({
    owner: repoOwner,
    repo: repoName,
    sha: newCommitSHA,
    ref: 'heads/main', // Whatever branch you want to push to
  });
}
