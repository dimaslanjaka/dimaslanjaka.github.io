@echo off

git gc --aggresive --prune=now
git submodule foreach "git gc --aggresive --prune=now || :"