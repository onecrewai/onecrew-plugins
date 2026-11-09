# WorkBuddy desktop setup

Use this guide for WorkBuddy after the Pro container is running.
For container installation, see [Container installation](container-installation.md).

## Locate the desktop client

1. Identify the running desktop client's configuration directory, `.workbuddy`
   or `.workbuddy-ai`, and its bundled `cli/bin/codebuddy` entry.
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
   git clone --branch codex/container-preview --single-branch https://github.com/onecrewai/onecrew-plugins.git "<source-dir>"
   git -C "<source-dir>" fetch origin "<commit>"
   git -C "<source-dir>" switch --detach "<commit>"
   ```

2. Through the desktop CLI located above, run `plugin marketplace list` and
   `plugin list --json`. Reuse a matching source and installed revision. When the
   `onecrew` marketplace points elsewhere, run `plugin marketplace remove onecrew`,
   then add this checkout with `plugin marketplace add "<source-dir>"`.
3. Install with `plugin install onecrew@onecrew --scope user`. For an installed
   plugin from the selected source, use `plugin update onecrew@onecrew --scope user`.
   Confirm `plugin list --json` reports version `0.1.24` and the installed files
   match the selected source. Both Skills and their references are bundled.

## Configure and verify

1. In the actual desktop `settings.json`, merge
   `enabledPlugins["onecrew@onecrew"] = true` and
   `pluginConfigs["onecrew@onecrew"].options`:

   | Option | Value |
   | --- | --- |
   | `runtime_path` | Absolute path to the Docker-compatible CLI used to start Pro |
   | `container_name` | Actual Pro container name, normally `onecrew-pro` |

   Remove OneCrew's obsolete `binary_path` and `data_dir` options. Preserve other
   settings. The CLI must use the same Docker context as the Pro container.
2. Reload WorkBuddy's OneCrew MCP connection and both Skills. Call `account` with
   `action: "version"` and `action: "status"`. Check the application version,
   `deployment: "container"`, and account state.
3. After verification, remove any obsolete manual OneCrew MCP entry replaced by
   this plugin. Preserve the client's other MCP servers.
4. Start a new conversation if WorkBuddy has not loaded the updated connection.

The CLI accepts local marketplace directories and user-scoped plugin installation:
[CodeBuddy plugin reference](https://www.codebuddy.ai/docs/cli/plugins-reference).
