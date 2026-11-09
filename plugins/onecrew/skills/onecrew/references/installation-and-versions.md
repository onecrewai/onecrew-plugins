# Installation paths and versions

## Install and connect

Pro 0.1.27+ provides `onecrew-pro setup --client codex` and `onecrew-pro setup --client workbuddy`. Use the npm version selected by the installation guide. For a first installation, invoke that version through `npm exec --yes --package=@onecrew/pro@<version> -- onecrew-pro setup --client <client>`.

Setup installs a persistent npm copy, preserves the data directory, installs the plugin or Skills, and checks HTTP and MCP. Pass `--data-dir` for an existing custom profile. WorkBuddy accepts `--client-dir` and `--client-cli` when its active installation cannot be identified. Other MCP clients use `--client mcp --mcp-config <file> --skills-dir <directory>` with their actual JSON/JSONC configuration and Skill directory.

Read the returned `completed`, `step`, `error`, service version and client result. Correct the reported problem and repeat setup. The script reuses completed installation and configuration. Client trust, reload and sign-in are reported separately from the script's MCP verification.

When `onecrew_runtime` is available, use `status` or `diagnose` for service state. Call `start` when a requested operation needs the stopped service, refresh tools, then continue. A running service is reused.

## Locate the current installation

Read the current client's OneCrew MCP configuration for its data directory and environment. OneCrew Pro uses npm installation. Set Codex's `ONECREW_BINARY` or WorkBuddy's `binary_path` to the native path returned by that installation's `onecrew-pro --print-binary-path`.

Use the native executable already recorded in the client's OneCrew configuration for status and startup. System or user PATH changes are unnecessary. When locating an npm installation, use the Node/npm environment that owns it. Desktop clients may have a different PATH from the terminal.

Setup keeps its npm copy under `OneCrewPro/npm` in the installation root below. `setup.json` records the selected data profile and `node-path` records the Node executable. The Codex launcher uses these when `ONECREW_BINARY` is unset, then checks PATH. WorkBuddy receives explicit binary and data paths in its plugin settings.

macOS:

```sh
onecrew-pro --print-binary-path
onecrew-pro --version
onecrew-pro status
npm ls --global @onecrew/pro --depth=0 --json
```

Windows: read `binaryPath` and `dataDir` from the current client's OneCrew configuration. `binaryPath` is the absolute path to `onecrew.exe`. In PowerShell:

```powershell
& $binaryPath --version
& $binaryPath status --data-dir $dataDir
```

If the service is stopped:

```powershell
& $binaryPath start --data-dir $dataDir
```

A tool that launches executables directly can use the same absolute path and argument list. If `onecrew-pro` is not found, inspect the configured executable and service status; the missing shell shortcut does not establish that OneCrew is uninstalled or stopped. `--print-binary-path` belongs to the npm entry (`onecrew-pro.cmd` on Windows), not the native executable; invoke that entry by its absolute path when needed.

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

## Runtime files and user data

On macOS, the runtime cache is under `~/Library/Caches/OneCrewConnect/runtime`. Embedded runtime files can be restored from the installed executable. The user data profile is separate; its default path is `~/Library/Application Support/OneCrewConnect`.

Windows npm packages load runtime files from the package's `app` directory. Missing installed files require npm repair or reinstallation while keeping the data profile. The default Windows data profile is `%LOCALAPPDATA%\OneCrewConnect`.

## Update

- Application: prefer the built-in updater. If it fails, return to the [installation page](https://onecrewai.io/zh/product/onecrew-pro#install) and follow the original prompt's npm update branch. Confirm the current job has ended and needs no recovery, then stop the old service, install and start. Preserve the data directory, port and MCP configuration. No uninstall is needed.
- Plugin: use the current client's plugin manager; see [Plugin updates](plugin-update.md) for Codex. Verify this separately from the application version.
- Standalone Skills: update both directories from the selected commit, preserve local customizations, and update their source records. Keep the working MCP configuration.
- The assistant executes the commands. On failure, diagnose and fix the path, arguments or environment, then retry and continue. Request needed permissions through the client. Independent HTTP version and existing MCP checks can continue while a CLI step is blocked. The user handles approvals, sign-in and required client restarts.

For `EPERM` or `EACCES`, request access to the path in the error and continue in a newly authorized command. An already-running background service can retain the restrictions it started with. If an in-app update cannot write its install directory, use the installation prompt's npm branch and restart the service from the authorized environment, preserving its data directory. CLI updates from 0.1.24 run the updater in the calling command's environment.

On macOS, 0.1.21 and earlier could write the runtime cache even for `--help` or `--version`; 0.1.22 removed those writes. A blocked CLI check does not invalidate a successful HTTP or MCP version check.

If the updater exits unexpectedly, read the saved phase and `update.log`. A download-stage exit does not require data restoration. An exit during stopping, backup, startup or restoration requires recovery before installing again. An empty log does not identify the cause of exit.

Report the application version, plugin version or standalone Skill source revision, and result of a real MCP call separately. If the client needs a restart or new conversation to load the plugin or Skills, complete that step before reporting them as loaded.
