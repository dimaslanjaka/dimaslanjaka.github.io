---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
category:
  - Programming
comments: true
cover: /GitHub/workflows/events.png
date: 2021-11-21T23:00:00+07:00
keywords:
  - GitHub
  - workflows
  - yml
lang: id
location: Indonesia
subtitle: Macam-macam events pada GitHub Workflows
tags:
  - GitHub
title: GitHub Workflow Events
type: post
uuid: e94a4f00-6a10-4888-8fca-dfc8fe6e687f
webtitle: WMI GitHub
updated: 2021-12-20T15:33:55+07:00
thumbnail: /GitHub/workflows/events.png
photos:
  - /GitHub/workflows/events.png
description: Macam-macam events pada GitHub Workflows
excerpt: Macam-macam events pada GitHub Workflows
wordcount: 315
---

<h1 id="events-yang-memicu-github-workflow" tabindex="-1"><a class="header-anchor" href="#events-yang-memicu-github-workflow">Events yang memicu Github Workflow</a></h1>
<p>Anda dapat mengkonfigurasi alur kerja Anda untuk berjalan saat aktivitas tertentu di GitHub terjadi, pada waktu yang dijadwalkan, atau saat peristiwa di luar GitHub terjadi.</p>
<h2 id="contoh-menggunakan-single-event" tabindex="-1"><a class="header-anchor" href="#contoh-menggunakan-single-event">Contoh Menggunakan single event</a></h2>
<pre><code class="language-yaml"># Memicu workflow pada event push atau pull request
on: [push, pull_request]
</code></pre>
<h2 id="contoh-menggunakan-beberapa-events-dengan-jenis-atau-konfigurasi-aktivitas" tabindex="-1"><a class="header-anchor" href="#contoh-menggunakan-beberapa-events-dengan-jenis-atau-konfigurasi-aktivitas">Contoh Menggunakan beberapa events dengan jenis atau konfigurasi aktivitas</a></h2>
<p>Jika Anda perlu menentukan jenis aktivitas atau konfigurasi untuk suatu peristiwa, Anda harus mengonfigurasi setiap peristiwa secara terpisah. Anda harus menambahkan titik dua (:) ke semua event, termasuk event tanpa konfigurasi.</p>
<pre><code class="language-yaml">on:
  # Memicu workflow pada event push atau pull request,
  # tapi hanya untuk event `main` branch,
  # anda juga dapat menambahkan beberapa branch dibawah,
  # cukup tambahkan `- nama branch`
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
</code></pre>
<h2 id="contoh-menggunakan-workflow-lain-sebagai-acuan-untuk-memicu-workflow-saat-ini" tabindex="-1"><a class="header-anchor" href="#contoh-menggunakan-workflow-lain-sebagai-acuan-untuk-memicu-workflow-saat-ini">Contoh Menggunakan workflow lain sebagai acuan untuk memicu workflow saat ini</a></h2>
<p>Ini workflow yang akan di lihat (primary workflow)</p>
<pre><code class="language-yaml"># workflow yang akan berjalan pertama kali
name: Primary Workflow
</code></pre>
<p>Ini workflow kedua yang akan jalan apabila workflow pertama sukses</p>
<pre><code class="language-yaml"># apabila 'Primary Workflow' selesai, lanjutkan workflow ini
on:
  workflow_run:
    workflows: [&quot;Primary Workflow&quot;]
    # hanya akan jalan apabila 'Primary Workflow' sukses/tidak error
    types:
      - completed
</code></pre>
<p>Ini workflow ketiga yang akan jalan berdampingan dengan workflow pertama, apabila workflow tersebut diminta untuk jalan (terpicu)</p>
<pre><code class="language-yaml"># apabila primary workflow dipicu, maka workflow ini juga akan jalan
on:
  workflow_run:
    workflows: [&quot;Primary Workflow&quot;]
    # hanya akan jalan apabila 'Primary Workflow' terpicu
    types:
      - requested
</code></pre>
<h2 id="contoh-github-workflow-run-after-other-workflow" tabindex="-1"><a class="header-anchor" href="#contoh-github-workflow-run-after-other-workflow">Contoh Github workflow run after other workflow</a></h2>
<p><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzY3NTM0OTIw" target="_blank" rel="nofollow noopener">source idea</a></p>
<pre><code class="language-yaml"> on:
   workflow_run:
     workflows: [&quot;Other Workflow Name&quot;]
     types:
      - completed

 jobs:
   on-success:
     runs-on: ubuntu-latest
     if: ${{ github.event.workflow_run.conclusion == 'success' }}
     steps:
       - run: echo &quot;First workflow was a success&quot;

   on-failure:
     runs-on: ubuntu-latest
     if: ${{ github.event.workflow_run.conclusion == 'failure' }}
     steps:
       - run: echo &quot;First workflow was a failure&quot;
</code></pre>
<p>Artikel ini hanya untuk mempermudah pengguna dalam memahami GitHub Workflow.</p>
