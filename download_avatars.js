const request = require('request');
const fs = require('fs');

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
getRepoContributors(process.argv[2], process.argv[3], downloadContributorImages);
