---
title: MySQL Command to create new database user
updated: 2022-03-26
date: 2022-03-26
tags:
  - MySQL
category:
  - Programming
  - MySQL
---

```mysql
CREATE USER 'dimaslanjaka'@'%' IDENTIFIED VIA mysql_native_password USING '***';GRANT ALL PRIVILEGES ON *.* TO 'dimaslanjaka'@'%' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;GRANT ALL PRIVILEGES ON `dimaslanjaka\_%`.* TO 'dimaslanjaka'@'%';
```
> creating user with username `dimaslanjaka` with all previleges
