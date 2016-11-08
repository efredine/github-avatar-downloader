const fs = require('fs');
const request = require('request');
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
module.exports.downloadImageByURL = downloadImageByURL;