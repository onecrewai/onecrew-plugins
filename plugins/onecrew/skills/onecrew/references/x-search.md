# X creator search

Connect and verify the intended X accounts in the Web Accounts panel by selecting existing Chrome/Edge profiles. The MCP search uses saved sessions; it cannot log in, extract cookies or choose the acting account. There is no X Chat or write operation.

Example creation:

```json
{
  "platform": "x",
  "criteria": { "all_words": ["robotics"], "language": "en", "min_likes": 5, "replies": "exclude" },
  "result_mode": "Latest",
  "limit": 10
}
```

Criteria support words, exact phrase, any/excluded words, hashtags, target from/to/mentioning accounts, language, date range, minimum likes/replies/reposts and reply/link filters. Use these fields rather than injecting operators into a word. At least one positive keyword, phrase, hashtag or target account is required. `Top` and `Latest` are post-search modes, not global creator rankings.

Retain `search_id`, poll status and fetch with `{search_id, platform:"x", params:{page:1,size:3}}`. Read `result.creators`: `author.id/name/username/url` identify the creator; optional profile facts and matched/recent post excerpts support evaluation. Use author.id in dynamic-table identity `{platform:"x", platform_id}` and author.url as the homepage. Preserve returned avatar and source links; do not invent missing profile facts.

Fetch reads cache only; `has_more` controls cached pages. Use `platform_search_continue` only when `can_continue` is true. The same account, native cursor, pending candidates and remaining budgets are reused. API changes, challenges and throttling are reported separately; the task must not hop to another account or restart automatically. A query-ID compatibility error is not proof that the saved account expired.

Recent posts are a limited sample with reposts/advertisements removed and returned timestamps used for sorting; a pinned post is not automatically newest. Null or missing evidence remains unknown. Read [match evaluation](match-evaluation.md) before rating and [dynamic tables](dynamic-tables.md) before saving. Standalone profile/post lookup methods are internal reuse points, not additional MCP tools in this release.

The platform controls its page size. `limit` stops further search pages once enough distinct authors are collected; it does not truncate the final page. If 8 authors plus 5 new authors crosses a target of 10, all 13 are retained and checked. Request limits or inaccessible content produce explicit warnings. `fetch` page/size only divides cached output.
