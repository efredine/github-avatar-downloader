const request = require('request');

module.exports = function getJSON(options, callback) {
  request.get(options, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      callback(error, JSON.parse(body));
    } else {
      console.log(options.url);
      console.log(response.statusCode, response.statusMessage);
      console.log(body);
      callback(error, null);
    }
  });
};
