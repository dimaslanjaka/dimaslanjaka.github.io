---
author:
  nick: Kuswati
  link: https://www.blogger.com/profile/09256263851708439294
  email: noreply@blogger.com
category:
  - Uncategorized
comments: true
cover: https://1.bp.blogspot.com/-Tos8rqKMyGA/XmNfZ846naI/AAAAAAAAAAM/PjoZBLK56IMCbfHmazdWHifnYzigxC7hgCLcBGAsYHQ/s320/gradle.png
date: 2020-03-07T15:48:00.001+07:00
lang: en
location: ""
modified: 2020-03-13T17:12:44.914+07:00
subtitle: Build Gradle Component Definitions
tags:
  - Android
title: Build Gradle Component Definitions
type: post
uuid: 00aeca0f-7cf8-4888-81ea-5fd3dccd18cf
webtitle: WMI Gitlab
updated: 2020-03-13T17:12:44+07:00
thumbnail: https://1.bp.blogspot.com/-Tos8rqKMyGA/XmNfZ846naI/AAAAAAAAAAM/PjoZBLK56IMCbfHmazdWHifnYzigxC7hgCLcBGAsYHQ/s320/gradle.png
photos:
  - https://1.bp.blogspot.com/-Tos8rqKMyGA/XmNfZ846naI/AAAAAAAAAAM/PjoZBLK56IMCbfHmazdWHifnYzigxC7hgCLcBGAsYHQ/s320/gradle.png
description: Build Gradle Component Definitions
excerpt: Build Gradle Component Definitions
wordcount: 267
---

<div class="separator" style="clear: both; text-align: center;"><a href="https://1.bp.blogspot.com/-Tos8rqKMyGA/XmNfZ846naI/AAAAAAAAAAM/PjoZBLK56IMCbfHmazdWHifnYzigxC7hgCLcBGAsYHQ/s1600/gradle.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" rel="noopener noreferer nofollow"><img border="0" data-original-height="177" data-original-width="813" height="69" src="https://1.bp.blogspot.com/-Tos8rqKMyGA/XmNfZ846naI/AAAAAAAAAAM/PjoZBLK56IMCbfHmazdWHifnYzigxC7hgCLcBGAsYHQ/s320/gradle.png" width="320"></a></div> <center><h5>Common Gradle Command Prompt</h5></center><table class="tb" style="margin:2px">    <thead>        <tr>            <th>                Command             </th>            <th>                Description             </th>        </tr>    </thead>    <tbody>        <tr>            <td>                <p>                    <code>./gradlew build</code>                </p>            </td>            <td>                <p>                    build project, runs both the assemble and check task                 </p>            </td>        </tr>        <tr>            <td>                <p>                    <code>./gradlew clean build</code>                </p>            </td>            <td>                <p>                    build project complete from scratch                 </p>            </td>        </tr>        <tr>            <td>                <p>                    <code>./gradlew clean build</code>                </p>            </td>            <td>                <p>                    build project complete from scratch                 </p>            </td>        </tr>        <tr>            <td>                <p>                    <code>./gradlew test</code>                </p>            </td>            <td>                <p>                    Run the tests                 </p>            </td>        </tr>        <tr>            <td>                <p>                    <code>./gradlew connectedAndroidTest</code>                </p>            </td>            <td>                <p>                    Run the instrumentation tests                 </p>            </td>        </tr>    </tbody></table><br><center>Change JAVA_HOME from gradle properties</center><pre><br>org.gradle.java.home=C:/Program Files/Java/jdk1.6.0_45<br>org.gradle.jvmargs =-XX:MaxPermSize=64m<br></pre><br><center><h5>Common Build Gradle Usage Functions</h5></center><pre><br>minifyEnabled true<br>/*<br>false: keeps unused methods instead of removing them<br>true: remove unused methods<br>*/<br></pre><style>table.tb {   border: 1px solid #ccc;   border-collapse: collapse;   margin: 0;   padding: 0;   width: 100%;   table-layout: fixed; }  table caption {   font-size: 1.5em;   margin: .5em 0 .75em; }  table.tb tr {   background-color: #f8f8f8;   border: 1px solid #ddd;   padding: .35em; }  table.tb th, table.tb td {   padding: .625em;   text-align: center; }  table.tb th {   font-size: .85em;   letter-spacing: .1em;   text-transform: uppercase; }  @media screen and (max-width: 600px) {   table.tb {     border: 0;   }    table.tb caption {     font-size: 1.3em;   }      table.tb thead {     border: none;     clip: rect(0 0 0 0);     height: 1px;     margin: -1px;     overflow: hidden;     padding: 0;     position: absolute;     width: 1px;   }      table.tb tr {     border-bottom: 3px solid #ddd;     display: block;     margin-bottom: .625em;   }      table.tb td {     border-bottom: 1px solid #ddd;     display: block;     font-size: .8em;     text-align: right;   }      table.tb td::before {     /*     * aria-label has no advantage, it won't be read inside a table     content: attr(aria-label);     */     content: attr(data-label);     float: left;     font-weight: bold;     text-transform: uppercase;   }      table.tb td:last-child {     border-bottom: 0;   } } </style>