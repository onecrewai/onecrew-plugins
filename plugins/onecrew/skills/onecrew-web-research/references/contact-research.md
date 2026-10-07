# Contact research

Use exact profile URLs already supplied or verified with `platform_enrich_create` and `fields: ["email"]`. Profile enrichment covers its declared profile/contact and Linktree sources. An empty field or restricted platform email route leaves other webpages unverified.

When the user asks more broadly to find an email, use a query that states that intent, such as `MrBeast 邮箱` or `MrBeast business contact email`. Avoid spending that lookup on channel-identity searches when the exact channel URL is already known. Keep the user's language and requested purpose in the query. Use at most three relevant queries per creator, and stop the affected search when it is blocked or rate-limited.

Read relevant source pages. Prefer official contact pages for confirmation, while retaining useful third-party articles as leads. A search snippet alone is insufficient. For an article use `web_extract` with `mode: "article"`; for a contact page or profile links use `mode: "page"`. Preserve the source URL and available publication/update date.

Keep three evidence stages distinct:

- **Discovered lead:** an address or source appeared in a search result and has not yet been read.
- **Source read:** the retrieved page contains the address. Attribute third-party claims to that page and mark current ownership or official confirmation as unresolved.
- **Official source:** a source verified as belonging to the creator or organization publishes the address. This confirms the publication and stated purpose, not mailbox deliverability.

Record the purpose actually stated: business partnership, charity, store support, giveaway submissions, general contact or unspecified. Retain the original label when the purpose differs or is unclear. An article may list several addresses for different organizations; do not combine them into one verified business contact.

Report lookup failures precisely. `body_limit` means the source exceeded the download cap; lowering `max_chars` only changes output length. `requires_rendering` means readable content was unavailable through HTTP. `blocked`, `rate_limited` and `response_format_changed` are failed requests, not no-match results. Do not retry them through another entry point or repeatedly change terms to evade an access check.

An explicit public article URL supplied later by the user can be read as a separate input even if an earlier search was blocked. Respect that article's own restrictions. This does not justify alternate access to the blocked resource.

For each creator, report the addresses found, their purpose, source and evidence stage, plus any unresolved reads. Distinguish an email-intent query that was never made, a query that failed, and a particular source that was read without yielding an address. Say “not obtained from the checked sources” when appropriate; incomplete research does not establish that a contact is unpublished or unavailable online.
