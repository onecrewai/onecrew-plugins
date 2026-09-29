# Update the OneCrew Codex plugin

Run these steps on the computer where the Codex plugin is installed, when the user asks to install or update it. Plugin updates use the local Codex CLI; check it before reporting that an update is unavailable.

1. Locate `codex` with `command -v codex` (macOS/Linux) or `Get-Command codex` (PowerShell). If it is not on PATH, locate the installed desktop app's bundled CLI and use its actual executable path. Check `codex plugin marketplace --help` and `codex plugin add --help`.

2. Inspect the current installation:

   ```sh
   codex plugin marketplace list
   codex plugin list --marketplace onecrew --json
   ```

   Check `marketplaceSource` for the repository; a local `source.path` inside the Git snapshot is normal. The GitHub source is `onecrewai/onecrew-plugins`. If it is not registered, run `codex plugin marketplace add onecrewai/onecrew-plugins`. Preserve an explicitly configured development source or pinned ref unless the user requests a source change.

3. Refresh OneCrew's marketplace, then install its current plugin files:

   ```sh
   codex plugin marketplace upgrade onecrew
   codex plugin add onecrew@onecrew --json
   ```

   A marketplace refresh alone is not confirmation that the installed plugin was updated. Do not uninstall it, delete its cache, or edit `config.toml` as part of a normal update.

4. Run `codex plugin list --marketplace onecrew --json` again. Verify `onecrew@onecrew` is installed and report its version. If the version is unchanged, check the installed files against the refreshed source before claiming new content was installed. Report any command failure with its actual cause.

Start a new conversation to use the updated skill and tools. An already-running conversation may retain the earlier definitions.

CLI marketplace reference: [OpenAI documentation](https://developers.openai.com/plugins/build/plugins#add-a-marketplace-from-the-cli).
