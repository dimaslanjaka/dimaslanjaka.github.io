@echo off



rem    Destroy a commit and throw away any uncommitted changes

rem    git reset --hard HEAD~1

rem    Undo the commit, but keep your changes

rem    git reset HEAD~1

rem    Keep your files, and stage all changes back automatically

    git reset --soft HEAD~1

rem    Resurrect a commit you destroyed

rem    git reflog # To find the sh

