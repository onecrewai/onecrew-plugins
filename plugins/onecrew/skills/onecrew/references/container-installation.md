# Container installation

Use the image and Compose configuration supplied for the release. If native Pro
is already installed, use [the migration case](native-to-container.md).

## Configure and start

1. Choose a host data directory and create it with write access for its owner.
   Mount it at `/data`; configure the container user, matching host/container
   port and any required proxy in Compose. Publish the port on host loopback only.
2. Start the saved Compose application and wait for readiness. Verify
   `/api/v1/access/version`, open the local panel and complete sign-in when needed.
3. Install or enable the container-capable OneCrew plugin after Pro is ready.
   Use its bundled MCP server and Skills. Verify `account version` and `account
   status` through that server.

## Plugin connection

The plugin starts the following MCP process inside the running container:

```text
exec -i onecrew-pro node /app/dist/cli.js mcp
```

Codex's plugin entry locates the standard Kiri executable. Optional
`ONECREW_CONTAINER_RUNTIME` and `ONECREW_CONTAINER_NAME` environment values select
another absolute executable or container name. The default container is
`onecrew-pro`. WorkBuddy uses the plugin options `runtime_path` and `container_name`.
Node runs inside the image. The plugin does not install or start Pro.

Clients without plugin support can configure the same stdio command directly and
install both complete Skill directories from the selected revision:
`plugins/onecrew/skills/onecrew` and `plugins/onecrew/skills/onecrew-web-research`.
Include references and record the source commit. Keep one active OneCrew connection.

## Operation

`account version` reports `deployment: "container"`. Start and stop the configured
container through its runtime. Running an image alone does not supply the data
mount, user, port or proxy.

If MCP cannot connect, check the runtime and container, then reconnect MCP.
Update Pro by replacing its image with the host data mount intact. Back up data
before an update that can change the database. Plugin and Skill versions remain
independent of the application image.
