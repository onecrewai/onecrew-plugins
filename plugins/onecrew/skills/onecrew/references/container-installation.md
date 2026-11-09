# Container installation

For an existing native Pro installation, complete the stop and backup steps in
[the migration case](native-to-container.md) before starting the container.

## Current preview

- Pro application: `0.1.30`; plugin: `0.1.24` from `codex/container-preview`.
- Image: `ghcr.io/onecrewai/onecrew-pro:0.1.30-container.1` (`linux/arm64`).
- Image digest: `sha256:8001036a86b35edae7fcfcda72ef1f2984fd00a245403a4d66c1b173dadb4a8c`.
- The image is public and can be pulled without GitHub credentials.
- This image targets macOS Apple Silicon.

## Configure and start

1. Locate the installed Docker-compatible CLI. Check `command -v docker` first.
   When it is absent from PATH, inspect the installed application and its CLI:

   | macOS installation | CLI paths to check |
   | --- | --- |
   | Kiri | `~/.kiri/bin/docker`, `/Applications/Kiri.app/Contents/Resources/bin/docker` |
   | Docker Desktop | `/Applications/Docker.app/Contents/Resources/bin/docker` |

   Use the executable found by its absolute path. For an application installed
   in another directory, check its actual installation directory. Run `context show`
   and `info` through that CLI and start its existing engine when stopped.
   Install and launch Kiri from its [official downloads](https://runkiri.com/releases)
   only when no container runtime is installed, then use its `kiri` Docker context.
   Use the same CLI and context for container operations and MCP.
2. [Prepare the image](container-image-pull.md) before stopping an existing Pro
   service. Complete the pull and confirm the image is present in the selected engine.
3. Use the existing Pro host data directory and port when migrating. For a new
   macOS installation, create `~/Library/Application Support/OneCrewConnect`
   and use port `8091`; choose an available port if another application owns it.
4. Replace `<IMAGE>` with `ghcr.io/onecrewai/onecrew-pro@` followed by the image
   digest above, `<DATA_DIR>` with the
   absolute host data path, `<UID>` and `<GID>` with `id -u` and `id -g`, and
   every `<PORT>` with the selected port. Run:

   ```sh
   docker run -d --pull=never --name onecrew-pro --restart unless-stopped \
     --user "<UID>:<GID>" --stop-timeout 20 \
     --publish "127.0.0.1:<PORT>:<PORT>" --env "PORT=<PORT>" \
     --mount "type=bind,source=<DATA_DIR>,target=/data" \
     --tmpfs "/run/onecrew:mode=0700,uid=<UID>,gid=<GID>" \
     "<IMAGE>"
   ```

   Docker stores these settings with the container. For an existing container
   using the target image, use `docker start onecrew-pro`. For another image,
   follow the update steps below.
5. Check container health and
   `http://127.0.0.1:<port>/api/v1/access/version`. Require application version
   `0.1.30` and `deployment: "container"`. A container ID alone does not establish
   readiness. On failure, read `docker logs onecrew-pro`, fix the reported error
   and retry.
6. Open the local panel, preserve an existing login or complete sign-in, and
   connect the AI client using one of the sections below.

Set proxy variables only for a proxy configured for this installation. A proxy
on the Mac's loopback address is reached from the container through
`host.docker.internal` at the same port.

## Plugin connection

For WorkBuddy desktop, follow [WorkBuddy setup](workbuddy-setup.md).

For Codex, run `codex plugin marketplace list --json`. If `onecrew` points to
another source or revision, run `codex plugin marketplace remove onecrew`.
Replace `<commit>` with the repository commit used to read these instructions, then run:

```sh
codex plugin marketplace add onecrewai/onecrew-plugins --ref "<commit>"
codex plugin add onecrew@onecrew
```

1. Install plugin `0.1.24` using the client's plugin manager and the same repository
   commit as these instructions.
2. Enable the plugin's OneCrew MCP server and both bundled Skills.
3. Restart the OneCrew MCP connection. In Codex, start a new conversation after
   changing the installed plugin.
4. Call `account` with `action: "version"`, then `action: "status"` through the
   plugin. Check the returned version, deployment and account state.

## Standard MCP clients without a plugin manager

1. Open the client's MCP settings or its documented MCP configuration file. Add
   one local **stdio** server named `onecrew`.
2. Set **command** to the selected Docker-compatible CLI's absolute path. Expand the
   home directory in the saved value; use a separate **args** array:

   ```json
   ["exec", "-i", "onecrew-pro", "node", "/app/dist/cli.js", "mcp"]
   ```

3. Save the server and enable it. Replace the old OneCrew entry when migrating;
   preserve the client's other MCP servers.
4. Choose a new absolute checkout directory. Replace `<source-dir>` below with
   that path, then download the preview source:

   ```sh
   git clone --branch codex/container-preview --single-branch https://github.com/onecrewai/onecrew-plugins.git "<source-dir>"
   git -C "<source-dir>" rev-parse HEAD
   ```

   Select the same commit as these instructions before copying the Skills:

   ```sh
   git -C "<source-dir>" fetch origin "<commit>"
   git -C "<source-dir>" switch --detach "<commit>"
   ```
5. For a client with local Skills support, open its Skills settings or documented
   Skills directory. Copy both complete directories there, including their
   `SKILL.md` files and every file under `references/`:

   - `plugins/onecrew/skills/onecrew`
   - `plugins/onecrew/skills/onecrew-web-research`

   Confirm that the destination contains `onecrew/SKILL.md`,
   `onecrew/references/container-installation.md` and
   `onecrew-web-research/SKILL.md`. Record the repository URL and resolved commit
   in each copied Skill's `SOURCE.md`.
   A client without Skills support uses the MCP tools directly.
6. Reload the client's MCP connection and Skills. Confirm that the client lists
   OneCrew's tools, then call `account` with `action: "version"` and
   `action: "status"`. The version result must contain `deployment: "container"`.

## Start, stop and update

Use `docker start onecrew-pro` and `docker stop onecrew-pro`. For a connection
failure, run `docker context show`, `docker info`,
`docker inspect onecrew-pro` and `docker logs onecrew-pro` against the selected
engine. Start the container before reconnecting MCP.

Run these steps only when the target image differs from the existing container's image:

1. Run `docker inspect onecrew-pro`. Read the host data path from `Mounts`,
   published ports from `NetworkSettings.Ports`, the user and environment from
   `Config`, and the network and restart policy from `HostConfig`.
2. [Prepare the target image](container-image-pull.md). After it is present, stop
   the container and back up the complete host data directory.
3. Remove only the stopped container with `docker rm onecrew-pro`.
4. Recreate it with `docker run -d --pull=never`, the target image and the settings read above.
   Mount `/run/onecrew` as tmpfs with mode `0700` and the configured user's UID/GID,
   as in the installation command.
5. Verify the HTTP version, existing account, tables and MCP calls. Keep the backup
   until these checks pass. Update the client plugin or copied Skills separately.
