# Windows container installation

Use this guide on Windows x64 with a Linux container engine.

- Pro: `0.1.30`; plugin: `0.1.24` from `codex/container-preview`.
- Public image: `ghcr.io/onecrewai/onecrew-pro:0.1.30` (`linux/amd64`).
- Install the plugin and Skills from the same repository commit as this guide.

## Prepare the engine and image

1. Find the installed Docker-compatible CLI with `where.exe docker`. If it is
   absent from PATH, check the installed application's directory:

   | Application | CLI path |
   | --- | --- |
   | Kiri | `%LOCALAPPDATA%\Kiri\bin\docker.exe` |
   | Docker Desktop | `%ProgramFiles%\Docker\Docker\resources\bin\docker.exe` |
   | Docker Desktop, per-user install | `%LOCALAPPDATA%\Programs\DockerDesktop\resources\bin\docker.exe` |

   Use the installed Docker or Kiri and its CLI's absolute path.
2. If neither engine is installed, read the official
   [Windows x64 release JSON](https://download.runkiri.com/latest-windows-x86_64.json).
   Parse `version` and `url` with PowerShell `ConvertFrom-Json`. Create the output
   directory, then download the returned `url` with
   `curl.exe --fail --location --output "<absolute-msi-path>" "<url>"`.
   After a successful download, open its folder and tell the user to double-click
   the MSI to install Kiri.
3. Open the selected application. For Kiri, follow its setup steps. If it reports
   that Windows WSL components must be enabled, follow
   [Enable WSL components](windows-wsl-setup.md) to deliver the `.cmd` file.
   Do not add WSL, registry or virtualization preflight checks.
   After setup, select the application's Docker context (`kiri` for Kiri),
   then run `context show` and `info`. Continue when `info` returns a Linux
   server. Use that CLI and context for container operations and MCP.
4. Use the public image reference above. Run `pull <IMAGE>`,
   then `image inspect <IMAGE> --format "{{.Os}} {{.Architecture}}"` through the
   selected CLI. Require `linux amd64` before stopping an existing Pro service.
5. For native Pro, follow [the migration case](native-to-container.md) to locate
   its data directory and port, stop it and back up the data. For a new
   installation, create `%LOCALAPPDATA%\OneCrewConnect` and use port `8091`.
   Expand the data path to an absolute Windows path.

## Start Pro

The assistant runs this command through PowerShell or a process tool. Replace
`<DOCKER_CLI>`, `<IMAGE>`, `<DATA_DIR>` and `<PORT>` with the values above.

```powershell
$dockerArgs = @(
  'run', '-d', '--pull=never', '--name', 'onecrew-pro',
  '--restart', 'unless-stopped', '--user', '0:0', '--stop-timeout', '20',
  '--publish', '127.0.0.1:<PORT>:<PORT>', '--env', 'PORT=<PORT>',
  '--mount', 'type=bind,source=<DATA_DIR>,target=/data',
  '--tmpfs', '/run/onecrew:mode=0700,uid=0,gid=0', '<IMAGE>'
)
& '<DOCKER_CLI>' @dockerArgs
```

Pass each array element as one argument. PowerShell preserves `/data` and
`/run/onecrew`; Git Bash can convert them into Windows paths.
The container user is `0:0` so Pro can initialize the Windows-mounted data
directory; the Docker CLI runs under the current Windows account.

For an existing container with the target image, run `start onecrew-pro`.
For an image update, follow [Start, stop and update](container-installation.md#start-stop-and-update).

1. Check `inspect onecrew-pro --format "{{.State.Health.Status}}"` and
   `http://127.0.0.1:<PORT>/api/v1/access/version`. Require a healthy container,
   version `0.1.30` and `deployment: "container"`. While health is `starting`,
   wait for the next check; HTTP can become available first. For `unhealthy` or
   an exited container, read `logs onecrew-pro` and the health-check output,
   correct the reported error and retry.
2. Open the local panel. Preserve the existing account or complete sign-in.
3. For WorkBuddy, follow [WorkBuddy setup](workbuddy-setup.md). Other clients use
   the [plugin](container-installation.md#plugin-connection) or
   [standard MCP](container-installation.md#standard-mcp-clients-without-a-plugin-manager)
   steps. Verify `account` with `action: "version"` and `action: "status"` in
   the configured client after its required restart.
