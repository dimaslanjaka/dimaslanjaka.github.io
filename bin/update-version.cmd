@ECHO ON

SETLOCAL

SET "NODE_EXE=%~dp0\node.exe"
IF NOT EXIST "%NODE_EXE%" (
  SET "NODE_EXE=node"
)

rem %NODE_EXE% "%~dp0update-version.js" %*

node "%~dp0update-version.js" %*
