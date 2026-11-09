# Prepare the application image

`<DOCKER_CLI>` is the selected CLI's absolute path. `<IMAGE>` is the public image
reference in [Container installation](container-installation.md).

Keep the existing Pro service running while preparing the image.

1. Run `"<DOCKER_CLI>" pull "<IMAGE>"` and check its exit code. Correct the reported
   error and retry until this command succeeds.
2. Run `"<DOCKER_CLI>" image inspect "<IMAGE>" --format '{{.Os}} {{.Architecture}}'`.
   Require `linux arm64` on Apple Silicon or `linux amd64` on Intel Mac and
   Windows x64. Then continue with migration or startup using `--pull=never`.

## Missing Docker credential helper

Use this case when Docker reports that `docker-credential-desktop` is missing.
The public OneCrew image supports anonymous pulls.

1. With the original Docker configuration, run `context show`, then read that
   context's engine endpoint:

   ```sh
   "<DOCKER_CLI>" context inspect "<CONTEXT>" --format '{{.Endpoints.docker.Host}}'
   ```

2. Create a temporary directory inside the workspace with `config.json` containing `{}`.
3. Replace the placeholders with the executable, directory, endpoint and image
   determined above. On macOS, run:

   ```sh
   env -u DOCKER_CONTEXT "<DOCKER_CLI>" \
     --config "<PULL_CONFIG_DIR>" --host "<ENGINE_ENDPOINT>" \
     pull "<IMAGE>"
   ```

4. After the pull succeeds, use the original Docker configuration for `image inspect`,
   container creation and MCP. Remove the temporary pull directory.
