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
  const options = {
    url: requestURL,
    headers: {'User-Agent': 'github-avatar-downloader'}
  };
  console.log(requestURL);
  request.get(options, (error, response, body) => {
    console.log("Error:", error);
    console.log('Response Status Code: ', response.statusCode);
    console.log('Response Status Message:', response.statusMessage);
    console.log(JSON.parse(body));
  });
    // .on('error', function (err) {
    //   console.error(err);
    //   throw err;
    // })
    // .on('response', function (response) {
    //   console.log('Response Status Code: ', response.statusCode);
    //   console.log('Response Status Message:', response.statusMessage);
    //   if(response.statusCode === 200) {
    //     console.log("Starting download...");
    //   }
    // });
       // .on('data', function(chunk){
       //  byteCount += chunk.length;
       //  console.log(`${byteCount} of ${length}`);
       // })
       // .on('end', function(){
       //  console.log('Download complete.');
       // });
       // .pipe(fs.createWriteStream('./future.jpg'));

}

console.log('Welcome to the GitHub Avatar Downloader!');
getRepoContributors(process.argv[2], process.argv[3]);