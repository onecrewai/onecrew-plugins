# Creator discovery

Use `platform_connection_list` to identify supported search platforms and read configured connections. It returns the last known status and check time; it does not verify credentials with the provider. Setup, live verification and credential changes belong in the Web panel at the returned `connect_url`.

Match the request to the platform reference before starting a search. Topic discovery, global rankings, exact identity lookup and general web research are different capabilities. When the requested coverage is unavailable, use a suitable tool already provided by the client or explain the limitation; do not assume every MCP client has web search.

Use `platform_search_create`, `platform_search_status` and `platform_search_fetch` for discovery. For supported resumable results, `platform_search_continue` explicitly collects another batch using the same search ID and bound credential; call it only when the platform result reports can_continue=true. Cached fetch pagination never contacts the upstream platform. Retain both the search ID and platform; fetch parameters and the nested `result` follow that platform’s contract. Searches are temporary, not a queryable history. Save selected evidence to the target dynamic table for persistence, and never silently recreate expired tasks. Read the relevant platform reference before searching or interpreting evidence:

| Platform  | Reference                                  |
| --------- | ------------------------------------------ |
| YouTube   | [API search and evidence](youtube-api.md)  |
| X         | [Search and evidence](x-search.md)         |
| Instagram | [Search and evidence](instagram-search.md) |
| Facebook  | [Search and evidence](facebook-search.md)  |

Evaluate returned evidence using [Evaluation and reasons](match-evaluation.md). Save results under [Dynamic tables](dynamic-tables.md), maintaining the conversation's target table. Do not infer support for additional platforms or obtain credentials through chat or tools.

X/Instagram/Facebook accounts are selected internally from the eligible pool; never pass an operator account, Cookie, or Key to a search. Target usernames and X `from_accounts` filter subjects, not the acting account. A continuation uses the original connection and never switches accounts midway. Connection changes invalidate its old search. Respect rate-limit retry times instead of creating another task to work around them.

Search is MCP-only. Fetch small pages: X/Instagram/Facebook default to 3 creators, with a maximum size of 10. Post text is an excerpt; the backend reads limited source pages and recent-post samples, sorts returned recent samples by publication date, and never promises complete history. Warnings describe actual missing or inaccessible evidence. Do not request or invent execution counters, an enrichment status, or a separate automatic enrich stage. The platform workflow already performs its own bounded profile and evidence reads.

Page size is controlled by the upstream platform. The collection target is not a hard result cap: retain and check every author from the last page, then stop requesting search pages once the target is reached. Cached fetch pagination does not change the number collected.
