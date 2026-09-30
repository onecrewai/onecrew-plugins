# Platform posts

Use `platform_posts_create/status/fetch` when the user requests recent posts or videos, or an evaluation requires recent-content evidence. Ordinary search already includes basic profiles; do not start a posts task as a routine search follow-up or to fill missing profile fields. These tools read content, not publish it or find new accounts.

Pass 1–20 unique targets from one platform, each as `{platform_id:"native ID string"}`. X/Instagram/Facebook use author IDs; YouTube uses channel IDs. Obtain them from search results or saved people/company identities. No username, acting account, proxy or search_id is required.

```json
{"platform":"facebook","targets":[{"platform_id":"100000000000001"}]}
```

This ID is a format example, not a real target. Retain `posts_task_id`, poll status using `poll_after_ms`, then fetch with `{posts_task_id,platform,params:{page:1,size:3}}`. size is 1–10; follow `result.has_more` for cached pages. Fetch makes no platform requests and returns result:null while queued/running. Search and posts share temporary capacity; saved table identities remain usable after cache expiry.

Social results contain creators with platform_id and recent_posts; YouTube returns channels with platform_id and recent_videos. Unavailable targets have errors; failed tasks may retain successful targets. An empty or failed sample does not prove inactivity or justify a low score. There is no posts_continue; do not automatically repeat a failed batch.

Social samples cover at most two timeline pages, sorted by returned dates, with up to two post excerpts exposed. Instagram may retrieve missing text for retained samples. YouTube resolves the uploads playlist and batches video details. These are bounded samples, not complete history, guaranteed newest content or a proven posting frequency. Evaluate only evidence returned to the agent.

For explicit reassessment, update the same table rows by native identity and change level and reason together under the current criteria. Preserve existing fields when new values are unknown. Failed requests alone do not clear prior scores. Follow [Evaluation and reasons](match-evaluation.md) and [Dynamic tables](dynamic-tables.md).

If more than 20 specified targets need recent content, process bounded batches in order. If selecting from a larger candidate list, explain the selection and count. Report successful and unfinished targets separately.

When next_action is check_proxy_in_web, show the affected account and connect_url and wait for user-confirmed recovery. Retry only still-needed unsuccessful targets when the user asks to continue. Configuration remains in the Web panel.
