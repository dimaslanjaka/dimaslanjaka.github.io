---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
category:
  - Programming
comments: true
cover: /GitHub/workflows/cover.png
date: 2021-11-18T22:00:00+07:00
keywords:
  - GitHub
  - workflows
  - yml
lang: id
location: Indonesia
subtitle: Semua yang kamu harus tau tentang GitHub Workflows
tags:
  - GitHub
title: GitHub Workflows
type: post
uuid: 741baa72-98c8-4888-8c0f-96eee0b56067
webtitle: WMI GitHub
updated: 2021-11-19T00:29:25+07:00
thumbnail: /GitHub/workflows/cover.png
photos:
  - /GitHub/workflows/cover.png
description: Semua yang kamu harus tau tentang GitHub Workflows
excerpt: Semua yang kamu harus tau tentang GitHub Workflows
wordcount: 426
---

<p>GitHub menyediakan templat alur kerja (<i>preconfigured workflow templates</i>) yang telah dikonfigurasi sebelumnya yang dapat Anda sesuaikan untuk membuat alur kerja integrasi berkelanjutan (<i>CI</i>) Anda sendiri. GitHub menganalisis kode Anda dan menunjukkan template <i>CI</i> yang mungkin berguna untuk repositori Anda. Misalnya, jika repositori Anda berisi Node/Program. [<a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vZW4vYWN0aW9ucy9xdWlja3N0YXJ0" target="_blank" rel="nofollow noopener">source</a>]</p>
<p>Simplenya kamu dapat menggunakan program kamu dengan VPS gratis yang disediakan oleh GitHub. Meskipun begitu, kamu tidak dapat leluasa menggunakannya seperti VPS provider lain. Di GitHub Workflow kamu hanya dapat menggunakannya dengan logic/logika program-mu dalam 1x jalan.</p>
<p>Github Workflow merupakan alternatif Continous Integration Gratis Dari Github. Sama halnya Travis CI, CircleCI, Jenkins, AppVeyor, <a href="//webmanajemen.com/page/safelink.html?url=aHR0cDovL0Ryb25lLmlv" target="_blank" rel="nofollow noopener">Drone.io</a>, GitLab, dan lain sebagainya.</p>
<h2 id="fitur-fitur-dari-git-hub-workflow" tabindex="-1"><a class="header-anchor" href="#fitur-fitur-dari-git-hub-workflow">Fitur-fitur dari GitHub Workflow</a></h2>
<ul>
<li>CI (Continous Integration) adalah praktik mengotomatiskan integrasi perubahan kode dari banyak kontributor ke dalam satu proyek perangkat lunak.</li>
<li>Membangun GitHub Pages</li>
<li>Test kode-mu di cloud tanpa menggunakan resources device-mu</li>
<li>Test kode-mu dengan berbagai tipe device/machine, misal MAC, Windows, Linux (ubuntu, debian, dan lain-lain)</li>
<li>Dan banyak lagi</li>
</ul>
<h2 id="konfigurasi" tabindex="-1"><a class="header-anchor" href="#konfigurasi">Konfigurasi</a></h2>
<p>Sama halnya dengan Continous Integration (CI) lain, GitHub Workflow juga membutuhkan konfigurasi dalam bentuk <code>yaml</code> file.</p>
<h3 id="berikut-struktur-konfigurasi-github-workflow" tabindex="-1"><a class="header-anchor" href="#berikut-struktur-konfigurasi-github-workflow">Berikut struktur konfigurasi github workflow:</a></h3>
<pre><code class="language-yaml">github-project/
├─ .github/
│  ├─ workflow/
│  │  ├─ github-workflow-config.yml &lt;-- konfigurasi github workflow
├─ .git/
├─ .gitignore
</code></pre>
<h3 id="isi-konfigurasi-github-workflow-github-workflow-config-yml" tabindex="-1"><a class="header-anchor" href="#isi-konfigurasi-github-workflow-github-workflow-config-yml">Isi konfigurasi github workflow <code>github-workflow-config.yml</code></a></h3>
<pre><code class="language-yaml">name: GitHub Actions Demo # nama flow
on: [push] # CI akan jalan pada saat push event
jobs:
  NodeJS:
    runs-on: ubuntu-latest # OS yang akan kamu gunakan
    steps: # daftar urutan command line yang akan dijalankan
      - run: echo &quot;🎉 job otomatis berjalan saat dipicu oleh ${{ github.event_name }} event.&quot;
      - run: echo &quot;🐧 job ini berjalan pada sistem operasi ${{ runner.os }} server hosted dari GitHub!&quot;
      - run: echo &quot;🔎 nama branch repository-mu adalah ${{ github.ref }} and repository-mu ialah ${{ github.repository }}.&quot;
      - name: Check out repository code
        uses: actions/checkout@v2 # ini wajib ya, untuk memuat repository kamu ke dalam home os
      - run: echo &quot;💡 The ${{ github.repository }} repository berhasil di duplikasi ke dalam os ${{ runner.os }}&quot;
      - run: echo &quot;🖥️ Workflow ini sekarang sudah siap untuk melakukan rangkaian program yang ada pada repository ${{ github.repository }}#${{ github.ref }}&quot;
      - name: Daftar keseluruhan file di dalam repository
        run: |
          ls ${{ github.workspace }}
      - run: echo &quot;🍏 Job status ${{ job.status }}.&quot;
</code></pre>
<h1 id="berikut-ini-daftar-penggunaan-dan-tips-trick-untuk-github-workflow" tabindex="-1"><a class="header-anchor" href="#berikut-ini-daftar-penggunaan-dan-tips-trick-untuk-github-workflow">Berikut ini daftar penggunaan dan tips trick untuk github workflow</a></h1>
<p><a href="//webmanajemen.com/page/safelink.html?url=d29ya2Zsb3dzLWNhY2hlcy5odG1s" target="_blank" rel="nofollow noopener">Cara mempercepat kinerja github workflows</a></p>
