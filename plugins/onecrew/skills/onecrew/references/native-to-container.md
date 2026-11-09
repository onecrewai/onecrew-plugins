# Case: migrate native Pro to a container

Use this case only for an existing native Pro installation. Normal container
setup is described in [Container installation](container-installation.md).

## Locate the old installation

Read the current MCP command, arguments and environment for its executable and
data directory. An npm-managed setup may also record the profile in
`OneCrewPro/setup.json`. Use that installation's Node/npm environment when locating
the package. `--print-binary-path` belongs to the npm entry, not the native binary.
Use the configured executable by its absolute path; system PATH changes are unnecessary.

After a native self-update, `OneCrewPro/current-<target>.json` identifies the active
version under `versions/<target>/<version>/onecrew` or `onecrew.exe`. Package and
running application versions may differ. Read the running version through MCP
`account version` or the local `/api/v1/access/version` endpoint.

## Switch once

1. Disable the old OneCrew MCP connection. Stop the native service using its
   configured absolute executable and data directory; confirm it has exited.
2. Back up the complete data directory, including account keys and attachments.
3. Follow normal container setup with the existing host directory. Verify the
   HTTP version, existing login, saved data and the plugin's new container MCP connection.
4. Uninstall the old npm package from its owning Node/npm environment, then remove
   old application startup entries and binaries. Keep data and its backup.

The old installation is used only for this stop and uninstall. Native Pro and the
container must not run on the same data directory together. Saved account proxies
that use host loopback need an address reachable from the container.

Update the existing plugin to the container-capable release and reload its MCP
server after Pro is ready. If the old installation used a separate manual MCP
entry, remove that obsolete entry after verifying the plugin connection. Preserve
unrelated plugins and MCP settings.
