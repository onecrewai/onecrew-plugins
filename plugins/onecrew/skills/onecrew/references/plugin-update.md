# Update the OneCrew Codex plugin

Use this workflow when the user asks to install, update or reinstall the OneCrew plugin in Codex.

Read the current Access guide for the target computer and its existing Pro installation method. Use the complete URL from the user's prompt when one is supplied.

On Windows, run installation and update commands in a local Codex project conversation. If the current conversation has no project, guide the user to create or open a local project and start a new conversation there with the Access guide. For an `EPERM` or `EACCES` failure from an ordinary conversation, preserve the failed command and path and resume in that project conversation. If the operation remains blocked, use Codex's supported approval flow for the required paths; creating a project does not grant system permissions. See [Windows sandbox permissions](https://learn.chatgpt.com/docs/windows/windows-sandbox).

| System | ZIP | npm |
| --- | --- | --- |
| macOS | [Access guide](https://access.onecrewai.io/cli/install/pro) | [Access guide](https://access.onecrewai.io/cli/install/pro/npm) |
| Windows x64 | [Access guide](https://access.onecrewai.io/cli/install/pro/windows) | [Access guide](https://access.onecrewai.io/cli/install/pro/npm/windows) |

Follow the guide's Codex plugin section. It specifies the published plugin version, source commit, marketplace commands and verification. The plugin and application have independent versions; a plugin-only request keeps the application binary, data directory and login unchanged.

After a new installation or update, start a new Codex conversation to load the plugin and verify one read-only OneCrew `account` status call there. Report any remaining new-conversation check separately from file installation.
