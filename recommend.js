const gitHubApi = require('./github_api');
const getArguments = require('./get_arguments');

var repoSummaries = [];
var pendingQueries = 0;

function processRepoSummaries() {
  repoSummaries.sort(function(a, b) {
    return b.stars - a.stars;
  });
  repoSummaries.slice(0, 5).forEach(summary => {
    console.log(`[${summary.stars}] ${summary.fullName}`);
  });
}

function getUserRepos(user) {
  gitHubApi.getUserRepos(user, function(error, repos) {
    // console.log(user, '------------------------------------');
    let summary = repos.map(repo => {
      return {user: user, stars: repo.stargazers_count, name: repo.name, fullName: repo.full_name};
    });
    repoSummaries = repoSummaries.concat(summary);
    pendingQueries -= 1;
    if(pendingQueries === 0) {
      processRepoSummaries();
    }
  });
}

function getContributors(error, contributors) {
  if(!error && contributors) {
    contributors.forEach(contributor => {
      pendingQueries += 1;
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