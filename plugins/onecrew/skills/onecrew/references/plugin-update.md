# Update the OneCrew plugin and Skills

1. Use the repository revision selected by the update prompt. Read its macOS
   or Windows connection guide under `docs` in that same checkout.
2. Use the current client's plugin manager to update the OneCrew bundle. Verify
   its installed `plugin.json` version. Preserve the desktop data directory.
3. For standard MCP clients, update both complete Skill directories and their
   references. Record the source commit. Keep the MCP command pointed at the
   desktop application's bundled Node and CLI entry.
4. Reload OneCrew in the client. WorkBuddy requires a full quit and restart;
   Codex requires a new conversation. Verify `account` actions `version` and
   `status` through the client.

Update the desktop application through its launcher.
