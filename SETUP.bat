@echo off
setlocal
cd /d "%~dp0"
echo ============================================================
echo  VIDEO STUDIO - LOCAL SETUP
echo ============================================================
echo.
echo This setup does NOT run git init and does NOT modify global
echo Codex skills, global Ponytail, or other projects.
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\setup.ps1"
set "EC=%ERRORLEVEL%"
echo.
if "%EC%"=="0" (
  echo Setup completed successfully.
  echo Send reports\setup-report.txt to ChatGPT for verification.
) else (
  echo Setup completed with errors or warnings requiring attention.
  echo Send reports\setup-report.txt and the referenced log files to ChatGPT.
)
echo.
pause
exit /b %EC%
