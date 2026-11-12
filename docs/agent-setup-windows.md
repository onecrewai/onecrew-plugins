# Connect OneCrew Pro on Windows

1. Install or update this repository revision's plugin for the current client:
   - **WorkBuddy:** follow https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop/plugins/onecrew/skills/onecrew/references/workbuddy-setup.md.
   - **Codex:** run `codex plugin marketplace list` and
     `codex plugin list --marketplace onecrew --json`. For a different source,
     remove only the `onecrew` marketplace. Run
     `codex plugin marketplace add onecrewai/onecrew-plugins --ref codex/desktop`,
     then `codex plugin add onecrew@onecrew`. For an existing matching source,
     run `codex plugin marketplace upgrade onecrew` before adding the plugin.
     Verify version 0.1.27.
   - **Standard MCP:** follow the numbered section below.
2. Reload OneCrew's connection and Skills. WorkBuddy requires fully quitting
   and reopening the client, then starting a new conversation. In Codex, start
   a new conversation and select OneCrew with `@`. Call `account` with
   `action: "version"` and `action: "status"`. Give the user the panel address and
   https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop/plugins/onecrew/skills/onecrew/references/getting-started.md.

## Standard MCP

1. Locate the installed OneCrew Pro application in
   `%LOCALAPPDATA%\Programs\OneCrew Pro` or `%LOCALAPPDATA%\Programs\onecrew-desktop`.
   Resolve `resources\onecrew-runtime\bin\node.exe` and
   `resources\onecrew-runtime\dist\cli.js` under that directory. Use Pro's existing
   data directory; the default is `%LOCALAPPDATA%\OneCrewConnect`.
2. In the client's MCP settings, add a stdio server named `onecrew`. Set `command`
   to the full Node path from step 1. Set `args` to
   `["<full-cli.js-path>", "mcp", "--data-dir", "<full-data-directory>"]`.
   Replace the placeholders with the resolved paths and save valid JSON using
   a JSON serializer so backslashes are escaped correctly.
3. Clone https://github.com/onecrewai/onecrew-plugins.git at `codex/desktop`
   into a full local directory. Record `git rev-parse HEAD` there.
4. Copy `plugins/onecrew/skills/onecrew` and
   `plugins/onecrew/skills/onecrew-web-research` from that checkout into the current
   client's documented Skills directory, including all references. Record the
   source commit in `SOURCE.md` beside the copied Skills.
5. Remove the old manual OneCrew MCP entry when replaced. Preserve other servers.
   Restart the connection, confirm both Skills are discoverable, and run the two
   account checks above.
