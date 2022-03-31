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

<h2 id="mempercepat-kinerja-github-workflow" tabindex="-1"><a class="header-anchor" href="#mempercepat-kinerja-github-workflow">Mempercepat kinerja github workflow</a></h2>
<p>Satu-satunya cara untuk mempercepat kinerja github workflow (ci) adalah menggunakan metode <code>Cache Strategy</code>. Metode cache ini dapat beruba in-program function dan github action method, kamu juga dapat menggunakan keduanya untuk mepercepat kinerja Continous Integration di github workflow.</p>
<p><strong>Metode Cache Menggunakan Package GitHub Workflow</strong></p>
<p>cara ini menggunakan fungsi internal dari github workflow itu sendiri untuk menyimpan cache. Berikut contoh konfigurasi github workflow cache:</p>
<pre><code class="language-yaml">name: CI NPM Menggunakan Cache
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
</code></pre>
<p>dengan konfigurasi diatas, command <code>npm install</code> akan sangat lebih cepat ketimbang tidak menggunakan cache. Yang biasanya menginstall biasa memerlukan waktu 10 menit, sekarang hanya butuh 2 menit saja untuk menyelesaikan-nya.</p>
<p><code>build-${{ hashFiles('package-lock.json') }}</code> merupakan kunci untuk save, apabila dependencies atau packages berubah atau di update, maka kunci ini akan membuat cache baru otomatis sesuai dengan yang saat itu dikerjakan oleh workflow. Kunci tersebut akan membuat cache index baru misalnya seperti <code>build-d5ea0750</code>. Apabila kamu tidak memberikan kunci unik seperti <code>build-${{ hashFiles('package-lock.json') }}</code>, maka workflow tidak akan membuat cache baru melainkan mengambil cache yang lama dan akan terus mengulangi instalasi. Jadi perlu untuk memberikan kode unik di kunci save.</p>
<p><strong>Metode Cache Menggunakan In-Memory Cache (In-Program)</strong></p>
<p>Metode ini harus kamu tulis sendiri di dalam program-mu. Setiap bahasa pemrograman berbeda caranya. Berikut metode-metode yang bisa kamu buat di dalam program-mu.</p>
<ul>
<li><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvbm9kZS1jYWNoZQ==" target="_blank" rel="nofollow noopener">NodeJS node-cache</a></li>
<li><a href="//webmanajemen.com/page/safelink.html?url=aHR0cDovL3d3dy5waHAtY2FjaGUuY29tL2VuL2xhdGVzdC8=" target="_blank" rel="nofollow noopener">PHP Cache</a></li>
<li><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMy40L2xpYnJhcnkvZnVuY3Rvb2xzLmh0bWwjZnVuY3Rvb2xzLmxydV9jYWNoZQ==" target="_blank" rel="nofollow noopener">Python Cache</a></li>
</ul>
<p>Sekian artikel tentang metode cache github workflow. <strong>Artikel ini akan terus di update</strong>, <strong>jangan lupa di bookmark</strong>. Jangan lupa komentar agar tidak ketinggalan metode-metode baru dalam menerapkan caching strategy di GitHub Flow.</p>
