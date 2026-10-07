# Contact research

Use this workflow only in a conversation where the user explicitly invoked OneCrew by name or selected its plugin.

1. **Locate.** Use an exact profile URL for enrichment when available. With only a name, search for `{creator name} email/contact` in the user's language. `platform_search_create` is topic discovery, not a step in this contact lookup.
2. **Read.** Read relevant sources, including third-party articles, and retain the addresses, stated purposes and evidence. Use article mode for articles, page mode for contact pages, and leave `include_links` false unless following a source. An unread search snippet may be outdated; it cannot replace information in a page already read. Follow the webpage skill's access restrictions.
3. **Report.** Return acquired leads with purpose, source and verification level: search-only, read third-party source, or verified official publication. Preserve business, charity, support and giveaway distinctions. Official publication does not verify deliverability. Report failures separately without discarding other findings. `email: []` and `youtube.business_email_not_public` mean that route did not obtain an address, not that no public email exists.
