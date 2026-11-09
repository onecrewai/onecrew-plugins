# Update OneCrew instructions

Use the source revision and version selected by the release instructions or the
user. Application image updates and instruction updates are independent.

For an installed plugin bundle, use the current client's plugin manager. Verify
the installed version and files after updating. A plugin-only update does not
install or update the Pro application.

If the application is still native, use [the migration case](native-to-container.md).
The plugin supplies its own container MCP server; keep it as the active OneCrew
connection. Do not replace it with a second manual server or a cached-manifest edit.

For standalone Skills, update both complete directories and their references,
preserve local customizations, and record the source commit.

Restart the client's OneCrew MCP connection and reload its Skills. In Codex, open
a new conversation after changing the plugin. Call `account` with `action:
"version"` and `action: "status"` through the client. Report the values returned.
