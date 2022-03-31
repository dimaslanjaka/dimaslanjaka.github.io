---
category:
  - Programming
  - MYSQL
date: 2022-03-26T00:00:00+07:00
tags:
  - MySQL
title: MySQL Command to create new database user
updated: 2022-03-26
uuid: abcdca48-acd1-4888-8a33-cdcdb7b877dc
lang: en
description: MySQL Command to create new database user
subtitle: MySQL Command to create new database user
excerpt: MySQL Command to create new database user
wordcount: 48
---

```mysql
CREATE USER 'dimaslanjaka'@'%' IDENTIFIED VIA mysql_native_password USING '***';GRANT ALL PRIVILEGES ON *.* TO 'dimaslanjaka'@'%' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;GRANT ALL PRIVILEGES ON `dimaslanjaka\_%`.* TO 'dimaslanjaka'@'%';
```
> creating user with username `dimaslanjaka` with all previleges
