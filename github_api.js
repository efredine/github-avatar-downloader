require('dotenv').config({silent: true});
const user = process.env.GITHUB_USER;
const token = process.env.GITHUB_TOKEN;

if(!user || !token) {
  throw new Error("You have to configure GITHUB_USER and GITHUB_TOKEN in a .env file.");
}

/**
 * Returns the base URL for github with user and token configured.
 * @return {String}
 */
function getHost() {
  return `https://${user}:${token}@api.github.com`;
}

/**
 * @param  {String} path to append.
 * @return {Object} options object configured with user-agent and github URL.
 */
function getOptions(path) {
  return {url: getHost() + path, headers: {'User-Agent': 'github-avatar-downloader'}};
}

/**
 * @param  {String} user id of repo owner
 * @param  {String} name of the repo
 * @return {String} path for contirbutors to the repo
 */
function getContributorsPath(repoOwner, repoName) {
  return `/repos/${repoOwner}/${repoName}/contributors`;
}

module.exports.getHost = getHost;
module.exports.getOptions = getOptions;
module.exports.getContributorsPath = getContributorsPath;