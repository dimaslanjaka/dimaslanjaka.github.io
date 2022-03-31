---
cover: https://i.ytimg.com/vi/alj5it9EwIM/maxresdefault.jpg
date: 2022-03-26T23:46:00+0700
subtitle: Various step to fix xampp windows updated 2022
tags:
  - Apache
  - XAMPP
  - PHP
  - MySQL
title: How to solve Error Apache shutdown unexpectedly updated 2022
updated: 2022-03-27T23:46:00+0700
uuid: 60adad91-cafd-4888-8da8-a84bfff539a9
category:
  - Programming
  - PHP
excerpt: Various step to fix xampp windows updated 2022
description: Various step to fix xampp windows updated 2022
lang: en
thumbnail: https://i.ytimg.com/vi/alj5it9EwIM/maxresdefault.jpg
photos:
  - https://i.ytimg.com/vi/alj5it9EwIM/maxresdefault.jpg
wordcount: 265
---

## How to solve "Error: Apache shutdown unexpectedly"?
### XAMPP Log Error
```log
16:50:25  [Apache]     Status change detected: running
16:50:26  [Apache]     Status change detected: stopped
16:50:26  [Apache]     Error: Apache shutdown unexpectedly.
16:50:26  [Apache]     This may be due to a blocked port, missing dependencies,
16:50:26  [Apache]     improper privileges, a crash, or a shutdown by another method.
16:50:26  [Apache]     Press the Logs button to view error logs and check
16:50:26  [Apache]     the Windows Event Viewer for more clues
16:50:26  [Apache]     If you need more help, copy and post this
16:50:26  [Apache]     entire log window on the forums
```
how to solve [above log](#xampp-log-error) ?

#### Folder Location
Make sure the location of the `XAMPP` folder is outside the drive. Basically xampp only reads from your drive letter. for example:
```text
D:\xampp
C:\xampp
```

#### Changing Port
- Try changing port.
> in **Control Panel** change apache port `80` -> `8081`, `443` -> `4433`
![Port XAMPP](https://i.stack.imgur.com/McjHN.png)
- Open folder `D:\xampp\apache\conf\extra` and open all conf files one by one. (change `D:` with your drive letter)
> Find `<VirtualHost _default_:443>` and change it to `<VirtualHost _default_:4443>`.
>
> Find `ServerName localhost:443`. It’s possible that this hasn’t been set up yet and it reads `ServerName www.example.com:443`. In any case, change it to `ServerName localhost:4443`.

#### Restart XAMPP
- Stop and Start apache
- Stop and start mysql
