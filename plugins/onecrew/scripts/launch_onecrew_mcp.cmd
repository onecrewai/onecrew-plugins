@echo off
setlocal DisableDelayedExpansion
if not defined ONECREW_CONTAINER_RUNTIME set "ONECREW_CONTAINER_RUNTIME=%LOCALAPPDATA%\Kiri\bin\kiri.exe"
if not defined ONECREW_CONTAINER_NAME set "ONECREW_CONTAINER_NAME=onecrew-pro"
if not "%ONECREW_CONTAINER_RUNTIME:~1,2%"==":\" if not "%ONECREW_CONTAINER_RUNTIME:~1,2%"==":/" if not "%ONECREW_CONTAINER_RUNTIME:~0,2%"=="\\" (
  echo ONECREW_CONTAINER_RUNTIME must be an absolute executable path. 1>&2
  exit /b 64
)
if not exist "%ONECREW_CONTAINER_RUNTIME%" (
  echo The configured container runtime is unavailable. 1>&2
  exit /b 127
)
cd /d "%SystemRoot%"
if errorlevel 1 exit /b 1
"%ONECREW_CONTAINER_RUNTIME%" exec -i "%ONECREW_CONTAINER_NAME%" node /app/dist/cli.js mcp
exit /b %ERRORLEVEL%
