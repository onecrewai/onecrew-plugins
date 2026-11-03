# Creator discovery

Use `platform_connection_list` for supported platforms and saved connection state. Setup and live account verification belong in the Web Accounts panel at `connect_url`.

Use native platform search where supported. When platform tools cannot provide the needed candidates or information, ask before using OneCrew's `web_search`; reuse permission already given. The client's built-in web search remains available under its own permissions. Apply the same screening, tags, rating and fixed table fields to public profile and content pages. Omit unavailable native IDs; never invent them or merge people by a matching handle.

## Search, screen, assess, save

1. Keep the conversation table, user criteria and requested total. Plan distinct relevant queries from the brief. Create a table only when a retained candidate needs saving.
2. Start one `platform_search_create`, retain search_id and platform, and poll status at poll_after_ms until terminal. Review cached results one page at a time while more qualified creators are needed. Process useful unread candidates before continuing or starting another query. A clearly unsuitable query can be abandoned. Running fetch returns result:null.
3. Deduplicate by platform + native ID, including prior rejections and saved rows. YouTube fetch can apply `min_subscribers`, channel `country` and `exclude_ids` before returning records. Unknown values remain for review. Check topic relevance using existing profile and matched-content evidence, following [Evaluation and reasons](match-evaluation.md).
4. Do not add clearly unsuitable candidates or candidates without supported topic relevance. Relevant candidates with unknown required attributes may be retained with score:null if the user accepts unverified records; name the unknown condition in the reply and do not count them as fully qualified. Weak preferences are not automatic exclusions. Do not add unstated follower or engagement requirements.
5. Resolve only missing required facts. Reuse published contacts; for missing YouTube email, enrich selected channel URLs with their `search_id` to read cached profiles and matched-video descriptions. Read an associated website's contact page only when still needed. Preserve each address's published purpose.
6. Score retained candidates, assign 1–2 supported `topics`, and save confirmed matches in batches using [Dynamic tables](dynamic-tables.md). New creator tables use `people`, `topics`, `profile`, `score`, plus requested contact fields. Preserve the current table and known values across searches.
7. Verify writes and return the exact `web_url` with confirmed new/matched and unverified counts. Preview-only requests skip writing. Explicit requests for raw candidates may retain them with accurate qualification labels.

Start with the default `limit:20`; increase it when a query is productive and more candidates are needed. The range is 1–100. The service retains the whole final source page, including extras; review only as much as the user's goal requires. Count unique qualified creators toward that goal, separately from duplicates, rejected candidates and unverified records.

## Reaching the requested total

- Stop when the requested qualified total or user budget is reached. Remaining candidates stay available for the task's cache lifetime.
- While more creators are needed, read useful cached pages indicated by `result.has_more`, even when `result.can_continue` is false. Fetch makes no new platform requests.
- After processing the useful cache, continue a productive query when `result.can_continue` is true and no unresolved platform error blocks it. Keep the search ID and conditions; the service retains its cursor and completed work. Wait for that continuation to finish before another search starts.
- Local limits such as `page_limit`, `request_limit` or `can_continue:false` apply to this search ID, not account quota. When more creators are needed, continue with a distinct relevant query under the same criteria.
- Preserve the user's required conditions. Do not repeat the same exhausted query to reset its budget, weaken screening, change acting accounts or cycle API Keys to evade a limit. If queries stop yielding new qualified creators and useful query coverage is exhausted, report the verified total and shortfall.
- Returned authentication, quota, throttle or proxy errors require the stated recovery on the affected platform. Follow `error_code`, `recovery`, `retry_at` and `next_action`.
- Expired or evicted task results are unavailable, not zero matches. Reuse saved evidence first. If the active request still needs new evidence, a replacement search is allowed after checking connection errors and prior attempts; do not loop on repeatedly unavailable tasks.

A webpage error does not block native platform searches or invalidate evidence already obtained. Continue useful platform queries and save qualified candidates. Keep unresolved required attributes separate; an optional website or email lookup does not add a new qualification requirement.

Search includes basic profiles and matched evidence. Missing fields remain unknown; `profile_error` explains an unavailable or unfinished lookup. A matching video within the requested date range establishes an update in that period. A recent timeline is only needed for facts the existing evidence cannot establish, such as posting frequency or sustained recent relevance.

| Platform | Reference |
|---|---|
| YouTube | [API search](youtube-api.md) |
| X | [Search](x-search.md) |
| Instagram | [Search](instagram-search.md) |
| Facebook | [Search](facebook-search.md) |
| TikTok | [Content search](tiktok-search.md) |

Accounts/Keys are selected internally. X from_accounts filters subjects, not the acting account. Cookie continuations retain the original account; YouTube can switch an unavailable Key while keeping the original search conditions and completed profile checkpoints. `result.can_continue` is not proof a failed connection recovered. When `next_action` is `check_proxy_in_web`, show the affected account and `connect_url` and wait for user-confirmed recovery.

`completed` means the run ended; inspect `stop_reason` and actual counts. Fetch never extends coverage. Social cached pages default to 3, maximum 10; YouTube defaults to 20, maximum 100.

## Cached-page progress

Keep each search's page size, filters, exclusion list, reviewed IDs and last fetched `total`. Use YouTube's default `size:20`; the create limit does not determine fetch size. Follow `next_page`, or increment only when `has_more` is true on older/other platform responses. Changing filters or `exclude_ids` restarts paging at page 1. Records remain complete.

After reviewing a completed YouTube run, keep fetch parameters unchanged and resume additions at `floor(old_total / size) + 1`. With 37 old matches and size 20, resume at page 2 and skip its 17 reviewed IDs. `previous_total` from continue is unfiltered; use the last fetch's `total` when filtering. Process unread old candidates first. After a failed run, refetch recovered results because earlier profiles may have completed or reordered; reuse prior evidence.

## Recent-content evaluation

Read [Platform posts](platform-posts.md) only when the user requests recent content or evaluation requires independent recent evidence. Use selected native account IDs; do not reread every candidate by default. Basic profiles are already part of search, and missing profile facts cannot be filled with a posts task. Update the same table rows when reassessing.
