@echo off
rem echo %CD%
SET script_path=%~dp0
rem echo %script_path%
rem echo %mypath:~0,-1%
ECHO Insert Source Directory
set /p src=source :
ECHO Insert Target Directory
set /p target=target :
php %script_path%obfuscate obfuscate %src% %target%
pause