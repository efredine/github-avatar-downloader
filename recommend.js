const gitHubApi = require('./github_api');
const getArguments = require('./get_arguments');

function logRepo(error, contributors) {
  console.log(contributors);
}

let repoArguments = getArguments(process.argv.slice(2));
if (repoArguments) {
  gitHubApi.getRepoContributors(repoArguments.repoName, repoArguments.repoOwner, logRepo);
}
