@echo off
setlocal DisableDelayedExpansion

if defined ONECREW_BINARY (
  set "ONECREW_MCP_EXE=%ONECREW_BINARY%"
) else (
  if not defined ONECREW_INSTALL_DIR set "ONECREW_INSTALL_DIR=%LOCALAPPDATA%\OneCrewPro"
  goto installed
)
goto explicit

:installed
if exist "%ONECREW_INSTALL_DIR%\node-path" if exist "%ONECREW_INSTALL_DIR%\npm\node_modules\@onecrew\pro\bin\onecrew-pro.cjs" (
  set /p ONECREW_NODE=<"%ONECREW_INSTALL_DIR%\node-path"
  goto prepared
)
  for %%I in (onecrew-pro.cmd) do set "ONECREW_NPM_CMD=%%~$PATH:I"
  if defined ONECREW_NPM_CMD goto npm
  goto missing

:explicit
if not "%ONECREW_MCP_EXE:~1,2%"==":\" if not "%ONECREW_MCP_EXE:~1,2%"==":/" if not "%ONECREW_MCP_EXE:~0,2%"=="\\" goto invalid
if not exist "%ONECREW_MCP_EXE%" goto missing

rem Release the plugin cache working directory before the long-running process.
cd /d "%SystemRoot%"
if errorlevel 1 exit /b 1
"%ONECREW_MCP_EXE%" mcp
exit /b %ERRORLEVEL%

:prepared
cd /d "%SystemRoot%"
if errorlevel 1 exit /b 1
"%ONECREW_NODE%" "%ONECREW_INSTALL_DIR%\npm\node_modules\@onecrew\pro\bin\onecrew-pro.cjs" mcp
exit /b %ERRORLEVEL%

:npm
cd /d "%SystemRoot%"
if errorlevel 1 exit /b 1
call "%ONECREW_NPM_CMD%" mcp
exit /b %ERRORLEVEL%

:invalid
echo ONECREW_BINARY must be an absolute executable path. 1>&2
exit /b 64
:missing
echo OneCrew is not installed at the configured location. Install @onecrew/pro, or set ONECREW_BINARY to its absolute native executable path. 1>&2
exit /b 127
