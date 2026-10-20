# Update the OneCrew Codex plugin

Run these steps on the computer where the Codex plugin is installed, when the user asks to install or update it. Read the current Access installation guide and take the target plugin version and source commit from it. The binary and plugin have separate versions.

1. Locate `codex` with `command -v codex` (macOS/Linux) or `Get-Command codex` (PowerShell). If it is not on PATH, locate the installed desktop app's bundled CLI and use its actual executable path. Check `codex plugin marketplace --help` and `codex plugin add --help`.

2. Inspect the current installation:

   ```sh
   codex plugin marketplace list --json
   codex plugin list --marketplace onecrew --json
   ```

   Check `marketplaceSource` for the repository; a local `source.path` inside the Git snapshot is normal. The official repository is `onecrewai/onecrew-plugins`. For its Git marketplace, run `git -C <marketplace-root> rev-parse HEAD` using the root returned by the list command. Compare that commit with the guide's source commit. A saved ref may come from an earlier OneCrew installation; preserve an older version only when the user explicitly asks to keep it. Preserve local development sources and other repositories unless the user authorizes replacing them.

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

   Run these commands sequentially and stop on failure. If the source already matches, keep it. `marketplace upgrade` refreshes the configured ref; a ref pinned to an older commit still returns that older release. “Already up to date” does not verify the version requested by Access.

4. Install the plugin from the selected source and inspect the result:

   ```sh
   codex plugin add onecrew@onecrew --json
   codex plugin list --marketplace onecrew --json
   ```

   Require both commands to report the target version. Use `installedPath` from the install result to check the installed manifest and updated skill files against the selected marketplace source. This also detects revised content published under the same version. A remaining version or file mismatch is an incomplete installation; report the actual source and installed result. Do not uninstall the plugin, delete its cache manually, or edit `config.toml` by hand.

After installation is verified, start a new conversation to load the updated skill and tools, then make one read-only live `account` status call. If that requires a new conversation, report it as pending. A new conversation does not upgrade files that are still installed at an older version.

CLI marketplace reference: [OpenAI documentation](https://developers.openai.com/plugins/build/plugins#add-a-marketplace-from-the-cli).
