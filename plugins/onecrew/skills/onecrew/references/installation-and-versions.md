# Installation paths and versions

For normal setup, read [Container installation](container-installation.md).
For an existing native installation, read [the migration case](native-to-container.md).

## Locate the active installation

Read the installed plugin's MCP declaration and resolved options to identify the
container runtime and container name. Read the saved Compose configuration or
inspect that container to identify the host data mount and published local port.
The executable path should be absolute; changing system PATH is unnecessary.

The data directory is on the host. `/data` is its container mount, and
`/run/onecrew/server.json` is the container's runtime descriptor. That descriptor
contains a private control token and should not be printed.

## Check versions separately

| Component | Read from | Meaning |
| --- | --- | --- |
| Running application | MCP `account version`, or local `GET /api/v1/access/version` | Application serving requests; container mode reports `deployment: "container"` |
| Image | Saved Compose image reference and runtime image ID/digest | The packaged runtime used by the container |
| Installed plugin | Client installation record and that installation's `plugin.json` | Plugin bundle revision, independent of the application |
| Standalone Skills | Source commit or local `SOURCE.md` | Revision of copied instructions; no separate plugin version |

Application and plugin versions may differ. Use the running application's version
and the actual installed Skill source; a GitHub checkout or another cache folder
does not establish what the client loaded.

## Skills and plugin records

For Codex, `codex plugin list --marketplace onecrew --json` lists installed plugin
records. For WorkBuddy, inspect `plugins/installed_plugins.json` in the active
client directory and follow the matching installation path to its manifest.

For standalone Skills, install both complete directories at the selected source
revision:

```text
plugins/onecrew/skills/onecrew/
plugins/onecrew/skills/onecrew-web-research/
```

Preserve references and local customizations. Record the repository, commit and
source subdirectory using the client's installation record or `SOURCE.md`.
Verify both Skills are discoverable. Report MCP connectivity and Skill loading
separately; a successful script call does not prove that an existing conversation
has reloaded the connection.

## Updates

Use the container runtime to update the application image and retain its data
mount. For the plugin, follow [Plugin updates](plugin-update.md). Update both
Skill directories when they were installed separately. Verify the application version,
instruction revision and a read-only MCP call separately.
