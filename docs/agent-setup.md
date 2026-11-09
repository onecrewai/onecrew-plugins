# OneCrew setup

Use the AI client's terminal, file and HTTP tools for installation. Fetch these
documents with its HTTP tool or `curl`; use an existing working directory for
commands. Use OneCrew MCP for application status and data checks.

Use the application and image listed in the container guide. Install the plugin
and Skills from the same repository commit as this guide: take the commit from
its URL, or run `git rev-parse HEAD` in the checkout used to read it.

1. Read [Container installation](../plugins/onecrew/skills/onecrew/references/container-installation.md)
   to locate the container runtime and configure Pro.
2. For an existing native installation, complete the stop and backup steps in
   [Native-to-container](../plugins/onecrew/skills/onecrew/references/native-to-container.md)
   before starting the container. Use [Installation and versions](../plugins/onecrew/skills/onecrew/references/installation-and-versions.md)
   to locate an existing installation or check its versions.
3. Follow the container guide's connection steps for the current AI client.
   WorkBuddy desktop uses [WorkBuddy setup](../plugins/onecrew/skills/onecrew/references/workbuddy-setup.md).
   Clients without plugin support use its standard MCP and shared Skills section.

Run the installation and checks. Fix path, argument or environment errors and
continue. Use the client's permission flow for access errors, then resume the
affected step. Continue independent checks. Report the application version,
plugin or Skill revision, panel address and MCP results.

Preserve existing data, sign-in and unrelated client settings.
