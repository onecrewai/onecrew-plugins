---
name: onecrew
description: Discover creators, manage email workflows, and maintain OneCrew workspace data. Use when checking platform connections, researching creators, working with email or dynamic tables through OneCrew MCP, converting imported tables to standard fields in place, converting Excel files, locating a OneCrew installation, checking application or plugin versions, or installing and updating OneCrew client plugins and shared Skills.
---

# OneCrew

Follow the user's language for replies and user-facing content unless they request another language. Keep API field names, IDs, and enum values unchanged.

For installation paths, application or plugin version checks, or application updates, read [Installation and versions](references/installation-and-versions.md).

For plugin installation, updates or reinstallation, use the current client's plugin manager. Codex-specific steps are in [Plugin updates](references/plugin-update.md).

Read search platform connection status with `platform_connection_list`; it returns the last known state and check time without making a new provider request.

Connect X, Instagram, Facebook, and TikTok in the Web Accounts panel. When Manual import is available, guide the user through the panel's Cookie-Editor store link, Export → JSON on the signed-in platform page, and pasting the JSON directly into OneCrew. Browser-profile reading remains an option. For browser reading or decryption failures, use manual import; for network timeouts, check the network and proxy.

When a search returns `next_action: "check_proxy_in_web"`, show the affected account and `connect_url`. Wait for the user to confirm the connection is working before continuing.

Use the connected OneCrew MCP tools and their current schemas. This skill supplies workflow guidance; MCP clients can also use the tools without it. Check OneCrew sign-in with `account`; direct the user to the returned authorization page when needed. Never request credentials in chat.

On parameter-validation failure, compare the request with the tool's current schema and retry only after identifying a specific mismatch. If the schema rejects its own declared parameters, report the validation error and stop that call.

Before selecting a table, designing columns, or writing records, read [Dynamic tables](references/dynamic-tables.md). It defines table continuity within a conversation, entity updates, rich cell types, and write verification.

For converting imported tables to standard fields in place, or converting Excel files, read [Excel conversion](references/excel-conversion.md).

For creator discovery, read [Creator discovery](references/creator-discovery.md). Search includes basic profiles and matched content. Check relevance and required conditions, assign 1–2 short evidence-based content tags, then score and save retained candidates with their creator and platform profile. Followers is optional. `limit` is a candidate target: default 20, range 1–100. Follow `poll_after_ms` and report actual saved and unverified counts.

Run one search at a time across all keywords and platforms in the conversation. Wait for the active search to finish, fetch and process its results, then continue that search or start the next query. Keep query plans sequential, including searches delegated to other agents.

For requested recent posts or an evaluation that needs recent evidence, read [Platform posts](references/platform-posts.md). Ordinary search does not require this follow-up. Use native account IDs from search results or saved records.

For requested contacts, read [Profile contact enrichment](references/platform-enrich.md). Use an exact profile URL directly when available. Finding a named creator's contact details does not require a topic discovery search.

Use `onecrew-web-research` and OneCrew's `web_search` / `web_extract` only when the user explicitly names OneCrew or selects its plugin in this conversation. General web requests and installed tools alone do not trigger these OneCrew tools. Other available web tools remain available.

For saving source rows as leads and maintaining their contact status or next follow-up, read [Dynamic tables](references/dynamic-tables.md). Source rows remain independent across tables; the lead library displays their current values without merging people.

For selecting lead contacts, drafts, sending, mailbox synchronization, source-owned history, and replies, read [Email workflows](references/email.md).

Before assigning or revising a `score` and its `reason`, read [Evaluation and reasons](references/match-evaluation.md). It defines platform-neutral criteria, evidence requirements, rating levels, missing-data handling, and evidence-based evaluation paragraphs.

Use tools directly for existing table operations. Do not substitute browser scraping, search for service source code, or start another same-named service. Report unavailable connections and give the user the relevant Web panel link.

Report only confirmed outcomes and include the exact table detail URL returned by the tools. Distinguish existing data, newly written records, and incomplete work.
