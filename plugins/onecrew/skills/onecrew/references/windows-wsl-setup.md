# Case: enable Windows WSL components

Use when Kiri shows WSL as installed but Add it to WSL fails with
`WSL_E_WSL_OPTIONAL_COMPONENT_REQUIRED` or a message requiring the Windows
Subsystem for Linux optional component. The program is installed; its Windows
components still need enabling or a restart to take effect.

1. Save [install-wsl.cmd](../assets/install-wsl.cmd) from this guide's revision
   into a user-visible folder. Open the folder and give the user its absolute
   path. Ask them to double-click the file and approve Windows UAC.
2. The file runs `wsl.exe --install --no-distribution` and displays its result.
   Wait for the user to finish; do not run it through the AI client's sandbox
   or ask the user to enter commands. On failure, read the displayed error.
3. After success, the user saves their work, restarts Windows, then opens Kiri
   and selects Try again at Add it to WSL. Resume
   [Windows installation](container-windows.md) after Kiri finishes setup.

See Microsoft's [WSL installation](https://learn.microsoft.com/en-us/windows/wsl/install)
and [command options](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#install).
