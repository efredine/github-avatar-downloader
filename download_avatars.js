const fs = require('fs');
const request = require('request');
const gitHubApi = require('./github_api.js');
const getJSON = require('./get_json.js');

/**
 * Retrieve a Github repo's contributors.
 * Github user and token retrieved from process.env.
 * @param  {String} repoOwner name of the repositories owner
 * @param  {String} repoName name of the repository
 * @param  {Function} callback(error, result) is called on completion where result is a JSON object.
 * @return {undefined}
 */
function getRepoContributors(repoOwner, repoName, callback) {
  // const requestURL = 'https://' + process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // const options = {
  //   url: requestURL,
  //   headers: {'User-Agent': 'github-avatar-downloader'}
  // };
  let contributorsPath = gitHubApi.getContributorsPath(repoOwner, repoName);
  getJSON(gitHubApi.getOptions(contributorsPath), callback);
}
/**
 * Downloads an image at the given url and streams it to the file in filePath.
 * @param  {String} url of image to download
 * @param  {String} filePath for storing downloaded image
 * @return {undefined}
 */
function downloadImageByURL(url, filePath) {
  const downloadInfo = `${url} to ${filePath}`;
  var length = 0;
  var byteCount = 0;

  request.get(url)
    .on('error', function (err) {
      console.error(err);
      throw err;
    })
    .on('response', function (response) {
      length = response.headers['content-length'];
      if(response.statusCode === 200) {
        console.log(`Downloading ${url} (content-type: ${response.headers['content-type']}) to ${filePath}...`);
      }
    })
    .on('end', function(){
      console.log(`>>> ${filePath} (${length} bytes) complete.`);
    })
    .pipe(fs.createWriteStream(filePath));
}
/**
 * Download the avatar for each contributor and store it in a .avatars subdirectory.  Each file
 * is named by appending .jpg to the users' login id.
 * @param  {Object} null if ok, otherwise contains an error
 * @param  {Array} of contributors to a repository
 * @return {undefined}
 */
function downloadContributorImages(error, contributors) {
  if(!error && contributors) {
    contributors.forEach(contributor => {
      let fileName = './avatars/' + contributor['login'] + '.jpg';
      downloadImageByURL(contributor["avatar_url"], fileName);
    });
  }
  if(error) {
    console.error("downloadContributorImages Error:\n", error);
  }
}
/**
 * Grab the two arguments or print an error.
 * @param  {Array of String} to validate
 * @return {Object} with repoName and repoOwner or null
 */
function getArguments(args) {
  if(args.length !== 2) {
    console.log("Needs two arguments: repoOwner repoName");
    return null;
  } else {
    return {repoName: args[0], repoOwner: args[1]};
  }
}

let repoArguments = getArguments(process.argv.slice(2));
if (repoArguments) {
  getRepoContributors(repoArguments.repoName, repoArguments.repoOwner, downloadContributorImages);
}
