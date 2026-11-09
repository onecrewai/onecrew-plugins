# Install or update OneCrew Pro on macOS

Read these documents with the client's HTTP tool or `curl`. Download installer
files through the Mac host terminal with `curl`, using an absolute output path
in a directory created beforehand. Keep installer downloads out of webpage
extraction and computer-use tools.
Use OneCrew MCP for application status and data checks.

1. Follow [macOS container installation](../plugins/onecrew/skills/onecrew/references/container-installation.md)
   to prepare the engine and image.
2. For an existing native installation, follow [Native-to-container](../plugins/onecrew/skills/onecrew/references/native-to-container.md).
   Prepare the image before stopping the old service. Retain its data directory,
   port and sign-in. Start the container after the stop and backup steps. For a
   new installation or an existing container, use the macOS guide's start or update steps.
3. Install the plugin or shared Skills from the same repository commit as this
   document. Read the commit from this document's URL or the checkout's
   `git rev-parse HEAD`. Use the container guide's Codex or standard MCP steps;
   WorkBuddy uses [WorkBuddy setup](../plugins/onecrew/skills/onecrew/references/workbuddy-setup.md).
4. Check the HTTP version. Complete the client's restart and MCP checks from
   its setup guide, then follow [Getting started](../plugins/onecrew/skills/onecrew/references/getting-started.md)
   to guide the user through sign-in, account connections and their first request.

Fix path, argument or environment errors and continue. Use the client's
authorization flow for access errors, then resume that step. Preserve unrelated
client settings. Report the application version, plugin or Skill revision,
panel address and MCP results.
