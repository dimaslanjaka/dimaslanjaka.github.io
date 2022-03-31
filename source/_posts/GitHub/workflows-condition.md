---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
category:
  - Programming
comments: true
cover: /GitHub/workflows/cover.png
date: 2021-11-23T02:00:00+07:00
keywords:
  - GitHub
  - workflows
  - yml
lang: id
location: Indonesia
subtitle: Macam-macam kondisional pada GitHub Workflows
tags:
  - GitHub
title: GitHub Workflow Conditions
type: post
uuid: f4c6a18d-2377-4888-8330-9223d5f34263
webtitle: WMI GitHub
updated: 2021-11-30T20:10:25+07:00
thumbnail: /GitHub/workflows/cover.png
photos:
  - /GitHub/workflows/cover.png
description: Macam-macam kondisional pada GitHub Workflows
excerpt: Macam-macam kondisional pada GitHub Workflows
wordcount: 216
---

<h1 id="kondisional-pada-git-hub-workflow" tabindex="-1"><a class="header-anchor" href="#kondisional-pada-git-hub-workflow">Kondisional pada GitHub Workflow</a></h1>
<p>Kondisional-kondisional yang ada di Github Workflow. Kondisional ini berguna untuk memicu job step dengan kasus-kasus tertentu. <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vZW4vYWN0aW9ucy9sZWFybi1naXRodWItYWN0aW9ucy9leHByZXNzaW9ucw==" target="_blank" rel="nofollow noopener">source</a> Misalnya:</p>
<h2 id="menjalankan-command-apabila-repository-di-push-dengan-commit-yang-memiliki-substring-tertentu-match-substring-from-github-commit-messages" tabindex="-1"><a class="header-anchor" href="#menjalankan-command-apabila-repository-di-push-dengan-commit-yang-memiliki-substring-tertentu-match-substring-from-github-commit-messages">Menjalankan command apabila repository di push dengan commit yang memiliki substring tertentu (match substring from github commit messages)</a></h2>
<pre><code class="language-yaml">jobs:
  build:
    name: Nama Workflow
    runs-on: ubuntu-latest
    steps:
      - run: echo &quot;git commit contains hello&quot; # run this command if commit contains hello
        if: contains(github.event.head_commit.message, 'hello')
      - run: echo &quot;git commit any&quot;
</code></pre>
<p>selain <code>contains</code> untuk mencari sebuah substring pada string. Adapun fungsi’’ lain seperti:</p>
<ul>
<li><code>startsWith</code> untuk memeriksa apakah string memiliki <strong>awalan</strong> tertentu (penggunaannya sama seperti contoh kode diatas)</li>
<li><code>endsWith</code> untuk memeriksa apakah string memiliki <strong>akhiran</strong> tertentu (penggunaannya sama seperti contoh kode diatas)</li>
</ul>
<h2 id="melanjutkan-steps-meskipun-command-gagal-continue-on-error" tabindex="-1"><a class="header-anchor" href="#melanjutkan-steps-meskipun-command-gagal-continue-on-error">Melanjutkan steps meskipun command gagal (continue on error)</a></h2>
<pre><code class="language-yaml">jobs:
  build:
    name: Nama Workflow
    runs-on: ubuntu-latest
    steps:
      - run: this_command_is_not_found xxxxx # ini akan membuat workflow berhenti
        continue-on-error: true # namun dengan ini tidak akan membuat workflow berhenti
        id: custom-id # membuat id khusus (opsional)
      - run: echo &quot;git commit any&quot;
</code></pre>
<p>Artikel ini untuk mempermudah visitor untuk memahami github workflow.</p>
