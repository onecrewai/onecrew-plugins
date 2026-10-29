# Installation paths and versions

## Locate the current installation

Read the current client's OneCrew MCP configuration first. Keep its executable path, data directory and environment. Codex's `ONECREW_BINARY` and the WorkBuddy plugin's `binary_path` / `data_dir` can point to custom locations.

For an npm installation, use the Node/npm environment that owns that installation.

macOS:

```sh
onecrew-pro --print-binary-path
onecrew-pro --version
onecrew-pro status
npm ls --global @onecrew/pro --depth=0 --json
```

Windows:

```powershell
onecrew-pro.cmd --print-binary-path
onecrew-pro.cmd --version
onecrew-pro.cmd status
npm.cmd ls --global @onecrew/pro --depth=0 --json
```

Pass the configured `--data-dir` or `ONECREW_DATA_DIR` to `status`. Use the local address and port it reports.

`npm ls` reports the entry package. Read `package.json` beside the resolved native executable for the platform package version.

`--print-binary-path` returns the executable inside the npm package. After an application update, this entry forwards to the active version; MCP can keep its existing path. `ONECREW_INSTALL_DIR` sets the update directory. Defaults:

- macOS: `~/Library/Application Support/OneCrewPro`
- Windows: `%LOCALAPPDATA%\OneCrewPro`

`<target>` is `darwin-arm64`, `darwin-x64`, or `win32-x64`. `current-<target>.json` records the active version. Its executable is `versions/<target>/<version>/onecrew`, or `onecrew.exe` on Windows. Use `status` to inspect the service; its full descriptor file contains authorization data and should not be printed.

## Check each version separately

| Component | Read from | Meaning |
| --- | --- | --- |
| Running application | MCP `account` with `action: "version"`, or `GET /api/v1/access/version` at the actual local address | The binary serving requests; use this to verify an application update |
| npm packages | `npm ls` above and the installed `package.json` files | Entry and platform package versions; compare the platform package with the entry's `optionalDependencies` |
| Client plugin | The client's enabled installation record and its `plugin.json` | The version of the MCP configuration and bundled Skills |
| Standalone Skills | The client's source record, Git commit or local `SOURCE.md` | The source revision of copied workflow files; this installation has no plugin version |

Application and plugin releases are independent; their version numbers may differ. npm metadata may also retain the older package version after an application update. If CLI `--version` differs from the running service, check the process, address and data directory. The MCP initialization version can belong to an older bridge; verify the service with `account version`.

## Check the current client's installation

### Codex plugin

```sh
codex plugin list --marketplace onecrew --json
```

Read OneCrew's `version`, `installed` and `enabled` fields under `installed`. Verify `.codex-plugin/plugin.json` in that installation and the bundled `onecrew` and `onecrew-web-research` Skill directories.

### WorkBuddy plugin

Use the running desktop client's actual configuration directory, such as `.workbuddy` or `.workbuddy-ai`. In `plugins/installed_plugins.json`, find the `onecrew@onecrew` installation and read its `version` and `installPath`. Follow that path to `.workbuddy-plugin/plugin.json`; the registry file's own schema version is not the plugin version.

Check `settings.json` for `enabledPlugins["onecrew@onecrew"]` and the configured `binary_path` / `data_dir` under `pluginConfigs["onecrew@onecrew"].options`. The plugin installs MCP and both Skills together. Verify the manifest's `skills` directory rather than creating a second copy.

### Other MCP clients and standalone Skills

A direct MCP connection provides tools. If the client supports Skills, install both complete directories from `https://github.com/onecrewai/onecrew-plugins` at the commit specified by the installation prompt:

```text
plugins/onecrew/skills/onecrew/
plugins/onecrew/skills/onecrew-web-research/
```

Copy or import them into that client's supported Skill location, keeping `SKILL.md` and all `references/` files. This also applies to a direct MCP setup in Codex or WorkBuddy without the OneCrew plugin. Confirm both Skills are discoverable; if the client does not support Skills, report MCP as connected and Skills as unsupported.

Keep the repository URL, exact commit, source subdirectory and installed location in the client's installation record. If it has no source record, write those fields to `SOURCE.md` inside each installed Skill directory so later conversations can read them. For an existing copy without this information, report the source revision as unknown until its files are verified against a known commit.

Check the registered installation and its files. GitHub source and other cache directories are only comparison sources.

## Update

- Application: prefer the built-in updater. If it fails, return to the [installation page](https://onecrewai.io/zh/product/onecrew-pro#install) and follow the original prompt's npm update branch. Confirm the current job has ended and needs no recovery, then stop the old service, install and start. Preserve the data directory, port and MCP configuration. No uninstall is needed.
- Plugin: use the current client's plugin manager; see [Plugin updates](plugin-update.md) for Codex. Verify this separately from the application version.
- Standalone Skills: update both directories from the selected commit, preserve local customizations, and update their source records. Keep the working MCP configuration.
- The AI assistant executes the commands. Choose a supported execution tool based on the failure and obtain the required authorization. The user handles only approvals, sign-in or client restarts that require their presence.

Report the application version, plugin version or standalone Skill source revision, and result of a real MCP call separately. If the client needs a restart or new conversation to load the plugin or Skills, complete that step before reporting them as loaded.
