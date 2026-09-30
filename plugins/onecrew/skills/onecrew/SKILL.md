---
name: onecrew
description: Discover creators, manage email workflows, and maintain OneCrew workspace data. Use when checking platform connections, researching creators, working with email or dynamic tables through OneCrew MCP, or installing, updating, and reinstalling the OneCrew Codex plugin.
---

# OneCrew

Follow the user's language for replies and user-facing content unless they request another language. Keep API field names, IDs, and enum values unchanged.

For OneCrew plugin installation, updates, or reinstallation, read [Plugin updates](references/plugin-update.md). Use the local Codex CLI workflow described there.

Read search platform connection status with `platform_connection_list`; it returns the last known state and check time without making a new provider request.

When a search returns `next_action: "check_proxy_in_web"`, show the affected account and `connect_url`. Wait for the user to confirm the connection is working before continuing.

Use the connected OneCrew MCP tools and their current schemas. This skill supplies workflow guidance; MCP clients can also use the tools without it. Check OneCrew sign-in with `account`; direct the user to the returned authorization page when needed. Never request credentials in chat.

Before selecting a table, designing columns, or writing records, read [Dynamic tables](references/dynamic-tables.md). It defines table continuity within a conversation, entity updates, rich cell types, and write verification.

For creator discovery, read [Creator discovery](references/creator-discovery.md). Search includes basic profiles and matched content. Check relevance and required conditions, then score and save retained candidates. `limit` is a candidate target: default 20, range 1–100. Follow `poll_after_ms` and report actual saved and unverified counts.

For requested recent posts or an evaluation that needs recent evidence, read [Platform posts](references/platform-posts.md). Ordinary search does not require this follow-up. Use native account IDs from search results or saved records.


For mailbox synchronization, conversation reads, and replies, read [Email workflows](references/email.md).

Before assigning or revising a `score` and its `reason`, read [Evaluation and reasons](references/match-evaluation.md). It defines platform-neutral criteria, evidence requirements, rating levels, missing-data handling, and evidence-based evaluation paragraphs.

Use tools directly for existing table operations. Do not substitute browser scraping, search for service source code, or start another same-named service. Report unavailable connections and give the user the relevant Web panel link.

Report only confirmed outcomes and include the exact table detail URL returned by the tools. Distinguish existing data, newly written records, and incomplete work.
