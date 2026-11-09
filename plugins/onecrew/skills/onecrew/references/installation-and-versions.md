# Installation and versions

Open the OneCrew Pro desktop launcher to start, stop or update the application.
Its service panel shows the active data directory and local address. The MCP
bridge reads `run/server.json` in that directory and follows port changes.
Keep the descriptor's private control token out of tool output.

For client connection steps, use the platform guide:

- https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop-preview/docs/agent-setup-macos.md
- https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop-preview/docs/agent-setup-windows.md

| Component | Version source |
| --- | --- |
| Running Pro | MCP `account` with `action: "version"`, or `GET /api/v1/access/version` at the launcher's local address |
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
