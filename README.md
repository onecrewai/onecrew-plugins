# OneCrew

OneCrew shared Skills and plugin marketplace for desktop AI clients.

This is the container preview branch, `codex/container-preview`, with plugin
version `0.1.23`. It connects to Pro `0.1.30`; see
[Container installation](plugins/onecrew/skills/onecrew/references/container-installation.md)
for the image and current test scope.

The plugin includes a container MCP connection and both shared Skills. Start Pro
with its Compose configuration, then follow [Container installation](plugins/onecrew/skills/onecrew/references/container-installation.md).
Computers with an existing native installation use the separate
[native migration case](plugins/onecrew/skills/onecrew/references/native-to-container.md).

For agents installing OneCrew Pro or connecting WorkBuddy and other MCP clients, read [Agent setup and shared Skill workflows](docs/agent-setup.md).

## Codex

```sh
codex plugin marketplace add onecrewai/onecrew-plugins --ref codex/container-preview
codex plugin add onecrew@onecrew
```

Use Codex and OneCrew on the same computer. The plugin locates Kiri and connects
to the running `onecrew-pro` container. Start a new conversation after installation.

To use OneCrew in Codex, type `@` in the chat input, select **OneCrew**, then enter your request.

If OneCrew is already configured from another source or Git ref, run
`codex plugin marketplace remove onecrew` before adding this source.

## WorkBuddy desktop

The plugin declares `runtime_path` for the container runtime executable and
`container_name` for the running OneCrew container. This preview has not been
tested in the WorkBuddy client or on Windows.

## Update in Codex

Follow [Plugin updates](plugins/onecrew/skills/onecrew/references/plugin-update.md)
to select the source and verify the installed files. Update the Pro image separately.
