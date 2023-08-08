@echo off

echo "fix auto rebase"
git config config.pull false
echo "force LF end of line"
git config core.autocrlf false
