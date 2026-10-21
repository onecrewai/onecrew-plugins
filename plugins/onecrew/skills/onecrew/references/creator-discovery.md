# Creator discovery

Use `platform_connection_list` for supported platforms and saved connection state. Setup and live account verification belong in the Web Accounts panel at `connect_url`.

Use native platform search where supported. For other platforms, use verified public profile and content pages through the webpage research workflow when OneCrew is explicitly invoked. Apply the same screening, tags, rating and fixed table fields below. Omit unavailable native IDs; never invent them or merge people by a matching handle.

## Search, screen, assess, save

1. Keep the conversation target table, user criteria and requested total. For a numeric target, plan distinct relevant queries using topic synonyms, content subtopics and languages or locations from the brief. Do not create a new result table before knowing whether any candidates will be saved.
2. Call `platform_search_create`, retain search_id and platform, and poll `platform_search_status` at poll_after_ms until terminal. Fetch every cached page using result.has_more. Running fetch returns result:null.
3. Review the basic profiles and matched evidence under the same criteria. Check known required-condition failures first, then topic relevance, then unknown attributes and preferences. Follow [Evaluation and reasons](match-evaluation.md).
4. Do not add clearly unsuitable candidates or candidates without supported topic relevance. Relevant candidates with unknown required attributes may be retained with score:null if the user accepts unverified records; name the unknown condition in the reply and do not count them as fully qualified. Weak preferences are not automatic exclusions. Do not add unstated follower or engagement requirements.
5. Score retained candidates, classify their content into 1–2 short evidence-based `topics` tags, and save to the current table. New creator tables use `people`, `topics`, `profile`, `score`; every nonempty profile requires a platform, while followers is optional. If a new table is needed, create it only now, with at least one writable candidate, following [Dynamic tables](dynamic-tables.md). Match identity.platform + identity.platform_id; update matching rows and append new ones. Preserve nonempty scores and known tags on ordinary repeated searches when no new evidence is available. Unknown tags stay `[]`; do not delete old rows based on weaker new evidence.
6. Verify writes and track unique qualified creators across rounds. Return the exact table web_url with candidate, retained, new/matched and unverified counts as applicable. A round with no retained candidates makes no writes; continue the search plan if useful queries remain. Preview-only requests skip writing. If the user explicitly asks to save all raw candidates, keep them without claiming they all qualify.

`limit` defaults to 20 and accepts 1–100 candidates per collection run. The source controls page size: review all authors from the final page even when this target is exceeded. This limit does not cap the user's total across distinct queries. Count unique creators meeting the user's criteria toward that total; duplicates, rejected candidates and unverified records do not fill it.

## Reaching the requested total

- Read every cached page indicated by `result.has_more`, even when `result.can_continue` is false. Fetch never makes new platform requests.
- Continue a productive query with `platform_search_continue` when `result.can_continue` is true and no unresolved platform error blocks it. Keep the same search ID, connection and cursor.
- `can_continue:false` applies only to that search ID. `limit_reached`, `exhausted`, `page_limit`, `request_limit` and `pagination_unavailable` describe the current query or its local task budget; they do not establish account quota exhaustion. If the requested total is still unmet, start the next distinct relevant query, screen its evidence, deduplicate by platform + native ID across all rounds and the target table, and accumulate qualified results. The existing request authorizes these rounds within its original criteria and stated budget.
- Preserve the user's required conditions. Do not repeat the same exhausted query to reset its budget, weaken screening, change acting accounts or cycle API Keys to evade a limit. If queries stop yielding new qualified creators and useful query coverage is exhausted, report the verified total and shortfall.
- Authentication failures, verification challenges, actual provider quota errors, throttling and unresolved connection/protocol errors block further requests to the affected platform. Read `error_code`, `recovery`, `retry_at` and `next_action`; respect the returned cooldown or recovery requirement. Changing a keyword does not resolve these errors. Stop collecting once the requested total or the user's request/time budget is reached.
- Expired or evicted task results are unavailable, not zero matches. Reuse saved evidence first. If the active request still needs new evidence, a replacement search is allowed after checking connection errors and prior attempts; do not loop on repeatedly unavailable tasks.

Search includes basic profiles and matched evidence. X reuses sufficient native author fields and fills missing basics when needed; Instagram/Facebook look up distinct authors within the same search; YouTube batches channel profiles. Recent timelines are not read. Fields still missing after a profile attempt remain unknown, not empty biographies or zero followers; profile_error explains an unavailable or unfinished lookup. A keyword-selected post does not establish sustained recent relevance.

| Platform | Reference |
|---|---|
| YouTube | [API search](youtube-api.md) |
| X | [Search](x-search.md) |
| Instagram | [Search](instagram-search.md) |
| Facebook | [Search](facebook-search.md) |

Accounts/Keys are selected internally. X from_accounts filters subjects, not the acting account. A continuation uses the original connection and completed profile checkpoints. `result.can_continue` is not proof a failed connection recovered. When `next_action` is `check_proxy_in_web`, show the affected account and `connect_url` and wait for user-confirmed recovery.

Poll at the returned interval (initially 5 seconds, then 10 seconds after 30 seconds). completed means the run ended; inspect stop_reason and report actual counts. Fetch is cached and never extends coverage. Social cached pages default to 3, maximum 10; YouTube defaults to 20, maximum 100.

## Recent-content evaluation

Read [Platform posts](platform-posts.md) only when the user requests recent content or evaluation requires independent recent evidence. Use selected native account IDs; do not reread every candidate by default. Basic profiles are already part of search, and missing profile facts cannot be filled with a posts task. Update the same table rows when reassessing.
