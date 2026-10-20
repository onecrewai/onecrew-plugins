# OneCrew

OneCrew plugin marketplace for Codex. Includes the OneCrew and OneCrew web research skills. Install and start the OneCrew application before using the plugin.

For agents installing OneCrew Pro or connecting WorkBuddy and other MCP clients, read [Agent setup and shared Skill workflows](docs/agent-setup.md).

## Install

```sh
codex plugin marketplace add onecrewai/onecrew-plugins
codex plugin add onecrew@onecrew
```

Use Codex and OneCrew on the same computer. Select your operating system and installation method on the [Pro installation page](https://onecrewai.io/en/product/onecrew-pro#install), then start a new Codex conversation after plugin installation.

If you previously added OneCrew from a local folder, run `codex plugin marketplace remove onecrew` before adding this GitHub source. Your OneCrew data is kept.

## Update

Follow [Plugin updates](plugins/onecrew/skills/onecrew/references/plugin-update.md) to select the published source and verify the installed files. Start a new conversation after updating. Update the OneCrew application separately with the version selected by Access.
