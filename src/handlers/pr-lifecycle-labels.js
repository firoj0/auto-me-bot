const BOT_CHECK_URL = 'https://auto-me-bot.tomfi.info';
const CHECK_NAME = 'Auto-Me-Bot Lifecycle Labels';

module.exports = handlePrLifecycleLabels;

/* example configuration (for reference):
pr:
    lifecycleLabels:
        notReviewed: "status: needs review"
        approved: "status: approved"
        changesRequested: "status: changes requested"
        merged: "status: merged"
*/

// handler for labeling pull requests based on lifecycle
async function handlePrLifecycleLabels(context, config, startedAt) {
    // create the initial check run and mark it as in_progress
    let checkRun = await context.octokit.checks.create(context.repo({
        head_sha: context.payload.pull_request.head.sha,
        name: CHECK_NAME,
        details_url: BOT_CHECK_URL,
        started_at: startedAt,
        status: 'in_progress'
    }));

    // TODO: label pr based on configuration and current lifecycle phase

    // default output for successful labeling
    let finalConclusion = 'success';
    let outputReport = {
        title: 'All Done!',
        summary: 'Pull request labeled'
    };

    // TODO: update conclusion and report based on the labeling process status

    // update check run and mark it as completed
    await context.octokit.checks.update(context.repo({
        check_run_id: checkRun.data.id,
        name: CHECK_NAME,
        details_url: BOT_CHECK_URL,
        started_at: startedAt,
        status: 'completed',
        conclusion: finalConclusion,
        completed_at: new Date().toISOString(),
        output: outputReport
    }));
}
