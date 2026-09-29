# Instagram creator search

Connect Instagram in the Web Accounts panel using an existing signed-in Chrome/Edge profile. The saved session and stable device state are managed internally. MCP cannot import cookies, select an acting account, open a login flow or configure a proxy.

Example creation:

```json
{ "platform": "instagram", "query": "robotics", "limit": 10 }
```

Retain the returned search_id, poll status and fetch with `{search_id, platform:"instagram", params:{page:1,size:3}}`. `result.creators` contains author identity, available profile facts, matched/recent post excerpts and material warnings. Use author.id for dynamic-table identity `{platform:"instagram", platform_id}` and the returned author.url as the homepage.

The native composite search cursor is private and bound to both query and acting account. Normal cookie refresh preserves that binding; reconnecting or deleting the account invalidates associated searches. Never supply or reconstruct a cursor, choose a different acting account or automatically rerun an expired task. Cached `has_more` and explicit `can_continue` have different meanings; fetch itself does not make platform requests.

The platform workflow reads a bounded recent-post sample and, when needed, the original matched post's missing caption. It validates post and author identity. A null text means unavailable/not returned; an empty text can be a confirmed empty caption. Do not manufacture text for either case. Pinned posts, reposts and uncertain dates do not establish recency. Profile/private-resource failures appear as warnings; authentication, challenge and throttle errors stop the task with the affected account's safe identity.

Post excerpts are bounded and do not represent complete history. Use the shared [evaluation rules](match-evaluation.md), then save under [dynamic-table rules](dynamic-tables.md). Independent user search/profile/user-post/detail methods are internal reuse points for future Collect details, not extra MCP tools or a separate enrich job.

The platform controls its page size. `limit` stops further search pages once enough distinct authors are collected; it does not truncate the final page. If 8 authors plus 5 new authors crosses a target of 10, all 13 are retained and checked. Request limits or inaccessible content produce explicit warnings. `fetch` page/size only divides cached output.
