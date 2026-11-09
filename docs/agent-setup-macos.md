# Connect OneCrew Pro on macOS

1. Locate the installed `OneCrew Pro Preview.app` in `/Applications` or
   `$HOME/Applications`. Open it and wait for **Running**. Read the data directory
   and panel address displayed by the launcher. If the app is missing, give the
   user https://access.onecrewai.io/download/pro?platform=macos to install it.
2. Resolve these absolute paths inside that app:
   - Node: `Contents/Resources/onecrew-runtime/bin/node`
   - MCP entry: `Contents/Resources/onecrew-runtime/dist/cli.js`
   Read `run/server.json` in the displayed data directory to obtain the current
   `url`; keep its control token private. Check `GET <url>/api/v1/access/version`.
3. Install or update this repository revision's plugin for the current client:
   - **Codex:** run `codex plugin marketplace list` and
     `codex plugin list --marketplace onecrew --json`. For a different source,
     remove only the `onecrew` marketplace. Add
     `onecrewai/onecrew-plugins --ref codex/desktop-preview` with
     `codex plugin marketplace add`, then run `codex plugin add onecrew@onecrew`.
     For an existing matching source, run `codex plugin marketplace upgrade onecrew`
     before `codex plugin add onecrew@onecrew`. Verify version 0.1.25. The plugin
     finds the standard app location. For another location or data directory,
     set `ONECREW_DESKTOP_RUNTIME` and `ONECREW_DATA_DIR` in the client's plugin
     environment to the absolute paths from steps 1–2.
   - **WorkBuddy:** follow https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop-preview/plugins/onecrew/skills/onecrew/references/workbuddy-setup.md.
   - **Standard MCP:** follow the numbered section below.
4. Reload the client's OneCrew connection and Skills. In Codex, start a new
   conversation and select OneCrew with `@`. Call `account` with `action: "version"`
   and `action: "status"`. Give the user the panel address and the relevant steps
   from https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop-preview/plugins/onecrew/skills/onecrew/references/getting-started.md.

## Standard MCP

1. In the client's MCP settings, add a stdio server named `onecrew`. Set `command`
   to the absolute Node path from step 2. Set `args` to the array
   `["<absolute-cli.js>", "mcp", "--data-dir", "<absolute-data-directory>"]`,
   replacing the two placeholders with the resolved paths.
2. Clone https://github.com/onecrewai/onecrew-plugins.git at `codex/desktop-preview`
   into an absolute local directory. Record `git rev-parse HEAD` there.
3. Copy `plugins/onecrew/skills/onecrew` and
   `plugins/onecrew/skills/onecrew-web-research` from that checkout into the current
   client's documented Skills directory, including all references. Record the
   source commit in `SOURCE.md` beside the copied Skills.
4. Remove the old manual OneCrew MCP entry when replaced. Preserve other servers.
   Restart the MCP connection, confirm both Skills are discoverable, and run the
   two account checks above.
