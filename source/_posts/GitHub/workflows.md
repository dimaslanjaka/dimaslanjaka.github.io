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

GitHub menyediakan templat alur kerja (<i>preconfigured workflow templates</i>) yang telah dikonfigurasi sebelumnya yang dapat Anda sesuaikan untuk membuat alur kerja integrasi berkelanjutan (<i>CI</i>) Anda sendiri. GitHub menganalisis kode Anda dan menunjukkan template <i>CI</i> yang mungkin berguna untuk repositori Anda. Misalnya, jika repositori Anda berisi Node/Program. [[source](https://docs.github.com/en/actions/quickstart)]

Simplenya kamu dapat menggunakan program kamu dengan VPS gratis yang disediakan oleh GitHub. Meskipun begitu, kamu tidak dapat leluasa menggunakannya seperti VPS provider lain. Di GitHub Workflow kamu hanya dapat menggunakannya dengan logic/logika program-mu dalam 1x jalan.

Github Workflow merupakan alternatif Continous Integration Gratis Dari Github. Sama halnya Travis CI, CircleCI, Jenkins, AppVeyor, Drone.io, GitLab, dan lain sebagainya.

## Fitur-fitur dari GitHub Workflow
- CI (Continous Integration) adalah praktik mengotomatiskan integrasi perubahan kode dari banyak kontributor ke dalam satu proyek perangkat lunak.
- Membangun GitHub Pages
- Test kode-mu di cloud tanpa menggunakan resources device-mu
- Test kode-mu dengan berbagai tipe device/machine, misal MAC, Windows, Linux (ubuntu, debian, dan lain-lain)
- Dan banyak lagi

## Konfigurasi
Sama halnya dengan Continous Integration (CI) lain, GitHub Workflow juga membutuhkan konfigurasi dalam bentuk `yaml` file.
### Berikut struktur konfigurasi github workflow:
```yaml
github-project/
├─ .github/
│  ├─ workflow/
│  │  ├─ github-workflow-config.yml <-- konfigurasi github workflow
├─ .git/
├─ .gitignore
```
### Isi konfigurasi github workflow `github-workflow-config.yml`
```yaml
name: GitHub Actions Demo # nama flow
on: [push] # CI akan jalan pada saat push event
jobs:
  NodeJS:
    runs-on: ubuntu-latest # OS yang akan kamu gunakan
    steps: # daftar urutan command line yang akan dijalankan
      - run: echo "🎉 job otomatis berjalan saat dipicu oleh ${{ github.event_name }} event."
      - run: echo "🐧 job ini berjalan pada sistem operasi ${{ runner.os }} server hosted dari GitHub!"
      - run: echo "🔎 nama branch repository-mu adalah ${{ github.ref }} and repository-mu ialah ${{ github.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v2 # ini wajib ya, untuk memuat repository kamu ke dalam home os
      - run: echo "💡 The ${{ github.repository }} repository berhasil di duplikasi ke dalam os ${{ runner.os }}"
      - run: echo "🖥️ Workflow ini sekarang sudah siap untuk melakukan rangkaian program yang ada pada repository ${{ github.repository }}#${{ github.ref }}"
      - name: Daftar keseluruhan file di dalam repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 Job status ${{ job.status }}."
```

# Berikut ini daftar penggunaan dan tips trick untuk github workflow
[Cara mempercepat kinerja github workflows](workflows-caches.html)