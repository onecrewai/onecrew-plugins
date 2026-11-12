# Connect OneCrew Pro on macOS

1. Install or update this repository revision's plugin for the current client:
   - **Codex:** run `codex plugin marketplace list` and
     `codex plugin list --marketplace onecrew --json`. For a different source,
     remove only the `onecrew` marketplace. Add
     `onecrewai/onecrew-plugins --ref codex/desktop` with
     `codex plugin marketplace add`, then run `codex plugin add onecrew@onecrew`.
     For an existing matching source, run `codex plugin marketplace upgrade onecrew`
     before `codex plugin add onecrew@onecrew`. Verify version 0.1.27.
   - **WorkBuddy:** follow https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop/plugins/onecrew/skills/onecrew/references/workbuddy-setup.md.
   - **Standard MCP:** follow the numbered section below.
2. Reload the client's OneCrew connection and Skills. In Codex, start a new
   conversation and select OneCrew with `@`. Call `account` with `action: "version"`
   and `action: "status"`. Give the user the panel address and the relevant steps
   from https://raw.githubusercontent.com/onecrewai/onecrew-plugins/codex/desktop/plugins/onecrew/skills/onecrew/references/getting-started.md.

## Standard MCP

1. Locate the installed `OneCrew Pro.app`. Resolve its bundled Node at
   `Contents/Resources/onecrew-runtime/bin/node` and CLI at
   `Contents/Resources/onecrew-runtime/dist/cli.js`. Use Pro's existing data
   directory; the default is `$HOME/Library/Application Support/OneCrewConnect`.
2. In the client's MCP settings, add a stdio server named `onecrew`. Set `command`
   to the absolute Node path from step 1. Set `args` to the array
   `["<absolute-cli.js>", "mcp", "--data-dir", "<absolute-data-directory>"]`,
   replacing the two placeholders with the resolved paths.
3. Clone https://github.com/onecrewai/onecrew-plugins.git at `codex/desktop`
   into an absolute local directory. Record `git rev-parse HEAD` there.
4. Copy `plugins/onecrew/skills/onecrew` and
   `plugins/onecrew/skills/onecrew-web-research` from that checkout into the current
   client's documented Skills directory, including all references. Record the
   source commit in `SOURCE.md` beside the copied Skills.
5. Remove the old manual OneCrew MCP entry when replaced. Preserve other servers.
   Restart the MCP connection, confirm both Skills are discoverable, and run the
   two account checks above.
