@echo off
setlocal DisableDelayedExpansion

if defined ONECREW_BINARY (
  set "ONECREW_MCP_EXE=%ONECREW_BINARY%"
) else (
  if not defined LOCALAPPDATA goto missing
  set "ONECREW_MCP_EXE=%LOCALAPPDATA%\Programs\OneCrewConnect\onecrew.exe"
)

if not "%ONECREW_MCP_EXE:~1,2%"==":\" if not "%ONECREW_MCP_EXE:~1,2%"==":/" if not "%ONECREW_MCP_EXE:~0,2%"=="\\" goto invalid
if not exist "%ONECREW_MCP_EXE%" goto missing

rem Release the plugin cache working directory before the long-running process.
cd /d "%SystemRoot%"
if errorlevel 1 exit /b 1
"%ONECREW_MCP_EXE%" mcp
exit /b %ERRORLEVEL%

:invalid
echo ONECREW_BINARY must be an absolute executable path. 1>&2
exit /b 64
:missing
echo OneCrew is not installed at the configured location. Run the OneCrew installer, or set ONECREW_BINARY to its absolute path. 1>&2
exit /b 127
