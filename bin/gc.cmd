@echo off

git gc --aggressive --prune=now
git submodule foreach "git gc --aggressive --prune=now || :"