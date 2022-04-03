#!/usr/bin/env bash
git ls-tree -r --name-only HEAD | while read filename; do
  #echo "$(git log -1 --format="%ad" -- $filename) $filename"
  echo "$(git log -1 --format="%cD" -- $filename) $filename"
done