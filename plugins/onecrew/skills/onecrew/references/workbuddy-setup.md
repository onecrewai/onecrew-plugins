# WorkBuddy desktop setup

Open the OneCrew Pro desktop launcher and start its service before connecting WorkBuddy.

## Locate the desktop client

1. Identify the running desktop client's configuration directory, `.workbuddy`
   or `.workbuddy-ai`, and its bundled `cli/bin/codebuddy` entry.
   On Windows, check the running application's installation directory for
   `resources\app.asar.unpacked\cli\bin\codebuddy`. The usual per-user install
   directory is `%LOCALAPPDATA%\Programs\WorkBuddy`; use the actual path when
   installed elsewhere.
2. Use the client's Node executable and that CLI entry by absolute path.
   For each invocation, pass the CLI path as Node's first argument, followed by
   the plugin command arguments below.
3. In the same command process, set `CODEBUDDY_CONFIG_DIR` and
   `WORKBUDDY_CONFIG_DIR` to the actual desktop configuration directory, set
   `CODEBUDDY_FORCE_LITE_WB_BUNDLE=1`, and remove the inherited `SERVER__PORT`.
   These settings belong to the command process.

## Install the selected plugin revision

1. Clone the repository into a new absolute directory and select the commit
   used to read the installation guide. Replace both placeholders before running:

   ```sh
   git clone --branch codex/desktop --single-branch https://github.com/onecrewai/onecrew-plugins.git "<source-dir>"
   git -C "<source-dir>" fetch origin "<commit>"
   git -C "<source-dir>" switch --detach "<commit>"
   ```

2. Through the desktop CLI located above, run `plugin marketplace list` and
   `plugin list --json`. Reuse a matching source and installed revision. When the
   `onecrew` marketplace points elsewhere, run `plugin marketplace remove onecrew`,
   then add this checkout with `plugin marketplace add "<source-dir>"`.
3. Install with `plugin install onecrew@onecrew --scope user`. For an installed
   plugin from the selected source, use `plugin update onecrew@onecrew --scope user`.
   Confirm `plugin list --json` reports version `0.1.27` and the installed files
   match the selected source. Both Skills and their references are bundled.

## Configure and verify

1. In the actual desktop `settings.json`, merge
   `enabledPlugins["onecrew@onecrew"] = true` and
   `pluginConfigs["onecrew@onecrew"].options`:

   | Option | Value |
   | --- | --- |
   | `node_path` | Full path to the desktop application's `onecrew-runtime/bin/node.exe` on Windows or `onecrew-runtime/bin/node` on macOS |
   | `cli_path` | Full path to that application's `onecrew-runtime/dist/cli.js` |
   | `data_dir` | Full data directory shown in the OneCrew Pro launcher |

   Replace OneCrew's obsolete `binary_path`, `runtime_path` and `container_name`
   options with the three values above. Preserve other settings.
   Use a JSON parser and serializer to
   update settings, then read back the path and confirm the executable exists.
2. Give the user the panel link and [Getting started](getting-started.md) steps.
   Ask them to fully quit WorkBuddy, reopen it and start a new conversation.
   WorkBuddy loads the updated MCP connection after restarting. Keep Pro running.
3. In the new conversation, call `account` with `action: "version"` and
   `action: "status"`. Check the application version, `deployment: "desktop"`,
   and account state. A separate stdio test only verifies the server connection.
4. After verification, remove any obsolete manual OneCrew MCP entry replaced by
   this plugin. Preserve the client's other MCP servers.

The CLI accepts local marketplace directories and user-scoped plugin installation:
[CodeBuddy plugin reference](https://www.codebuddy.ai/docs/cli/plugins-reference).
