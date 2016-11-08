/**
 * Grab the two arguments or print an error.
 * @param  {Array of String} to validate
 * @return {Object} with repoName and repoOwner or null
 */
module.exports = function getArguments(args) {
  if(args.length !== 2) {
    console.log("Needs two arguments: repoOwner repoName");
    return null;
  } else {
    return {repoName: args[0], repoOwner: args[1]};
  }
};