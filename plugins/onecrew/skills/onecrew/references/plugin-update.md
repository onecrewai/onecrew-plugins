# Update the OneCrew Codex plugin

Run these steps on the computer where the Codex plugin is installed, when the user asks to install or update it. Read the current Access installation guide and take the target plugin version and source commit from it. The binary and plugin have separate versions.

1. Locate `codex` with `command -v codex` (macOS/Linux) or `Get-Command codex` (PowerShell). If it is not on PATH, locate the installed desktop app's bundled CLI and use its actual executable path. Check `codex plugin marketplace --help` and `codex plugin add --help`.

2. Inspect the current installation:

   ```sh
   codex plugin marketplace list --json
   codex plugin list --marketplace onecrew --json
   ```

   Identify the official `onecrewai/onecrew-plugins` repository through `marketplaceSource`. Using the returned marketplace root, run `git -C <marketplace-root> rev-parse HEAD` and compare it with the guide's source commit. Preserve local development sources, other repositories, and versions the user explicitly asks to retain.

3. Select the guide's source commit. Replace `SOURCE_COMMIT` below with the actual commit from the guide.

   If the marketplace is absent:

   ```sh
   codex plugin marketplace add onecrewai/onecrew-plugins --ref SOURCE_COMMIT
   ```

   If the official marketplace points to a different commit, replace only its source registration:

   ```sh
   codex plugin marketplace remove onecrew
   codex plugin marketplace add onecrewai/onecrew-plugins --ref SOURCE_COMMIT
   ```

   Keep a matching source. Run dependent commands sequentially and stop on failure.

4. Install the plugin from the selected source and inspect the result:

   ```sh
   codex plugin add onecrew@onecrew --json
   codex plugin list --marketplace onecrew --json
   ```

   Require both commands to report the target version. At the returned `installedPath`, verify the manifest and updated skill files against the selected source. Stop and report any mismatch. Keep unrelated plugins and settings.

5. After installation is verified, reload the client or start a new conversation as required, then make one read-only live `account` status call. Report installation and connection results separately, including any pending reload.

CLI marketplace reference: [OpenAI documentation](https://developers.openai.com/plugins/build/plugins#add-a-marketplace-from-the-cli).
