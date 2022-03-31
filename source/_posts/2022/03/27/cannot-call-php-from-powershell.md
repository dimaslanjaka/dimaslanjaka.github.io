---
categories:
  - Programming
cover: https://res.cloudinary.com/practicaldev/image/fetch/https://windowstect.com/wp-content/uploads/2021/05/image-80.png
date: 2022-03-27T01:30:00+0700
subtitle: fix php environtment path for powershell
tags:
  - Powershell
title: Cannot run php on powershell
updated: 2022-03-27T01:30:00+0700
uuid: f1fe35f4-632d-4888-8be4-d86b8a41eb8f
category:
  - Uncategorized
excerpt: fix php environtment path for powershell
description: fix php environtment path for powershell
lang: en
thumbnail: https://res.cloudinary.com/practicaldev/image/fetch/https://windowstect.com/wp-content/uploads/2021/05/image-80.png
photos:
  - https://res.cloudinary.com/practicaldev/image/fetch/https://windowstect.com/wp-content/uploads/2021/05/image-80.png
wordcount: 454
---

<h2 id="powershell" tabindex="-1"><a class="header-anchor" href="#powershell">Powershell</a></h2>
<p>Powershell is alternative for default terminal windows.</p>
<h2 id="powershell-problem-lists-with-php" tabindex="-1"><a class="header-anchor" href="#powershell-problem-lists-with-php">Powershell problem lists with php</a></h2>
<ul>
<li>cannot call php from powershell</li>
<li>php : The term ‘php’ is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the
name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1</li>
</ul>
<h2 id="fix-solution" tabindex="-1"><a class="header-anchor" href="#fix-solution">Fix solution</a></h2>
<ul>
<li>Open directory of your <code>php.exe</code> for example mine is <code>D:\xampp\php\php.exe</code>.
<img src="https://user-images.githubusercontent.com/12471057/160263043-e813f6e5-9ab3-4b6d-816b-8228e1928f07.png" alt="Environtment Variables Windows"></li>
<li>Create new file called <code>php.ps1</code> and paste below codes:</li>
</ul>
<pre><code class="language-powershell">#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent
echo $basedir

$exe=&quot;&quot;
if ($PSVersionTable.PSVersion -lt &quot;6.0&quot; -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=&quot;.exe&quot;
}
$ret=0
if (Test-Path &quot;$basedir/php$exe&quot;) {
  &amp; &quot;$basedir\php$exe&quot; $args
  $ret=$LASTEXITCODE
} else {
  &amp; &quot;php$exe&quot; $args
  $ret=$LASTEXITCODE
}
exit $ret
</code></pre>
<ul>
<li>Create new file called <code>php.cmd</code> and paste below codes:</li>
</ul>
<pre><code class="language-cmd">:: custom php binary
@ECHO OFF

SETLOCAL

SET &quot;PHP_EXE=%~dp0\php.exe&quot;

&quot;%PHP_EXE%&quot; %*
</code></pre>
<h3 id="now-fix-problem-of-power-shell-says-execution-of-scripts-is-disabled-on-this-system" tabindex="-1"><a class="header-anchor" href="#now-fix-problem-of-power-shell-says-execution-of-scripts-is-disabled-on-this-system">now fix problem of <strong>PowerShell says “execution of scripts is disabled on this system.”</strong></a></h3>
<ul>
<li>Open powershell terminal</li>
<li>type below codes to list <strong>Current Execution Policy</strong></li>
</ul>
<pre><code class="language-powershell">Get-ExecutionPolicy
</code></pre>
<blockquote>
<p>Result: The execution policy is printed with its name like <em>Restricted</em>. then continue the step</p>
</blockquote>
<ul>
<li>type below codes to <strong>Change Execution Policy to Unrestricted For The Current User</strong></li>
</ul>
<pre><code class="language-powershell">Set-ExecutionPolicy -Scope User Unrestricted
</code></pre>
<h4 id="change-execution-policy-to-unrestricted-for-all-users" tabindex="-1"><a class="header-anchor" href="#change-execution-policy-to-unrestricted-for-all-users">Change Execution Policy to Unrestricted For All Users</a></h4>
<p>The execution policy can be change to the Unrestricted for all users in the system. In order to accomplish this the PowerShell terminal should be opened with the Local Administrator or Domain Administrator privileges. This is explained in the following posts.</p>
<h3 id="youtube-video-tutorial-fix-running-scripts-is-disabled-on-this-system" tabindex="-1"><a class="header-anchor" href="#youtube-video-tutorial-fix-running-scripts-is-disabled-on-this-system">Youtube video tutorial - fix running scripts is disabled on this system</a></h3>
<p></p>
<p><strong>incoming terms (problem lists fixable with this article):</strong></p>
<ul>
<li>PowerShell “Running script is disabled on this system” Error and Solution</li>
<li>PowerShell - Running scripts is disabled on this system</li>
<li>php.cmd</li>
<li>php.ps1</li>
</ul>
