require('dotenv').config();

function getHost() {
  return `https://${process.env.GITHUB_USER}:${process.env.GITHUB_TOKEN}@api.github.com`;
}

function getOptions(path) {
  return {url: getHost() + path, headers: {'User-Agent': 'github-avatar-downloader'}};
}

function getContributorsPath(repoOwner, repoName) {
  return `/repos/${repoOwner}/${repoName}/contributors`;
}

module.exports.getHost = getHost;
module.exports.getOptions = getOptions;
module.exports.getContributorsPath = getContributorsPath;