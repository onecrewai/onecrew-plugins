# Case: migrate native Pro to a container

Use this case only for an existing native Pro installation. Normal container
setup is described in [Container installation](container-installation.md).

## Locate the old installation

Read the current MCP command, arguments and environment for its executable and
data directory. For a `setup` installation, read `OneCrewPro/setup.json` for the
profile and `OneCrewPro/node-path` for Node. For a global npm installation, run
`npm prefix --global` using the Node/npm installation that owns the package.
Run `--print-binary-path` through the npm entry to resolve the native executable.
Use the configured executable by its absolute path; system PATH changes are unnecessary.

After a native self-update, `OneCrewPro/current-<target>.json` identifies the active
version under `versions/<target>/<version>/onecrew` or `onecrew.exe`. Read the npm
package version from its `package.json`. Read the running application version
through MCP `account version` or the local `/api/v1/access/version` endpoint.

## Switch once

1. Record the running version, data directory, port, account and table IDs.
   Locate the container runtime and [prepare the target image](container-image-pull.md)
   while the native service remains running. Continue after the image is present
   in that engine.
2. Disable the old OneCrew MCP connection. Stop the native service using its
   absolute executable and data directory; confirm it has exited and the port is free.
   Back up the complete data directory, including account keys and attachments.
3. Create the container with the downloaded image, `--pull=never` and the existing
   host directory, using the startup command in the installation guide you are
   following. Check the HTTP version.
4. Follow the container guide's client connection steps to install the selected
   plugin or standard MCP connection and Skills. Verify the application version,
   original account and table IDs through the new connection.
5. Uninstall the old npm package from its owning Node/npm environment. Remove old
   application startup entries, binaries and manual OneCrew MCP entries replaced
   by the plugin. Keep the data, its backup, the new container and unrelated client settings.

The old installation is used only for this stop and uninstall. Native Pro and the
container must not run on the same data directory together. Saved account proxies
that use host loopback need an address reachable from the container.
