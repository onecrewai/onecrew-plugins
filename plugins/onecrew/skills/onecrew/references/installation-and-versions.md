# Installation and versions

The dashboard is the local Web panel. `onecrew_runtime` with `action: "status"`
returns the service state, data directory and current `url`. For a running
service, give the user a clickable `/library` link at that address.

The desktop launcher starts, stops and updates the application. The MCP bridge
reads `run/server.json` in the data directory and follows port changes.
Keep the descriptor's private control token out of tool output.

For client connection steps, use the platform guide:

- https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop/docs/agent-setup-macos.md
- https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop/docs/agent-setup-windows.md

The default data directory is `~/Library/Application Support/OneCrewConnect` on
macOS and `%LOCALAPPDATA%\OneCrewConnect` on Windows.

| Component | Version source |
| --- | --- |
| Running Pro | MCP `account` with `action: "version"`, or `GET /api/v1/access/version` at the URL returned by `onecrew_runtime` |
| Desktop application | Version shown in the launcher |
| Plugin | Client installation record and that installation's `plugin.json` |
| Copied Skills | Source commit recorded by the client or in `SOURCE.md` |

Application and plugin versions are independent. Check the installed files used
by the current client. A different checkout or cache directory does not identify
the loaded version.

Codex lists installed records with `codex plugin list --marketplace onecrew --json`.
WorkBuddy records them in `plugins/installed_plugins.json` under its active
configuration directory. Follow the recorded path to the installed manifest.

For plugin and Skill updates, read [Plugin updates](plugin-update.md).
