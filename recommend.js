const gitHubApi = require('./github_api');
const getArguments = require('./get_arguments');

function getUserRepos(user) {
  gitHubApi.getUserRepos(user, function(error, repos) {
    console.log(user, '------------------------------------');
    console.log(repos.length);
  });
}

function getContributors(error, contributors) {
  if(!error && contributors) {
    contributors.forEach(contributor => {
      getUserRepos(contributor["login"]);
    });
  }
  if(error) {
    console.error("downloadContributorImages Error:\n", error);
  }
}

let repoArguments = getArguments(process.argv.slice(2));
if (repoArguments) {
  gitHubApi.getRepoContributors(repoArguments.repoName, repoArguments.repoOwner, getContributors);
}