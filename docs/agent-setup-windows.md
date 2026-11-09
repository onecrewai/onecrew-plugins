# Connect OneCrew Pro on Windows

1. Locate the installed OneCrew Pro desktop application. Check
   `%LOCALAPPDATA%\Programs\OneCrew Pro Preview` and
   `%LOCALAPPDATA%\Programs\onecrew-desktop`; an existing shortcut identifies a
   different installation directory. Open the app and wait for **Running**.
   Read its displayed data directory and panel address. If it is missing, give
   the user https://access.onecrewai.io/download/pro?platform=windows to install it.
2. Resolve the full paths under the installation directory:
   - Node: `resources\onecrew-runtime\bin\node.exe`
   - MCP entry: `resources\onecrew-runtime\dist\cli.js`
   Read `run\server.json` in the displayed data directory to obtain the current
   `url`; keep its control token private. Check `GET <url>/api/v1/access/version`.
3. Install or update this repository revision's plugin for the current client:
   - **WorkBuddy:** follow https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop-preview/plugins/onecrew/skills/onecrew/references/workbuddy-setup.md.
   - **Codex:** run `codex plugin marketplace list` and
     `codex plugin list --marketplace onecrew --json`. For a different source,
     remove only the `onecrew` marketplace. Run
     `codex plugin marketplace add onecrewai/onecrew-plugins --ref codex/desktop-preview`,
     then `codex plugin add onecrew@onecrew`. For an existing matching source,
     run `codex plugin marketplace upgrade onecrew` before adding the plugin.
     Verify version 0.1.25. For a different app or data location, set
     `ONECREW_DESKTOP_RUNTIME` and `ONECREW_DATA_DIR` in the client's plugin
     environment to the full paths from steps 1–2. System PATH changes are unnecessary.
   - **Standard MCP:** follow the numbered section below.
4. Reload OneCrew's connection and Skills. WorkBuddy requires fully quitting
   and reopening the client, then starting a new conversation. In Codex, start
   a new conversation and select OneCrew with `@`. Call `account` with
   `action: "version"` and `action: "status"`. Give the user the panel address and
   https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop-preview/plugins/onecrew/skills/onecrew/references/getting-started.md.

## Standard MCP

1. In the client's MCP settings, add a stdio server named `onecrew`. Set `command`
   to the full Node path from step 2. Set `args` to
   `["<full-cli.js-path>", "mcp", "--data-dir", "<full-data-directory>"]`.
   Replace the placeholders with the resolved paths and save valid JSON using
   a JSON serializer so backslashes are escaped correctly.
2. Clone https://github.com/onecrewai/onecrew-plugins.git at `codex/desktop-preview`
   into a full local directory. Record `git rev-parse HEAD` there.
3. Copy `plugins/onecrew/skills/onecrew` and
   `plugins/onecrew/skills/onecrew-web-research` from that checkout into the current
   client's documented Skills directory, including all references. Record the
   source commit in `SOURCE.md` beside the copied Skills.
4. Remove the old manual OneCrew MCP entry when replaced. Preserve other servers.
   Restart the connection, confirm both Skills are discoverable, and run the two
   account checks above.
