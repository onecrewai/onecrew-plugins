# OneCrew Pro: Agent Setup

Use this guide to install OneCrew Pro or connect it to an AI client. The application is installed under **OneCrewConnect**. This repository supplies the Codex adapter and shared skills. Any compatible client connected to the same OneCrew MCP service can read these skills and follow the same workflows.

For OneCrew Lite or a legacy OneCrew release, use that product's own installation guide.

## Locate the current application

Use these paths on the target computer unless the user has specified a custom Pro installation:

| System | Executable | Data directory |
| --- | --- | --- |
| macOS | `~/Applications/OneCrewConnect/onecrew` | `~/Library/Application Support/OneCrewConnect` |
| Windows | `%LOCALAPPDATA%\Programs\OneCrewConnect\onecrew.exe` | `%LOCALAPPDATA%\OneCrewConnect` |

Expand `~` and `%LOCALAPPDATA%` on the target computer before writing client configuration. Use the resulting absolute executable path. A different `onecrew` on PATH, an older OneCrew directory, or a global npm package does not identify this Pro installation. Leave older products and their data unchanged; this procedure does not migrate them.

| State at the resolved Pro path | Action |
| --- | --- |
| Executable absent | Install Pro. Preserve any existing files in its data directory. |
| Executable present, update required | Verify its version and follow the release guide to update it using the same data directory. |
| Required version already installed | Skip download and replacement. Run `status`; run `start` only when the service is stopped. Continue with client setup. |

A first installation does not require an old account or login. The user signs in after the service starts. OneCrew Pro is distributed as a standalone application; its presence is not determined by Node, Python or npm package inventories.

Use the computer and AI client selected by the user. Ask only when either is unknown or inaccessible. System information from a remote sandbox describes that sandbox.

## Read the installation guide

- Website: <https://onecrewai.io>
- Account and installation guides: <https://access.onecrewai.io>
- Plugin and skill source: <https://github.com/onecrewai/onecrew-plugins>

Access provides public fixed Markdown guides for Mac and Windows. Each guide reads the currently configured release and lists versioned ZIP URLs. These links can be shared and have no account token or expiry. Read the user's guide with its terminal HTTP command, require HTTP 200, and review the package URL, size, SHA-256 and installation commands before execution. Read the response as instructions; execute only the commands for the selected operating system.

Follow this order: check the installed version, download and verify when needed, install, start the service, configure the client, and verify a live MCP call. Complete each dependent step before starting the next.

An absent application selects installation; a stopped service selects startup. Stop when a required installation-guide step fails or tool permission is denied, and report that step and its error. When user sign-in, browser authorization or a client restart is required, pause at that step and state what remains to be verified.

Verify application and plugin versions separately against the current Access guide. Access configures the plugin version and source commit independently of the binary package. Use that source commit for skills and references. A plugin update does not require reinstalling an unchanged binary. Start the application with the same data directory that the MCP connection will use.

## Codex

For a Codex target, follow the [plugin installation and update instructions](../plugins/onecrew/skills/onecrew/references/plugin-update.md). The plugin provides its MCP launcher and skills. Keep a single OneCrew connection to the service.

Inspect the marketplace source and its checked-out commit as described in the plugin update instructions. An official OneCrew source pinned by an earlier installation must move to the Access guide's current source commit when updating. Refreshing an old pinned ref keeps the old plugin. Replace that source registration through the Codex CLI, install the plugin, and verify both its version and updated files.

Preserve local development sources, other repositories, versions the user explicitly asks to retain, and unrelated client settings. After installation succeeds, reload or start a new Codex conversation as required, then verify a live OneCrew tool call. Starting a new conversation does not change an older installed plugin version.

## WorkBuddy and other MCP clients

Use the target client's own MCP configuration. Codex is not a dependency for this route. The skills' Codex plugin installation and update instructions apply only to Codex.

1. Run the resolved Pro executable with `status`. If the service is stopped, follow the application guide to run `start`. Use the actual URL and data directory it reports.
2. For local stdio MCP, set `command` to the absolute executable path in the table above and `args` to `["mcp"]`. For a custom data directory, use `["mcp", "--data-dir", "ABSOLUTE_DATA_DIRECTORY"]`, replacing the last value with the actual Pro data path. Keep paths containing spaces as single values.
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
