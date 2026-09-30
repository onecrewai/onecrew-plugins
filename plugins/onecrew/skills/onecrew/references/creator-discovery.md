# Creator discovery

Use `platform_connection_list` for supported platforms and saved connection state. Setup and live account verification belong in the Web Accounts panel at `connect_url`.

## Search, screen, assess, save

1. Keep the conversation target table and user criteria. Do not create a new result table before knowing whether any candidates will be saved.
2. Call `platform_search_create`, retain search_id and platform, and poll `platform_search_status` at poll_after_ms until terminal. Fetch every cached page using result.has_more. Running fetch returns result:null.
3. Review the basic profiles and matched evidence under the same criteria. Check known required-condition failures first, then topic relevance, then unknown attributes and preferences. Follow [Evaluation and reasons](match-evaluation.md).
4. Do not add clearly unsuitable candidates or candidates without supported topic relevance. Relevant candidates with unknown required attributes may be retained with score:null if the user accepts unverified records; name the unknown condition in the reply and do not count them as fully qualified. Weak preferences are not automatic exclusions. Do not add unstated follower or engagement requirements.
5. Score retained candidates and save to the current table. If a new table is needed, create it only now, with at least one writable candidate, following [Dynamic tables](dynamic-tables.md). Match identity.platform + identity.platform_id; update matching rows and append new ones. Preserve nonempty scores on ordinary repeated searches and do not delete old rows based on weaker new evidence.
6. Verify writes and return the exact table web_url with candidate, retained, new/matched and unverified counts as applicable. No retained candidates means no new table or writes; report the shortfall. Preview-only requests skip writing. If the user explicitly asks to save all raw candidates, keep them without claiming they all qualify.

limit defaults to 20 and accepts 1–100. The source controls page size: read all authors from the final page even when the target is exceeded. The target counts candidates, not proven matches. For example, 13 candidates may yield 7 saved rows, including one relevant but unverified record. Report that distinction; do not fill the table with unsuitable results or automatically continue, restart or change keywords to reach a count. Do not split oversized requests to bypass limits.

Search includes basic profiles and matched evidence. X reuses sufficient native author fields and fills missing basics when needed; Instagram/Facebook look up distinct authors within the same search; YouTube batches channel profiles. Recent timelines are not read. Fields still missing after a profile attempt remain unknown, not empty biographies or zero followers; profile_error explains an unavailable or unfinished lookup. A keyword-selected post does not establish sustained recent relevance.

| Platform | Reference |
|---|---|
| YouTube | [API search](youtube-api.md) |
| X | [Search](x-search.md) |
| Instagram | [Search](instagram-search.md) |
| Facebook | [Search](facebook-search.md) |

Accounts/Keys are selected internally. X from_accounts filters subjects, not the acting account. A continuation uses the original connection and completed profile checkpoints. Only result.can_continue permits an explicit platform_search_continue; it is not proof a failed connection recovered. When next_action is check_proxy_in_web, show the affected account and connect_url and wait for user-confirmed recovery. Do not automatically recreate failed or expired tasks.

Poll at the returned interval (initially 5 seconds, then 10 seconds after 30 seconds). completed means the run ended; inspect stop_reason and report actual counts. Fetch is cached and never extends coverage. Social cached pages default to 3, maximum 10; YouTube defaults to 20, maximum 100.

## Recent-content evaluation

Read [Platform posts](platform-posts.md) only when the user requests recent content or evaluation requires independent recent evidence. Use selected native account IDs; do not reread every candidate by default. Basic profiles are already part of search, and missing profile facts cannot be filled with a posts task. Update the same table rows when reassessing.
