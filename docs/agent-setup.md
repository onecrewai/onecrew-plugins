# OneCrew Pro: Agent Setup

Use this guide to install OneCrew Pro or connect it to an AI client. Pro supports ZIP and npm installation. Follow the operating system and installation method selected in the user's prompt. Both methods use the same **OneCrewConnect** data directory. This repository supplies the Codex adapter and shared skills. Any compatible client connected to the same OneCrew MCP service can read these skills and follow the same workflows.

For OneCrew Lite or a legacy OneCrew release, use that product's own installation guide.

## Locate the current application

For npm, locate **onecrew-pro** with `command -v onecrew-pro` on Mac or `Get-Command onecrew-pro.cmd` in PowerShell. `onecrew-pro --print-binary-path` returns its native executable. For ZIP, use the paths below. Check any explicit `ONECREW_BINARY` setting against the selected installation.

| System | Executable | Data directory |
| --- | --- | --- |
| macOS | `~/Applications/OneCrewConnect/onecrew` | `~/Library/Application Support/OneCrewConnect` |
| Windows | `%LOCALAPPDATA%\Programs\OneCrewConnect\onecrew.exe` | `%LOCALAPPDATA%\OneCrewConnect` |

Expand `~` and `%LOCALAPPDATA%` on the target computer before writing client configuration. Use the actual absolute executable path. The npm command is `onecrew-pro`; the older Rust CLI's `onecrew` command is a separate product. Keep the same OneCrewConnect data directory when moving a Pro ZIP installation to npm.

| State at the resolved Pro path | Action |
| --- | --- |
| Executable absent | Install Pro. Preserve any existing files in its data directory. |
| Executable present, update required | Verify its version and follow the release guide to update it using the same data directory. |
| Required version already installed | Skip download and replacement. Run `status`; run `start` only when the service is stopped. Continue with client setup. |

A first installation does not require an old account or login. The user signs in after the service starts. Node.js and npm are needed for the npm installation and command. Each platform package includes the compiled application and its runtime.

Use the computer and AI client selected by the user. Ask only when either is unknown or inaccessible. System information from a remote sandbox describes that sandbox.

## Read the installation guide

- Website: <https://onecrewai.io>
- Account and installation guides: <https://access.onecrewai.io>
- Plugin and skill source: <https://github.com/onecrewai/onecrew-plugins>

Access provides a fixed Markdown guide for each operating system and installation method. Read the URL in the user's prompt with its terminal HTTP command and require HTTP 200. Keep the selected method. Each guide names the current binary and plugin releases.

| Method | Install and update |
| --- | --- |
| ZIP | Download the matching platform archive, verify size and SHA-256, extract, stop the service, and replace files at the ZIP path. The archive includes its runtime. |
| npm | Check Node.js and npm, stop the service, then install the guide's exact `@onecrew/pro` version. Keep optional dependencies enabled. npm selects the matching platform package and verifies integrity. |

Before requests, inspect process proxy variables and the user's system proxy settings without printing credentials. Use the actual enabled proxy address and port, respecting bypass/PAC decisions. With TUN alone, retain the existing route. Preserve proxy rules, mode and node selection. Use `curl` on Mac and `Invoke-WebRequest` on Windows for guides. For a DNS, connection or TLS-handshake failure, retry once with `curl -4`; on Windows, first check `Get-Command curl.exe`, then use `curl.exe -4` with the same resolved proxy settings. Keep certificate verification enabled and redirects disabled. Preserve explicit [npm proxy settings](https://docs.npmjs.com/cli/using-npm/config/#https-proxy). When npm has none, carry the system proxy's actual URL into `npm_config_https_proxy` and `npm_config_proxy` for this installation, retaining `NO_PROXY`. With TUN alone, keep the existing route. Report npm errors directly.

After installation, start the service with the existing data directory, verify its actual version, configure the client, and verify a live MCP call. When the selected installation already has the required version, keep its files and start only if needed. Complete each dependent step before starting the next.

An absent application selects installation; a stopped service selects startup. After the permitted connection retry, stop on any remaining failure and report the step and error. When user sign-in, browser authorization or a client restart is required, pause at that step and state what remains to be verified.

Verify application and plugin versions separately against the current Access guide. Access configures the plugin version and source commit independently of the binary package. Use that source commit for skills and references. A plugin update does not require reinstalling an unchanged binary. Start the application with the same data directory that the MCP connection will use.

## Codex

For a Codex target, follow the [plugin installation and update instructions](../plugins/onecrew/skills/onecrew/references/plugin-update.md). The plugin provides its MCP launcher and skills. Keep a single OneCrew connection to the service.

Set `ONECREW_BINARY` in the client's environment to the selected installation's absolute native path. Use the ZIP path or the result of `onecrew-pro --print-binary-path` for npm. Update that setting when the user changes installation methods. The launcher also discovers `onecrew-pro` on PATH or the standard ZIP path when no explicit path is configured. A selected program that fails must be reported before switching installations.

Select the Access guide's source commit through the Codex CLI, following the plugin update instructions. Install the plugin and verify its version and updated files.

After installation succeeds, reload or start a new Codex conversation as required, then verify a live OneCrew tool call.

## WorkBuddy and other MCP clients

Use the target client's own MCP configuration. Codex is not a dependency for this route. The skills' Codex plugin installation and update instructions apply only to Codex.

1. Run the resolved Pro executable with `status`. If the service is stopped, follow the application guide to run `start`. Use the actual URL and data directory it reports.
2. For local stdio MCP, set `command` to the absolute native path returned by `onecrew-pro --print-binary-path` and `args` to `["mcp"]`. For a ZIP installation, use its installed binary. For a custom data directory, use `["mcp", "--data-dir", "ABSOLUTE_DATA_DIRECTORY"]`, replacing the last value with the actual Pro data path. Keep paths containing spaces as single values.
3. Let the client start and manage the stdio bridge. `start` runs the independent application service; `mcp` connects to it and does not install skills, perform login or start the service.
4. A client supporting Streamable HTTP can instead connect to the actual service URL plus `/mcp`. Choose one transport per client. A saved HTTP URL must be updated if the service port changes.
5. Reload the client's tools and make a real OneCrew `account` status call using the current tool schema. Let the user complete the returned authorization flow if login is required.

WorkBuddy provides a custom connector entry for MCP: [connector documentation](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Connector). Use the fields supported by the installed client. A cloud-only client needs a supported connection to the target computer.

## Follow the existing skills

Read the relevant entry and the references needed for the user's task:

| Task | Skill |
| --- | --- |
| Creators, platform connections, tables, leads and email | [onecrew/SKILL.md](../plugins/onecrew/skills/onecrew/SKILL.md) |
| Web search or extraction explicitly requested through OneCrew | [onecrew-web-research/SKILL.md](../plugins/onecrew/skills/onecrew-web-research/SKILL.md) |

An agent can read these files directly and apply their workflows to connected MCP tools in the current task. Resolve relative links from each skill's directory and keep its complete `references/` folder available. Use the live MCP tool names, schemas and results; verify version compatibility when they differ from a reference.

For automatic discovery in later conversations, import the complete skill directory through the target client's supported skill installation mechanism. WorkBuddy supports **Add Skill → Upload Skill**: [skill documentation](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market). A working MCP connection does not itself install or load skills.

## Verify completion

Report each result separately:

- **Application:** absolute executable path, `--version` output and running service status.
- **MCP:** target client, transport and one real `account` status result. Distinguish required login from a connection failure.
- **Skills:** entries and source commit read for this task. For client-managed installation, confirm the skills are recognized and enabled.

Use read-only checks for setup. Creator searches, table changes and email sending require the user's corresponding task.
