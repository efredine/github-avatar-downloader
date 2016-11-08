const request = require('request');

module.exports = function getJSON(options, callback) {
  console.log(options.url);
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
};
