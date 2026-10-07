# Contact research

Use this workflow only in a conversation where the user explicitly invoked OneCrew by name or selected its plugin.

1. **Locate.** Use an exact profile URL for enrichment when available. With only a name, search for `{creator name} email/contact` in the user's language. `platform_search_create` is topic discovery, not a step in this contact lookup.
2. **Read.** Enrichment results already contain evidence from the sources they read. For web search candidates or additional information, read relevant pages, including third-party articles. Use article mode for articles, page mode for contact pages, and leave `include_links` false unless following a source. Retain addresses and their stated purposes. Follow the webpage skill's access restrictions.
3. **Report.** Cite the source attached to each value. Prefer the requested platform's source when available, and identify values obtained only from linked pages separately. Report verification level and preserve business, charity, support and giveaway distinctions. Official publication does not verify deliverability. A failed read or an unread search snippet does not override evidence already obtained. `email: []` and `youtube.business_email_not_public` describe only that lookup's result.
