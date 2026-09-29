# Facebook creator search

Connect Facebook in the Web Accounts panel by selecting an existing signed-in Chrome/Edge profile. OneCrew reads that profile's Facebook cookies and verifies the active identity. MCP uses the saved connection and selects the acting account internally.

```json
{ "platform": "facebook", "query": "robotics", "limit": 10 }
```

Keep `search_id`, poll status, then call fetch with `{search_id, platform:"facebook", params:{page:1,size:3}}`. Facebook controls page sizes. `limit` is a target, not a return cap: if a page adds 5 authors to 8 already collected for a target of 10, all 13 are kept and receive profile and recent-post reads. No additional search page is requested for that target. Request budgets and unavailable content can leave explicit missing-data warnings.

Fetch returns cached `result.creators`; `has_more` means another cached page. Fetch does not make Facebook requests. Call continue only when `can_continue` is true, using the same search ID and bound connection. Do not restart searches to bypass throttling or login challenges.

Use `author.id` as the dynamic-table `platform_id`, with `platform:"facebook"`; `author.url` is the profile homepage. Matched/recent posts contain bounded excerpts and links. Reposts and advertisements are excluded from creator evidence, and pinned posts do not imply recency. Missing text is null; an empty string means the returned post has no text. Visible Facebook results depend on the connected account and are not global creator rankings.

The platform client keeps `searchPosts`, `searchUsers` (people/pages), `getUser` and `listUserPosts` independently callable for future detail collection. These are internal methods, not extra MCP tools. There is no posting, messaging, automated login or cookie import through MCP.

Follow [match evaluation](match-evaluation.md) and [dynamic tables](dynamic-tables.md) when evaluating or saving results. Never invent profile facts from missing evidence.
