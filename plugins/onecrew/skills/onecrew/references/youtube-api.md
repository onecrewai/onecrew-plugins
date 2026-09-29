# YouTube creator discovery

OneCrew uses a YouTube Data API v3 Key configured by the user in the Web Accounts panel to retrieve public videos and channel details. Use the connected MCP tools; the plugin distributes configuration and workflow guidance. Do not look for OpenCLI or service source code.

## Scope before calling a tool

This workflow finds channels relevant to a content topic. It searches public video metadata in relevance order, deduplicates their channel IDs, and returns channel profiles plus limited video evidence. It is not general web search, a complete channel directory, an exact channel lookup, or a subscriber leaderboard.

- Suitable: discover creators discussing a product category, industry, or campaign topic, then assess the returned evidence.
- Outside this workflow: the globally most-subscribed channels, an exhaustive country/category ranking, broad web research, or a current factual question that needs sources outside the returned video metadata.
- For an out-of-scope request, use an available web-search or ranking-data tool and read the dated source, or state that the required capability is unavailable. Do not start a topic search merely to appear to cover the request. Do not search for “most subscribed” or combine remembered famous channel names as a substitute for a leaderboard.
- Each collection batch targets `limit` new candidate channels (default 20, range 1–100) and retains the whole final source page. The whole workflow, including continuation, shares a maximum of five upstream search pages, 400 logical API calls (with at most one same-key transient retry per call), and at most 250 distinct candidates. It includes up to three matching videos and three recent uploads per channel. `limit` is a collection target, not a worldwide rank. Sorting returned candidates by subscribers only orders that sample.
- Web search can locate a ranking source; it does not itself prove ranking completeness. Check the source date and population (for example, all channels versus individual creators), retain its attribution, and label the ranking accordingly. Keep externally sourced figures distinct from OneCrew search evidence.

## Workflow

User requirements → relevant videos → deduplicated channel IDs → channel profiles and recent videos → evidence-based evaluation → update the conversation's target table → return its link.

The calling agent orchestrates this workflow; the search backend does not create tables. Save by default unless the user explicitly requests preview only. Before saving, apply [Dynamic tables: Keep one target table per conversation](dynamic-tables.md#keep-one-target-table-per-conversation). Do not write results into the creator library.

1. Check OneCrew sign-in with `account`. If needed, return the authorization URL for the user to complete in their browser. Use `platform_connection_list` to read configured search connections, their last known status and `last_checked_at`. This is not a live credential verification. Only the user can connect, revalidate, select, or disconnect platform credentials in the Web Accounts panel. Ordinary local MCP clients cannot manage connections either; never request or receive API Keys in tool arguments or chat.
2. Call `platform_search_create` with `platform: "youtube"`, `query`, and `limit` (default 20, range 1–100). The query describes relevant video content; the limit is a per-batch target number of distinct channels, not videos. Do not ask the user to choose a channel-search versus video-search mode.
3. Retain `search_id` and poll `platform_search_status` after the returned `poll_after_ms` while queued or running. Running `phase` distinguishes searching from reading_details. Do not create another job while waiting. Report and resolve a failure before retrying.
4. Once completed (even if fewer candidates than the target were found), call `platform_search_fetch` with `{search_id, platform: "youtube", params: {page: 1, size: 20}}`. Read `result.channels` and fetch subsequent cached pages while `result.has_more` is true. The top-level envelope contains task metadata, not paging fields. `result.upstream_has_more` describes source coverage. To collect more evidence, call `platform_search_continue({search_id})` only when `result.can_continue` is true, then poll the same ID. Continuation consumes platform requests, reuses the original Key/cursor and appends to the existing results. Repeating fetch never expands a search. Hard budget exhaustion can leave upstream_has_more=true with can_continue=false. Report the actual count and explain `result.stop_reason` / `result.warnings`.
   Search tasks and results are temporary memory-only data. They can expire, be evicted, or disappear on logout/restart; `search.result_unavailable` does not mean zero matches. Do not automatically rerun an unavailable task. Selected records only become persistent when saved to the dynamic table.
5. Evaluate fit using the evidence below. Match existing platform identities in the target table, call `table_update_rows` for existing entities, and `table_create_rows` for new ones. Use `table_create` only when permitted by the target-table rules. Preserve an existing schema; do not make a replacement table or change columns just to fit the default format. Return `web_url` and the actual added/updated counts.
6. Retain the mapping from each `search_id` to the target `table_id`, column IDs, and record IDs. Use the table reference for subsequent maintenance and recovery.

Discovery identifies channels relevant to a content requirement. It does not provide a global popularity leaderboard or perform follows, likes, or direct messages. Search relevance is not popularity rank.

When no usable Key exists, provide the returned `connect_url` and let the user configure it in the Web panel. New tasks use automatic weighted rotation (primary 3, other available keys 1). The backend may try up to three distinct keys only before the first successful request; a task that has already obtained data stays bound to its original key. A failed continuation preserves earlier evidence and reports a safe key hint without exposing its value. Short-term throttling supplies retry_at; project quota exhaustion stops attempts. Continuation does not renew the original result expiry. Do not repeatedly create jobs or cycle Keys. No browser extension or YouTube account login is required.

## Evaluate from evidence

Each channel returns `platform_id`, `name`, and `url`, plus `image_url`, `description`, `subscriber_text`, `matched_videos`, and `recent_videos` when available. Never invent missing avatars, native IDs, exact subscriber counts, or recent content.

Read [Evaluation and reasons](match-evaluation.md) before assigning a level or writing `reason`. It defines the required-condition checks, four-level rubric, unknown outcomes, evidence limits, and explanation format. Apply it to the user's current brief and the evidence actually returned.

The calling agent performs the evaluation. The search service returns factual evidence, not an automatic business score.

### Data limits of this workflow

- Titles and descriptions establish the available metadata, not that a video was watched or its production quality verified. A video appearing in both matching and recent results is one observation.
- `recent_videos` contains the latest retrieved uploads; check actual `published_text` when evaluating a requested timeframe. Preserve the precision of `subscriber_text` and `views_text` rather than inventing exact counts.
- This search result does not establish audience demographics or geography, spoken language, engagement rate, budget, collaboration intent, or conversion performance. Treat unavailable information according to the common evaluation reference.

## Default format for a new creator table

Read [Dynamic tables](dynamic-tables.md) before writing. When creating a new creator result table is appropriate, use these three columns by default:

| Column  | Type    | Value                                                                                            |
| ------- | ------- | ------------------------------------------------------------------------------------------------ |
| Name    | people  | `{name, image_url?, identity: {platform: "youtube", platform_id}}`; name and avatar share a cell |
| Profile | website | Returned channel homepage URL; never a matching-video URL or guessed handle URL                  |
| Match   | score   | `{level, reason}`; rating badge and hover explanation, or `null` for insufficient evidence       |

Keep this column order and localize the labels; use 名称、主页、匹配度 in Chinese. An explicitly brand-only list may use `company` instead of `people`. Preserve the native `platform_id`; never substitute a name, handle, or URL. Reuse an existing row when the target table already contains that entity.

Unless the user requests them, do not add separate avatar, biography, subscriber count, matching-video, evaluation-text, source, or retrieval-date columns. Evidence supports evaluation and the reply; it does not automatically become table columns.

Use real tool-returned column IDs. Report saving only after confirmed row writes, with the exact `web_url` and actual counts. A completed search or empty table alone does not mean records were saved.

`limit` is the collection target per run, not a hard return limit. YouTube controls source pages. Keep the whole last page: 8 existing plus 5 new authors yields 13 for a target of 10, and all 13 receive normal profile/evidence reads. Fetch paginates cached channels; explicit continuation, when allowed, collects another batch with the same key and cursor.
