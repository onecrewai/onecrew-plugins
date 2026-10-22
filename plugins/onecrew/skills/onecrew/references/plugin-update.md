# Update the OneCrew Codex plugin

Use this workflow when the user asks to install, update or reinstall the OneCrew plugin in Codex.

Read the current Access guide for the target computer and its existing Pro installation method. Use the complete URL from the user's prompt when one is supplied.

| System | ZIP | npm |
| --- | --- | --- |
| macOS | [Access guide](https://access.onecrewai.io/cli/install/pro) | [Access guide](https://access.onecrewai.io/cli/install/pro/npm) |
| Windows x64 | [Access guide](https://access.onecrewai.io/cli/install/pro/windows) | [Access guide](https://access.onecrewai.io/cli/install/pro/npm/windows) |

Follow the guide's Codex plugin section. It specifies the published plugin version, source commit, marketplace commands and verification. The plugin and application have independent versions; a plugin-only request keeps the application binary, data directory and login unchanged.

After a new installation or update, start a new Codex conversation to load the plugin and verify one read-only OneCrew `account` status call there. Report any remaining new-conversation check separately from file installation.
