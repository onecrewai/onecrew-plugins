# Profile contact enrichment

Use `platform_enrich_create/status/fetch` when the user requests published email, phone or linked social accounts for specified profiles. Ordinary creator search does not automatically require enrichment.

## Input

Pass one platform, 1–20 profile URLs and a required `fields` array. Supported fields are `email`, `phone`, `social_accounts`. Select the fields the user requested; if “enrich” is ambiguous, ask which fields they need.

```json
{
  "platform": "facebook",
  "fields": ["email", "social_accounts"],
  "targets": [{"profile_url": "https://www.facebook.com/ProjectNightfall"}]
}
```

Use profile URLs, not post URLs or search keywords. X/Instagram use username profile URLs; Facebook currently supports Page username URLs; YouTube uses @handle or /channel/ URLs and the connected API Key. Do not derive a different account when a supplied target fails.

## Read results

Retain `enrich_task_id`, follow `poll_after_ms`, and wait for `completed` or `failed`. Phases describe profile reading and linked-page reading. Fetch cached pages with the same platform; size defaults to 3 and is capped at 10. Running returns `result:null`.

Read every requested target's status, fields, sources and warnings. `completed` means processing finished, not that a contact value was found. Empty arrays describe the successfully read sources; a failed or blocked source does not prove that no contact exists. Report failed and not_processed targets separately and preserve successful results.

Only directly supplied profile/contact information and up to two linked public Linktree pages are read. General websites and recent posts are outside this operation. Linked social accounts are published associations, not proof of common ownership.

Show the source of each reported contact value. Do not guess or validate unpublished addresses, unlock hidden email, send messages, or change a score based on enrichment alone. Saving requested results uses the existing table workflow; enrichment itself does not write tables.

When the tool returns a connection or proxy recovery action, show its Web panel link and wait for user-confirmed recovery. Account, Key and proxy configuration belongs in that panel.
