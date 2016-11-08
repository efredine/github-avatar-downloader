const gitHubApi = require('./github_api');
const getArguments = require('./get_arguments');

var repoSummaries = [];
var pendingQueries = 0;

/**
 * Process the accumulated repo star counts by sorting them and then printing out the 5 top recommendations.
 * @return {none}
 */
function processRepoSummaries() {
  repoSummaries.sort(function(a, b) {
    return b.stars - a.stars;
  });
  repoSummaries.slice(0, 5).forEach(summary => {
    console.log(`[${summary.stars}] ${summary.fullName}`);
  });
}

/**
 * Retrieve the repos for the specified contributor and extract the stargazer count
 * for each repo.  Once a response is processed decrement the number of pending
 * queries.  When the pending queries reaches 0, process the final results.
 * @param  {string} user name
 * @return {undefined}
 */
function getUserRepos(user) {
  gitHubApi.getUserRepos(user, function(error, repos) {
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

/**
 * For each user in the list of contributors initate a query to get that user's repos.  Keep track
 * of the number of outstanding queries, by incrementing a counter each time a query is initiated.
 * @param  {Object} error if one occurs
 * @param  {Object} contributors as an array of objects listing the contributors
 * @return {undefined}
 */
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