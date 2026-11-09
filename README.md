# OneCrew

OneCrew shared Skills and plugin marketplace for desktop AI clients.

The plugin includes a container MCP connection and both shared Skills. Start Pro
with its Compose configuration, then follow [Container installation](plugins/onecrew/skills/onecrew/references/container-installation.md).
Computers with an existing native installation use the separate
[native migration case](plugins/onecrew/skills/onecrew/references/native-to-container.md).

For agents installing OneCrew Pro or connecting WorkBuddy and other MCP clients, read [Agent setup and shared Skill workflows](docs/agent-setup.md).

## Codex

```sh
codex plugin marketplace add onecrewai/onecrew-plugins
codex plugin add onecrew@onecrew
```

Use Codex and OneCrew on the same computer. The plugin locates Kiri and connects
to the running `onecrew-pro` container. Start a new conversation after installation.

To use OneCrew in Codex, type `@` in the chat input, select **OneCrew**, then enter your request.

If you previously added OneCrew from a local folder, run `codex plugin marketplace remove onecrew` before adding this GitHub source. Your OneCrew data is kept.

## WorkBuddy desktop

1. Open **Experts · Skills · Connectors** in the left sidebar → **Skills → Suites**, then click **+** beside the marketplace tabs.
2. Enter `https://github.com/onecrewai/onecrew-plugins` in **Marketplace source** and click **Submit**.
3. Select the **onecrew** marketplace and click **+** on the **onecrew** card. A checkmark indicates the plugin is installed.
4. Set the plugin's `runtime_path` to the container runtime executable and `container_name` to the running OneCrew container.

Type `/one` in the chat input, select **onecrew** or **onecrew-web-research** from the Skills list, then enter your request.

## Update in Codex

Follow [Plugin updates](plugins/onecrew/skills/onecrew/references/plugin-update.md)
to select the source and verify the installed files. Update the Pro image separately.
