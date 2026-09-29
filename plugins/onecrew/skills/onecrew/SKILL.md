---
name: onecrew
description: Discover creators, manage email workflows, and maintain OneCrew workspace data. Use when checking platform connections, researching creators, working with email or dynamic tables through OneCrew MCP, or installing, updating, and reinstalling the OneCrew Codex plugin.
---

# OneCrew

Follow the user's language for replies and user-facing content unless they request another language. Keep API field names, IDs, and enum values unchanged.

For OneCrew plugin installation, updates, or reinstallation, read [Plugin updates](references/plugin-update.md). Use the local Codex CLI workflow described there.

Read search platform connection status with `platform_connection_list`; it returns the last known state and check time without making a new provider request.

Use the connected OneCrew MCP tools and their current schemas. This skill supplies workflow guidance; MCP clients can also use the tools without it. Check OneCrew sign-in with `account`; direct the user to the returned authorization page when needed. Never request credentials in chat.

Before selecting a table, designing columns, or writing records, read [Dynamic tables](references/dynamic-tables.md). It defines table continuity within a conversation, entity updates, rich cell types, and write verification.

For creator discovery and platform-specific setup or evidence limits, read [Creator discovery](references/creator-discovery.md). Search `limit` defaults to 20 and accepts 1–100. Follow `poll_after_ms`, explain phase changes briefly, and report actual results when collection ends below the target.

For mailbox synchronization, conversation reads, and replies, read [Email workflows](references/email.md).

Before assigning or revising a `score` and its `reason`, read [Evaluation and reasons](references/match-evaluation.md). It defines platform-neutral criteria, evidence requirements, rating levels, missing-data handling, and evidence-based evaluation paragraphs.

Use tools directly for existing table operations. Do not substitute browser scraping, search for service source code, or start another same-named service. Report unavailable connections and give the user the relevant Web panel link.

Report only confirmed outcomes and include the exact table detail URL returned by the tools. Distinguish existing data, newly written records, and incomplete work.
