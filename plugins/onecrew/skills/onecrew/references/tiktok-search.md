# TikTok creator search

Connect TikTok in the Web Accounts panel using a signed-in Chrome or Edge profile. OneCrew manages the saved session and proxy. Check `platform_connection_list` for native search support before starting.

```json
{"platform":"tiktok","query":"nail art","limit":20}
```

TikTok searches videos and photos, then extracts and deduplicates their authors. Retain `search_id`, follow `poll_after_ms`, and fetch cached results with `{search_id,platform:"tiktok",params:{page:1,size:3}}`.

Use `result.creators[].author.id` as the native ID string and `author.url` as the creator's homepage. Profile facts and `matched_posts` come from the search response; missing values remain unknown. Matched content does not establish recent posting frequency.

Pagination and its search session are managed internally. Read every cached page indicated by `has_more`; for further queries, follow [Reaching the requested total](creator-discovery.md#reaching-the-requested-total). The final source page can exceed the requested candidate limit.

TikTok currently supports content-based discovery. User search, recent-post tasks and contact enrichment are unavailable. Use the current tool schemas to determine supported operations.

Screen and save retained authors using [Creator discovery](creator-discovery.md) and [Dynamic tables](dynamic-tables.md).
