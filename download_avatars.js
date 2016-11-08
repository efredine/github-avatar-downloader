const fs = require('fs');
const downloadImageByURL = require('./image_downloader').downloadImageByURL;
const gitHubApi = require('./github_api');
const getJSON = require('./get_json');
const SUBDIR = './avatars';

/**
 * Retrieve a Github repo's contributors.
 * Github user and token retrieved from process.env.
 * @param  {String} repoOwner name of the repositories owner
 * @param  {String} repoName name of the repository
 * @param  {Function} callback(error, result) is called on completion where result is a JSON object.
 * @return {undefined}
 */
function getRepoContributors(repoOwner, repoName, callback) {
  let contributorsPath = gitHubApi.getContributorsPath(repoOwner, repoName);
  getJSON(gitHubApi.getOptions(contributorsPath), callback);
}

/**
 * Download the avatar for each contributor and store it in a .avatars subdirectory.
 * If the sub-directory doesn't exist, attempts to create it (which might fail with an error).
 * Each file is named by appending .jpg to the users' login id.
 * @param  {Object} null if ok, otherwise contains an error
 * @param  {Array} of contributors to a repository
 * @return {undefined}
 */
function downloadContributorImages(error, contributors) {
  if(!error && contributors) {
    try {
      fs.mkdirSync(SUBDIR);
    } catch(error) {
      if(!error.code === "EEXIST") {
        throw error;
      }
    }
    contributors.forEach(contributor => {
      let fileName = SUBDIR + '/' + contributor['login'] + '.jpg';
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
