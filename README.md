# OneCrew

OneCrew plugin marketplace for Codex and WorkBuddy desktop. Includes the local OneCrew MCP connection and the OneCrew and OneCrew web research Skills. Install and start the OneCrew application before using the plugin.

For agents installing OneCrew Pro or connecting WorkBuddy and other MCP clients, read [Agent setup and shared Skill workflows](docs/agent-setup.md).

## Codex

```sh
codex plugin marketplace add onecrewai/onecrew-plugins
codex plugin add onecrew@onecrew
```

Use Codex and OneCrew on the same computer. Select your operating system and installation method on the [Pro installation page](https://onecrewai.io/en/product/onecrew-pro#install), then start a new Codex conversation after plugin installation.

To use OneCrew in Codex, type `@` in the chat input, select **OneCrew**, then enter your request.

If you previously added OneCrew from a local folder, run `codex plugin marketplace remove onecrew` before adding this GitHub source. Your OneCrew data is kept.

## WorkBuddy desktop

1. Open **Experts · Skills · Connectors** in the left sidebar → **Skills → Suites**, then click **+** beside the marketplace tabs.
2. Enter `https://github.com/onecrewai/onecrew-plugins` in **Marketplace source** and click **Submit**.
3. Select the **onecrew** marketplace and click **+** on the **onecrew** card. A checkmark indicates the plugin is installed.

Type `/one` in the chat input, select **onecrew** or **onecrew-web-research** from the Skills list, then enter your request.

## Update in Codex

Follow [Plugin updates](plugins/onecrew/skills/onecrew/references/plugin-update.md) to select the published source and verify the installed files. Start a new conversation after updating. Update the OneCrew application separately with the version selected by Access.
