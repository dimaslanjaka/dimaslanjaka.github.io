---
author:
  nick: Kuswati
  link: https://www.blogger.com/profile/09256263851708439294
  email: noreply@blogger.com
category:
  - Programming
  - JS
comments: true
cover: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://miro.medium.com/max/940/1*MfrpVoJuWJz8vyXVJDHUvA.png
date: 2020-10-28T14:00:00.004+07:00
lang: en
location: ""
modified: 2021-05-14T04:54:22.686+07:00
subtitle: Typescript lebih strict lebih detail dan harus mematuhi peraturan
  seperti typedata variable, class, interface, dll, hampir sama seperti
tags:
  - TS
  - JS
  - Tips & Tricks
title: Perbedaan typescript dan javascript secara rinci
type: post
uuid: 357dabaa-3b5a-4888-8631-67cb73c97af5
webtitle: WMI Gitlab
updated: 2021-05-14T04:54:22+07:00
thumbnail: https://res.cloudinary.com/dimaslanjaka/image/fetch/https://miro.medium.com/max/940/1*MfrpVoJuWJz8vyXVJDHUvA.png
photos:
  - https://res.cloudinary.com/dimaslanjaka/image/fetch/https://miro.medium.com/max/940/1*MfrpVoJuWJz8vyXVJDHUvA.png
description: Typescript lebih strict lebih detail dan harus mematuhi peraturan
  seperti typedata variable, class, interface, dll, hampir sama seperti
excerpt: Typescript lebih strict lebih detail dan harus mematuhi peraturan
  seperti typedata variable, class, interface, dll, hampir sama seperti
wordcount: 245
---

<h2>Typescript atau Javascript?</h2><img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://miro.medium.com/max/940/1*MfrpVoJuWJz8vyXVJDHUvA.png" alt="Typescript vs Javascript"> <h2>Apa saja perbedaan typescript dan javascript?</h2><h4>Secara Harfiah:</h4><p>Typescript lebih strict / lebih detail dan harus mematuhi peraturan seperti typedata (variable, class, interface, dll), hampir sama seperti KOTLIN untuk segi peraturan. Javascript itu bebas, tidak akan memberikan error jika kode / variable / syntax diatasnya sudah dideklarasikan terkecuali class dan interface, javascript pun tidak memperdulikan mau type macam apa di variable yang penting logic yg ditentukan itu sama atau akan dikembalikan ke bentuk 'undefined'.</p> <h4>Compiler:</h4><p>Javascript tidak membutuhkan compiler untuk menjalankannya. Sedangkan typescript membutuhkan compiler sebelum di run. Compatibility: Typescript bisa menciptakan javascript dalam macam-macam type browser hanya dengan 1x tulis kode. Javascript tidak dapat membuat semua syntax nya compatible dengan semua browser jika tidak menentukan Condition yang tepat.</p> <h4>Invertible:</h4><p>Typescript dapat melakukan apa yg dilakukan javascript, namun javascript tidak dapat melakukan apa yang dilakukan typescript tanpa di translate dahulu ke syntax rules typescript.</p> <h4>TypeHINTing:</h4><p>Javascript tidak akan memberikan syntax hint dengan type variable/argument/class/interface yang lengkap tanpa menggunakan d.ts (description typescript). Namun, typescript dapat melakukan semuanya jika masih dalam 1 workspace.</p> <h4>Configuration :</h4><p>Javascript tidak membutuhkan configuration tertentu untuk menjalankannya, sedangkan typescript membutuhkan configuration (tsconfig.json) untuk compiler runtime rules dan workflow terhadap typescript files, seperti linter, argument silent, force, Autoprefixer, dan lain-lain.</p> <h4>Throwback:</h4><p>Javascript akan memberikan throwback jika kondisi darurat saja, misal variable tidak di deklarasikan, class tidak ada, dll. Typescript sebelum dijalankan saja harus ada lengkap semua dokumenter, description files (d.ts), typedata, penyebut, pembilang, package, modules jika tidak akan di throwback sebelum di compile (belum aja dijalankan, masih tahap compile aja di throw 🤣)</p>