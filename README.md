# OneCrew

OneCrew shared Skills and plugin marketplace for desktop AI clients.

This is the container preview branch, `codex/container-preview`, with plugin
version `0.1.23`. It connects to Pro `0.1.30`; see
[Container installation](plugins/onecrew/skills/onecrew/references/container-installation.md)
for the image and installation steps. This preview targets macOS Apple Silicon.

The plugin includes a container MCP connection and both shared Skills. Pull and
start Pro with the commands in [Container installation](plugins/onecrew/skills/onecrew/references/container-installation.md).
Computers with an existing native installation use the separate
[native migration case](plugins/onecrew/skills/onecrew/references/native-to-container.md).

For agents installing OneCrew Pro or connecting WorkBuddy and other MCP clients, read [Agent setup and shared Skill workflows](docs/agent-setup.md).

## Codex

```sh
codex plugin marketplace add onecrewai/onecrew-plugins --ref codex/container-preview
codex plugin add onecrew@onecrew
```

Use Codex and OneCrew on the same computer. The plugin uses the Docker CLI and
the current Docker context to connect to `onecrew-pro`. Docker Desktop and Kiri
can provide the container engine. Start a new conversation after installation.

To use OneCrew in Codex, type `@` in the chat input, select **OneCrew**, then enter your request.

If OneCrew is already configured from another source or Git ref, run
`codex plugin marketplace remove onecrew` before adding this source.

## WorkBuddy desktop

Follow [WorkBuddy setup](plugins/onecrew/skills/onecrew/references/workbuddy-setup.md)
to install the selected plugin revision and connect its MCP server and Skills.

## Standard MCP clients

Follow the numbered [standard MCP setup](plugins/onecrew/skills/onecrew/references/container-installation.md#standard-mcp-clients-without-a-plugin-manager)
to register the stdio server, install the shared Skills and verify the connection.

## Update in Codex

Follow [Plugin updates](plugins/onecrew/skills/onecrew/references/plugin-update.md)
to select the source and verify the installed files. Update the Pro image separately.
