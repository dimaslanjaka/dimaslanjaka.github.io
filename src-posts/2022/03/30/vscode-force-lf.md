---
title: Force Change ALl End Of Line VSCode To LF
date: 2022-03-29T20:32:29+0000
updated: 2022-03-29T20:32:29+0000
cover: https://miro.medium.com/max/1400/1*HSXWWE7wkg9phEJ7ImhT2Q.jpeg
---

## Git change all crlf to lf for vscode
```shell
git add -A
git commit -m "Commit Message Before Changing End Of Line"
git push
# begin changing end of line globally
git config core.autocrlf false
git rm --cached -r .
git reset --hard
```

## Change VSCode `settings.json` Option
```json
{
  "files.eol": "\n"
}
```
![Preview settings.json](https://imgs.developpaper.com/imgs/287058866-5bfb8bd1d4851_articlex.png)