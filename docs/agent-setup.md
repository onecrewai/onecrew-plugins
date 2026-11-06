# OneCrew Pro setup

Use the version in the user's installation guide. Current guides are available for [macOS](https://access.onecrewai.io/cli/install/pro/npm) and [Windows](https://access.onecrewai.io/cli/install/pro/npm/windows). OneCrew Lite uses its own guide.

Pro 0.1.27+ includes `setup`. Invoke it through the selected npm package:

```sh
npm exec --yes --package=@onecrew/pro@<version> -- onecrew-pro setup --client codex
```

Use `--client workbuddy` for WorkBuddy. Its active configuration directory and bundled `cli/bin/codebuddy` can be supplied with `--client-dir` and `--client-cli`. For another MCP client, use `--client mcp --mcp-config <file> --skills-dir <directory>` with its supported JSON/JSONC MCP configuration and Skill directory. Preserve an existing custom profile with `--data-dir`.

The script installs a persistent npm copy, configures the selected client and verifies the service through HTTP and MCP. It preserves other client settings and copies both complete Skills for ordinary MCP clients. On failure, use the returned step and error to correct the problem, then repeat setup. The user handles required authorization, client trust or reload, and sign-in. Verify tools in the client after reloading; script verification does not establish that the current conversation loaded them.

For older Pro versions, follow the guide's installation commands. A plugin-only update uses the client's plugin manager and keeps the application and data profile.

## Service and workflows

`onecrew_runtime` provides `status`, `start` and `diagnose` while the service is stopped. For a request requiring OneCrew, start the service, refresh the tool list and continue. Report an actual startup error using the returned details.

- [OneCrew](../plugins/onecrew/skills/onecrew/SKILL.md): creators, platform connections, tables, leads and email.
- [OneCrew web research](../plugins/onecrew/skills/onecrew-web-research/SKILL.md): requested OneCrew web search and extraction.

Use current tool schemas. In Codex, select OneCrew with `@`; in WorkBuddy, select its Skills with `/one`.
