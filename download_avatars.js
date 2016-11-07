const request = require('request');
const GITHUB_USER = "efredine";
const GITHUB_TOKEN = "63f30585505ab3b79fb77b07c7070483a0e9ab3e";

/**
 * Retrieve a Github repo's contributors.
 * @param  {String} repoOwner name of the repositories owner
 * @param  {String} repoName name of the repository
 * @param  {Function} callback(error, result) is called on completion where result is a JSON object.
 * @return {undefined}
 */
function getRepoContributors(repoOwner, repoName, callback) {
  const requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  const options = {
    url: requestURL,
    headers: {'User-Agent': 'github-avatar-downloader'}
  };
  console.log(requestURL);
  request.get(options, (error, response, body) => {
    console.log("Error:", error);
    console.log('Response Status Code: ', response.statusCode);
    console.log('Response Status Message:', response.statusMessage);
    if(!error && response.statusCode === 200) {
      callback(error, JSON.parse(body));
    } else {
      callback(error, null);
    }
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');
function testCallBack(error, result) {
  console.log("error:", error);
  if(!error && result) {
    result.forEach(repoResult => {
      console.log(repoResult["avatar_url"]);
    });
  }
}
getRepoContributors(process.argv[2], process.argv[3], testCallBack);
