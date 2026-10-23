# OneCrew

OneCrew plugin marketplace for Codex and WorkBuddy desktop. Includes the local OneCrew MCP connection and the OneCrew and OneCrew web research Skills. Install and start the OneCrew application before using the plugin.

For agents installing OneCrew Pro or connecting WorkBuddy and other MCP clients, read [Agent setup and shared Skill workflows](docs/agent-setup.md).

## Codex

```sh
codex plugin marketplace add onecrewai/onecrew-plugins
codex plugin add onecrew@onecrew
```

Use Codex and OneCrew on the same computer. Select your operating system and installation method on the [Pro installation page](https://onecrewai.io/en/product/onecrew-pro#install), then start a new Codex conversation after plugin installation.

If you previously added OneCrew from a local folder, run `codex plugin marketplace remove onecrew` before adding this GitHub source. Your OneCrew data is kept.

## WorkBuddy desktop

1. Open the upper-left **Experts · Skills · Connectors → Skills → Suites → Add Marketplace** and enter `onecrewai/onecrew-plugins`.
2. Install the **OneCrew** suite from that marketplace. It includes MCP and both Skills.
3. In the suite settings, set `binary_path` to the native executable path printed by `onecrew-pro --print-binary-path`, and `data_dir` to the data directory printed by `onecrew-pro status`. On Windows, use `onecrew-pro.cmd` for these commands. Enter the actual paths without shell quotes.
4. Restart WorkBuddy, trust and enable the suite's OneCrew connection under **Connectors**, then start a new conversation. Verify the connection with `account` → `status` and confirm both Skills are loaded.

If a standalone OneCrew MCP connection already exists, disable that duplicate after verifying the suite connection. Preserve other connectors. Update the paths in suite settings if the installation or data directory moves.

## Update in Codex

Follow [Plugin updates](plugins/onecrew/skills/onecrew/references/plugin-update.md) to select the published source and verify the installed files. Start a new conversation after updating. Update the OneCrew application separately with the version selected by Access.
