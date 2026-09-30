# Facebook creator search

Connect Facebook in the Web Accounts panel by selecting an existing signed-in Chrome/Edge profile. OneCrew reads that profile's Facebook cookies and verifies the active identity. MCP uses the saved connection and selects the acting account internally.

```json
{ "platform": "facebook", "query": "robotics", "limit": 10 }
```

Fetch accepts page size 1–10 (default 3). While queued/running it returns `result:null`; use status to wait. A failed task can return partial results with missing-data warnings. Fetch returns cached `result.creators`; `has_more` means another cached page. Fetch does not make Facebook requests. Call continue only when `can_continue` is true, using the same search ID and bound connection. Do not restart searches to bypass throttling or login challenges.

Use `author.id` as the dynamic-table `platform_id`, with `platform:"facebook"`; `author.url` is the profile homepage. Matched posts contain bounded excerpts and links. Reposts and advertisements are excluded from creator evidence, and pinned posts do not imply recency. `profile.followers_text` preserves Facebook’s displayed follower count, which may be rounded; it is not an exact integer. Missing text is null; an empty string means the returned post has no text. Visible Facebook results depend on the connected account and are not global creator rankings.

The platform client keeps `searchPosts`, `searchUsers` (people/pages), `getUser` and `listUserPosts` independently callable for future detail collection. These are internal methods, not extra MCP tools. There is no posting, messaging, automated login or cookie import through MCP.

Follow [match evaluation](match-evaluation.md) and [dynamic tables](dynamic-tables.md) when evaluating or saving results. Never invent profile facts from missing evidence.


Search combines native identities, same-ID avatars and matched posts with one basic profile lookup per distinct author. Query initialization is reused within the task. No recent timeline is read. Missing biography or followers remains unknown; followers_text is a display string, not an exact count. Follow [Creator discovery](creator-discovery.md) before saving, and [Platform posts](platform-posts.md) for requested recent evidence.


Facebook post evidence can include a verified group name/link from the same native response, or the group URL explicitly present in the returned post link. Use it together with the actual caption for semantic context. SMP/Realm recruitment in a Minecraft community can support an initial topic association; it does not prove creator professionalism or ownership. Numeric group IDs alone are not topic labels.

Long text remains bounded. The reader may show one complete matching paragraph with ellipses, otherwise the original prefix; omitted text remains unknown. Generic greetings and vague hashtags without other topic evidence do not qualify a new candidate for saving; lack of a literal keyword alone does not prove irrelevance. Review returned profile and reliable context before deciding.
