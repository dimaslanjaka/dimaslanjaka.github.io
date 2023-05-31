:: Created by npm, please don't edit manually.
@ECHO OFF

setlocal EnableExtensions DisableDelayedExpansion

set "NODE_HOME=%~dp0\node"
rem find node installation location
FOR /F "delims=" %%A IN ('where node') DO set "NODE_HOME=%%A"
for %%D in ("%NODE_HOME%") do set "NODE_HOME=%%~dpD"
rem set node installation location to PATH
set "PATH=%NODE_HOME%;%PATH%"
rem set node
set "NODE_EXE=%NODE_HOME%\node.exe"
if not exist "%NODE_EXE%" (
  set "NODE_EXE=node.exe"
)
rem set npm location
set "NPM_CLI_JS=%NODE_HOME%\node_modules\npm\bin\npm-cli.js"
rem revalidate node home
FOR /F "delims=" %%F IN ('CALL "%NODE_EXE%" "%NPM_CLI_JS%" prefix -g') DO (
  set "NODE_EXE=%%F\node"
)
rem set js file
set "JS_FILE=%~dp0\conventional-commit"
rem execute js file
"%NODE_EXE%" "%JS_FILE%" -t chore %*