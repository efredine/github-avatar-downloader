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

function downloadImageByURL(url, filePath) {
  var length = 0;
  var byteCount = 0;

  request.get(url)
    .on('error', function (err) {
      console.error(err);
      throw err;
    })
    .on('response', function (response) {
      length = response.headers['content-length'];
      console.log('Response Status Code: ', response.statusCode);
      console.log('Response Status Message:', response.statusMessage);
      console.log('Content type:', response.headers['content-type']);
      if(response.statusCode === 200) {
        console.log("Dowloading", url, "to", filePath);
      }
    })
    .on('data', function(chunk){
      byteCount += chunk.length;
      console.log(`${byteCount} of ${length}`);
    })
    .on('end', function(){
      console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filePath));
}

function downloadImages(error, result) {
  if(!error && result) {
    result.forEach(repoResult => {
      let fileName = './avatars/' + repoResult['login'] + '.jpg';
      downloadImageByURL(repoResult["avatar_url"], fileName);
    });
  }
}
console.log('Welcome to the GitHub Avatar Downloader!');
getRepoContributors(process.argv[2], process.argv[3], downloadImages);
// downloadImageByURL('https://avatars.githubusercontent.com/u/1615?v=3', './tmp.jpg');
