# Profile contact enrichment

Use `platform_enrich_create/status/fetch` when the user requests published email, phone or linked social accounts for specified profiles. Ordinary creator search does not automatically require enrichment.

## Input

Pass one platform, 1–20 profile URLs and a required `fields` array. Supported fields are `email`, `phone`, `social_accounts`. Select the fields the user requested; if “enrich” is ambiguous, ask which fields they need.

```json
{
  "platform": "facebook",
  "fields": ["email", "social_accounts"],
  "targets": [{"profile_url": "https://www.facebook.com/example.creator"}]
}
```

Use profile URLs, not post URLs or search keywords. X/Instagram use username profile URLs; Facebook currently supports Page username URLs; YouTube uses @handle or /channel/ URLs and the connected API Key. Do not derive a different account when a supplied target fails.

Replace the example profile URL with the user's exact target.

Reuse an exact profile URL already provided by the user or verified earlier. Submit it directly to enrich with the requested fields, then fetch the result before deciding whether another lookup is needed.

## Read results

Retain `enrich_task_id`, follow `poll_after_ms`, and wait for `completed` or `failed`. Phases describe profile reading and linked-page reading. Fetch cached pages with the same platform; size defaults to 3 and is capped at 10. Running returns `result:null`.

Status accepts only the task ID. Replace the example ID below with the ID returned by create:

```json
{"enrich_task_id":"enr_0123456789abcdef01234567"}
```

First fetch:

```json
{"enrich_task_id":"enr_0123456789abcdef01234567","platform":"youtube","params":{"size":3}}
```

For another cached page, copy `result.next_cursor` into `params.cursor`. For example, when it is `"3"`:

```json
{"enrich_task_id":"enr_0123456789abcdef01234567","platform":"youtube","params":{"size":3,"cursor":"3"}}
```

Keep the platform from create. Status has no platform parameter; fetch uses cursor pagination and has no page parameter.

Read every requested target's status, fields, sources and warnings. `completed` means processing finished, not that a contact value was found. Empty arrays describe the successfully read sources; a failed or blocked source does not prove that no contact exists. Report failed and not_processed targets separately and preserve successful results.

Only directly supplied profile/contact information and up to two linked public Linktree pages are read. General websites and recent posts are outside this operation. Linked social accounts are published associations, not proof of common ownership.

`email: []` means this lookup did not return an address. `youtube.business_email_not_public` describes the public YouTube route's restriction. Keep contact leads already obtained from other sources. For broader contact research, use the webpage skill only when the user explicitly invoked OneCrew in the current conversation; follow its three-step contact workflow. If the user requested only platform enrichment, report that limited result.

Cite each value using its own `sources[].url` and `field`. When both the requested platform and a linked page support a value, cite the platform source first; group values only when their cited sources match. A linked page listed for one value does not establish the source of another value.

These sources were already read by enrichment. Use the returned evidence directly for profile-contact requests; fetch another page only when additional information is needed. `web_extract` uses public HTTP without connected platform sessions, so its failure does not invalidate a successful platform read.

Do not guess or validate unpublished addresses, unlock hidden email, send messages, or change a score based on enrichment alone. Saving requested results uses the existing table workflow; enrichment itself does not write tables.

When the tool returns a connection or proxy recovery action, show its Web panel link and wait for user-confirmed recovery. Account, Key and proxy configuration belongs in that panel.
