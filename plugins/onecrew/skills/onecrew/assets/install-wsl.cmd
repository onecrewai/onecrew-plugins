@echo off
setlocal
title OneCrew - Install WSL

if /i "%~1"=="--elevated" goto install
set "ONECREW_WSL_INSTALLER=%~f0"
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -Command "$ErrorActionPreference='Stop'; $p = Start-Process -FilePath $env:ONECREW_WSL_INSTALLER -ArgumentList '--elevated' -Verb RunAs -Wait -PassThru; exit $p.ExitCode"
set "RC=%errorlevel%"
if "%RC%"=="0" exit /b 0
if "%RC%"=="3010" exit /b 3010
echo WSL setup did not complete. Exit code: %RC%
pause
exit /b %RC%

:install
"%SystemRoot%\System32\wsl.exe" --install --no-distribution
set "RC=%errorlevel%"
echo.
echo WSL exit code: %RC%
if "%RC%"=="0" goto installed
if "%RC%"=="3010" goto installed
echo WSL setup failed. Keep this window open for the error details.
pause
exit /b %RC%

:installed
echo Save your work, restart Windows, then open Kiri to finish setup.
pause
exit /b %RC%
