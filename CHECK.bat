@echo off
setlocal
cd /d "%~dp0"
echo ============================================================
echo  VIDEO STUDIO - CHECK
echo ============================================================
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\check.ps1"
set "EC=%ERRORLEVEL%"
echo.
echo Report: reports\check-report.txt
echo.
pause
exit /b %EC%
