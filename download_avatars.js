const request = require('request');
const GITHUB_USER = "efredine";
const GITHUB_TOKEN = "63f30585505ab3b79fb77b07c7070483a0e9ab3e";

/**
 * Retrieve a Github repo's contributors.
 * @param  {String} repoOwner name of the repositories owner
 * @param  {String} repoName name of the repository
 * @param  {Function} callback(result, error) is called on completion
 * @return {undefined}
 */
function getRepoContributors(repoOwner, repoName, callback) {
  const requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

console.log('Welcome to the GitHub Avatar Downloader!');
getRepoContributors(process.argv[2], process.argv[3]);