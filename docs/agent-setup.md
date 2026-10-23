# OneCrew Pro setup

Read the Access guide for the user's target computer and selected installation method:

| System | ZIP | npm |
| --- | --- | --- |
| macOS | [Installation guide](https://access.onecrewai.io/cli/install/pro) | [Installation guide](https://access.onecrewai.io/cli/install/pro/npm) |
| Windows x64 | [Installation guide](https://access.onecrewai.io/cli/install/pro/windows) | [Installation guide](https://access.onecrewai.io/cli/install/pro/npm/windows) |

When the user's prompt already contains a guide URL, use that complete URL, including its query parameters. Access supplies the current releases, proxy and permission handling, installation commands, client configuration and verification steps.

Use the current AI client unless the user selects another. Codex and WorkBuddy desktop use the plugins published by this repository; other compatible clients connect to the local Pro MCP service. A plugin-only update keeps the existing application and data directory.

For WorkBuddy desktop, follow [the suite installation steps](../README.md#workbuddy-desktop). Provide the resolved executable path and the running service's data directory for its settings. The suite includes MCP and both Skills; keep one active OneCrew connection. Installation verification requires a live tool call in a new WorkBuddy conversation after restart and trust.

For OneCrew Lite, use its own installation guide.

## Workflow skills

After connecting MCP, read workflow guidance when the user's task needs it:

- [OneCrew](../plugins/onecrew/skills/onecrew/SKILL.md): creators, platform connections, tables, leads and email.
- [OneCrew web research](../plugins/onecrew/skills/onecrew-web-research/SKILL.md): web search and extraction explicitly requested through OneCrew.

Use the live MCP tool descriptions and schemas. When installing a skill in a supported client, include its complete references directory. Skills are optional for MCP connection verification.
