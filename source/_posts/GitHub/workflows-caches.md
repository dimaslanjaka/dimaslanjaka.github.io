---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
category:
  - Programming
comments: true
cover: /GitHub/workflows/cover2.jpg
date: 2021-11-18T22:00:00+07:00
keywords:
  - GitHub
  - workflows
  - yml
  - cache
lang: id
location: Indonesia
subtitle: Cara menggunakan cache untuk mempercepat GitHub Workflows
tags:
  - GitHub
title: Mempercepat GitHub Workflow Dengan Cache Strategy
type: post
uuid: 1525e23b-de51-4888-8aa7-b643034cdf7d
webtitle: WMI GitHub
updated: 2021-11-21T23:06:49+07:00
thumbnail: /GitHub/workflows/cover2.jpg
photos:
  - /GitHub/workflows/cover2.jpg
description: Cara menggunakan cache untuk mempercepat GitHub Workflows
excerpt: Cara menggunakan cache untuk mempercepat GitHub Workflows
wordcount: 332
---

## Mempercepat kinerja github workflow
Satu-satunya cara untuk mempercepat kinerja github workflow (ci) adalah menggunakan metode `Cache Strategy`. Metode cache ini dapat beruba in-program function dan github action method, kamu juga dapat menggunakan keduanya untuk mepercepat kinerja Continous Integration di github workflow.

**Metode Cache Menggunakan Package GitHub Workflow**

cara ini menggunakan fungsi internal dari github workflow itu sendiri untuk menyimpan cache. Berikut contoh konfigurasi github workflow cache:
```yaml
name: CI NPM Menggunakan Cache
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2 # ini wajib
      - name: Metode Cache Dimulai
        uses: actions/cache@v2 # ini nama packagenya
        with:
          # folder yang akan di cache ialah `~/.npm, ./node_modules, dan ./vendor folder
          path: |
            ~/.npm
            ./node_modules
            ./vendor
          key: ${{ runner.os }}-build-${{ hashFiles('package-lock.json') }} # ini kunci menyimpan/save
          restore-keys: ${{ runner.os }}-build # ini kunci restore
      - run: npm install # install project nodejs
```
dengan konfigurasi diatas, command `npm install` akan sangat lebih cepat ketimbang tidak menggunakan cache. Yang biasanya menginstall biasa memerlukan waktu 10 menit, sekarang hanya butuh 2 menit saja untuk menyelesaikan-nya.

`build-${{ hashFiles('package-lock.json') }}` merupakan kunci untuk save, apabila dependencies atau packages berubah atau di update, maka kunci ini akan membuat cache baru otomatis sesuai dengan yang saat itu dikerjakan oleh workflow. Kunci tersebut akan membuat cache index baru misalnya seperti `build-d5ea0750`. Apabila kamu tidak memberikan kunci unik seperti `build-${{ hashFiles('package-lock.json') }}`, maka workflow tidak akan membuat cache baru melainkan mengambil cache yang lama dan akan terus mengulangi instalasi. Jadi perlu untuk memberikan kode unik di kunci save.

**Metode Cache Menggunakan In-Memory Cache (In-Program)**

Metode ini harus kamu tulis sendiri di dalam program-mu. Setiap bahasa pemrograman berbeda caranya. Berikut metode-metode yang bisa kamu buat di dalam program-mu.
- [NodeJS node-cache](https://www.npmjs.com/package/node-cache)
- [PHP Cache](http://www.php-cache.com/en/latest/)
- [Python Cache](https://docs.python.org/3.4/library/functools.html#functools.lru_cache)

Sekian artikel tentang metode cache github workflow. **Artikel ini akan terus di update**, **jangan lupa di bookmark**. Jangan lupa komentar agar tidak ketinggalan metode-metode baru dalam menerapkan caching strategy di GitHub Flow.