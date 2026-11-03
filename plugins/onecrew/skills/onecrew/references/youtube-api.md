# YouTube creator search

OneCrew searches public video metadata, extracts distinct channel IDs, and reads basic channel profiles. The user connects an API Key in Web Accounts; setup and connection errors are covered in the [Pro FAQ](faq.md#youtube-api-key).

## Search conditions

Call `platform_search_create` with `platform: "youtube"`, `query`, and optional conditions from the tool schema. `limit` is a candidate target per run (default 20, range 1–100); the whole final source page is retained.

| Parameters | Meaning |
| --- | --- |
| `publishedAfter`, `publishedBefore` | Inclusive video publication bounds in RFC 3339 format. The lower bound cannot exceed the upper bound. |
| `order` | `relevance` (default), `date`, `rating`, `title`, or `viewCount`; sorts videos, not creators by subscribers. |
| `relevanceLanguage` | Language preference. Results in other languages can still appear. |
| `regionCode` | Region where videos can be viewed; not creator residence. |
| `channelId` | Search videos from the specified channel. |
| `videoCategoryId`, `topicId` | Video category or a supported YouTube topic ID. |
| `videoDuration` | `short`: under 4 minutes; `medium`: 4–20 minutes; `long`: over 20 minutes. |
| `location`, `locationRadius` | Video metadata location. Supply both; radius is at most 1000 km. This does not establish creator residence. |

The schema also exposes broadcast status, safe-search and video attribute filters: `eventType`, `safeSearch`, `videoCaption`, `videoDefinition`, `videoDimension`, `videoEmbeddable`, `videoLicense`, `videoPaidProductPlacement`, `videoSyndicated`, and `videoType`.

These are public `type=video` searches. Google has no subscriber or business-email search filter. OneCrew can filter subscriber counts and channel countries after retrieving profiles. Search results are samples, not an exhaustive directory or global ranking. Non-relevance sorting and date filters can reduce coverage. See Google's [search.list reference](https://developers.google.com/youtube/data/reference/rest/v3/search/list).

## Results and continuation

Retain `search_id`, poll status at `poll_after_ms`, then review complete records in pages of 20. Follow `next_page` while more qualified creators are needed and stop at the goal. Fetch makes no upstream requests. Each channel includes its native `platform_id`, name, URL and available profile fields, with up to three matched-video snippets. For reading newly appended results, use [Cached-page progress](creator-discovery.md#cached-page-progress).

Use fetch `params.min_subscribers`, `country` and `exclude_ids` for user-specified conditions and previously reviewed channels. Filtering preserves complete records and the raw cache. `total` counts filtered records; `source_total` counts all cached records. Missing country/count values stay in the result and are reported by `unknown_country_count` and `unknown_subscriber_count`. Keep filters and exclusions fixed while paging.

`country` is the channel's configured country (`snippet.country`); missing means unknown. Use it for an initial declared-country selection, with extra evidence for conflicting information or an actual-location requirement. It does not establish residence or audience geography. Subscriber values retain YouTube's returned precision. See Google's [channel fields](https://developers.google.com/youtube/data/reference/rest/v3/channels#snippet.country).

For missing requested email, pass this `search_id` and selected channel URLs to `platform_enrich_create`. It reuses cached profiles and batch-reads the matched videos' full descriptions before trying public About and linked Linktree sources. Source context helps distinguish creator contacts from sponsor/support addresses. Existing dated matches can establish recent activity; no recent timeline is needed just to repeat that check.

`platform_search_continue({search_id})` reuses the original conditions, cursor, candidates and remaining budget. The backend can switch an unavailable Key during pagination or channel lookup, retrying only the failed request. Successful pages and channel batches remain saved. Failed Keys are excluded from selection; known Keys in an exhausted project are paused together. Project identity is recorded only when Google provides it. Multiple Keys in one project share quota.

If all usable Keys fail, fetch the retained results and read `error_code`, `recovery` and `failed_connections`. `retry_at` is supplied only when the response provides a valid retry time; an unspecified 429 does not establish a 60-second recovery. A successful Web connection check clears a Key's Needs attention state. A channel lookup can pass while the separate search quota remains exhausted.

Each search ID has up to five upstream search pages, 400 API attempts and 250 distinct candidates. Continuation does not renew its temporary result lifetime. `can_continue` means work remains within that task, not that provider access has recovered.

Use [Creator discovery](creator-discovery.md) for screening, cumulative targets and saving results. Use [Platform posts](platform-posts.md) when recent-content evidence is needed; ordinary search does not read uploads playlists or recent timelines.
