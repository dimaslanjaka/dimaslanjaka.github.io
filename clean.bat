@echo off
rem git checkout --orphan latest_branch
rem git add -A
rem git commit -am "Re-index Repository"
rem git branch -D master
rem git branch -m master
rem git push -f origin master
rem git push -u --force origin master
rem remove the old files
rem git gc --aggressive --prune=all

rem ----------------------------------
set /p commitmsg="Enter Commit Messages: "
rem -- Remove the history from 
rm -rf .git

rem -- recreate the repos from the current content only
git init
git add .
git commit -m "%commitmsg%"

rem -- push to the github remote repos ensuring you overwrite history
git remote add origin https://github.com/dimaslanjaka/dimaslanjaka.github.io.git
git push -u --force origin master
rem --------------------------------------