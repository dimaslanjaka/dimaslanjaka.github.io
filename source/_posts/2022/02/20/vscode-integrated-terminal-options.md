---
Category:
  - Programming
  - IDE
cover: https://fabianlee.org/wp-content/uploads/2021/12/vscode-logo.png
date: 2022-02-20T07:00:00+07:00
tags:
  - VSCode
title: Custom PATH VSCode Integrated Terminal Options
updated: 2022-03-29T21:23:48+0000
uuid: 3b1b7031-6ca3-4888-8c93-4812c6cc40c2
webtitle: VSCode
category:
  - Uncategorized
lang: en
description: Custom PATH VSCode Integrated Terminal Options
subtitle: Custom PATH VSCode Integrated Terminal Options
excerpt: Custom PATH VSCode Integrated Terminal Options
thumbnail: https://fabianlee.org/wp-content/uploads/2021/12/vscode-logo.png
photos:
  - https://fabianlee.org/wp-content/uploads/2021/12/vscode-logo.png
wordcount: 97
---

Determining custom path on vscode IDE made easily development programs within multiple platforms.

## Linux Env
Add custom path to terminal linux
```json
{
  "terminal.integrated.env.linux": {
    "PATH": "./bin:${env:PATH}"
  }
}
```

## Windows Env
Add path into vscode terminal windows
```json
{
  "terminal.integrated.env.windows": {
    "PATH": "${env:PATH};C:\\bin;C:\\another\\folder"
  }
}
```

## MAC OSX Env
Add path into vscode terminal mac osx
```json
{
  "terminal.integrated.env.osx": {
    "PATH": "/home"
  }
}
```
Now open Terminal and look at PATH
```shell
echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/home
```

### Also See
- [vscode alert: CommonJS may be converted to an es module](/2022/03/26/file-is-a-commonjs-module-it-may-be-converted-to-an-es-module.html)
- [vscode crossplatform settings](/p/search.html?q=vscode+crossplatform+setting)