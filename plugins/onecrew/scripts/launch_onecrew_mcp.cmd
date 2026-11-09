@echo off
setlocal DisableDelayedExpansion
if not defined ONECREW_CONTAINER_RUNTIME for %%I in (docker.exe) do set "ONECREW_CONTAINER_RUNTIME=%%~$PATH:I"
if not defined ONECREW_CONTAINER_RUNTIME if defined USERPROFILE if exist "%USERPROFILE%\.docker\bin\docker.exe" set "ONECREW_CONTAINER_RUNTIME=%USERPROFILE%\.docker\bin\docker.exe"
if not defined ONECREW_CONTAINER_RUNTIME if defined ProgramFiles if exist "%ProgramFiles%\Docker\Docker\resources\bin\docker.exe" set "ONECREW_CONTAINER_RUNTIME=%ProgramFiles%\Docker\Docker\resources\bin\docker.exe"
if not defined ONECREW_CONTAINER_RUNTIME if defined ProgramW6432 if exist "%ProgramW6432%\Docker\Docker\resources\bin\docker.exe" set "ONECREW_CONTAINER_RUNTIME=%ProgramW6432%\Docker\Docker\resources\bin\docker.exe"
if not defined ONECREW_CONTAINER_RUNTIME if defined LOCALAPPDATA if exist "%LOCALAPPDATA%\Kiri\bin\docker.exe" set "ONECREW_CONTAINER_RUNTIME=%LOCALAPPDATA%\Kiri\bin\docker.exe"
if not defined ONECREW_CONTAINER_RUNTIME (
  echo Docker CLI is unavailable. Set ONECREW_CONTAINER_RUNTIME to the absolute path of a Docker-compatible CLI. 1>&2
  exit /b 127
)
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
