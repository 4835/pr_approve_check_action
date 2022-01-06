import core from "@actions/core";
import github from "@actions/github";
import { Toolkit } from "actions-toolkit";

const tools = new Toolkit();

async function apporvalCheck() {
  try {
    const minApproval = core.getInput('min-approval');
    const gitToken = core.getInput('github-token');
    
    const octokit = github.getOctokit(gitToken);

    const ref = tools.context.ref;
    const pull_number = Number(ref.split("/")[2]);

    const reviews = await octokit.rest.pulls.listReviews({
      ...github.context.repo,
      pull_number,
    });

    const approvingReviewers = Object.values(reviews).filter(review => review.state === "APPROVED").map(review => review.user.login);
    const uniqueApprovingReviewers = [...new Set(approvingReviewers)];

    core.info(uniqueApprovingReviewers);
    
    core.info(minApproval);
    
    if (uniqueApprovingReviewers.length >= minApproval) {
      core.info("number of approval success")
    }else{
      core.setFailed("number of approve number lack !")
    }
  } catch(err) {
    core.setFailed(err.message);
  }
}
apporvalCheck();
