require('dotenv').config({silent: true});
const getJSON = require('./get_json');
const user = process.env.GITHUB_USER;
const token = process.env.GITHUB_TOKEN;

if(!user || !token) {
  throw new Error("You have to configure GITHUB_USER and GITHUB_TOKEN in a .env file.");
}

/**
 * Returns the base URL for github with user and token configured.
 * @return {String}
 */
function getRoot() {
  return `https://${user}:${token}@api.github.com`;
}

/**
 * @param  {String} path to append.
 * @return {Object} options object configured with user-agent and github URL.
 */
function getOptions(path) {
  return {url: getRoot() + path, headers: {'User-Agent': 'github-avatar-downloader'}};
}

function getUserRepos(user, callback) {
  let userReposPath = `/users/${user}/repos`;
  return getJSON(getOptions(userReposPath), callback);
}

/**
 * Retrieve a Github repo's contributors.
 * Github user and token retrieved from process.env.
 * @param  {String} repoOwner name of the repositories owner
 * @param  {String} repoName name of the repository
 * @param  {Function} callback(error, result) is called on completion where result is a JSON object.
 * @return {undefined}
 */
function getRepoContributors(repoOwner, repoName, callback) {
  let contributorsPath = `/repos/${repoOwner}/${repoName}/contributors`;
  return getJSON(getOptions(contributorsPath), callback);
}

module.exports.getOptions = getOptions;
module.exports.getRepoContributors = getRepoContributors;
module.exports.getUserRepos = getUserRepos;