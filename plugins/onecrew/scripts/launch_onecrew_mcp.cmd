@echo off
setlocal DisableDelayedExpansion
if not defined ONECREW_DESKTOP_RUNTIME if exist "%LOCALAPPDATA%\Programs\OneCrew Pro Preview\resources\onecrew-runtime\bin\node.exe" set "ONECREW_DESKTOP_RUNTIME=%LOCALAPPDATA%\Programs\OneCrew Pro Preview\resources\onecrew-runtime"
if not defined ONECREW_DESKTOP_RUNTIME if exist "%LOCALAPPDATA%\Programs\onecrew-desktop\resources\onecrew-runtime\bin\node.exe" set "ONECREW_DESKTOP_RUNTIME=%LOCALAPPDATA%\Programs\onecrew-desktop\resources\onecrew-runtime"
if not defined ONECREW_DATA_DIR set "ONECREW_DATA_DIR=%APPDATA%\OneCrewProPreview\data"
if not defined ONECREW_DESKTOP_RUNTIME (
  echo Locate the installed OneCrew Pro app and set ONECREW_DESKTOP_RUNTIME to its absolute onecrew-runtime directory. 1>&2
  exit /b 127
)
if not "%ONECREW_DESKTOP_RUNTIME:~1,2%"==":\" if not "%ONECREW_DESKTOP_RUNTIME:~0,2%"=="\\" exit /b 64
if not "%ONECREW_DATA_DIR:~1,2%"==":\" if not "%ONECREW_DATA_DIR:~0,2%"=="\\" exit /b 64
if not exist "%ONECREW_DESKTOP_RUNTIME%\bin\node.exe" exit /b 127
if not exist "%ONECREW_DESKTOP_RUNTIME%\dist\cli.js" exit /b 127
cd /d "%SystemRoot%"
if errorlevel 1 exit /b 1
"%ONECREW_DESKTOP_RUNTIME%\bin\node.exe" "%ONECREW_DESKTOP_RUNTIME%\dist\cli.js" mcp --data-dir "%ONECREW_DATA_DIR%"
exit /b %ERRORLEVEL%
