---
title: Cannot run php on powershell
subtitle: fix php environtment path for powershell
date: 2022-03-27T01:30:00+0700
updated: 2022-03-27T01:30:00+0700
cover: https://res.cloudinary.com/practicaldev/image/fetch/https://windowstect.com/wp-content/uploads/2021/05/image-80.png
tags:
  - Powershell
categories:
  - Programming
---

## Powershell
Powershell is alternative for default terminal windows.

## Powershell problem lists with php
- cannot call php from powershell
- php : The term 'php' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the
name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1

## Fix solution
- Open directory of your `php.exe` for example mine is `D:\xampp\php\php.exe`.
![Environtment Variables Windows](https://user-images.githubusercontent.com/12471057/160263043-e813f6e5-9ab3-4b6d-816b-8228e1928f07.png)
- Create new file called `php.ps1` and paste below codes:
```powershell
#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent
echo $basedir

$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
$ret=0
if (Test-Path "$basedir/php$exe") {
  & "$basedir\php$exe" $args
  $ret=$LASTEXITCODE
} else {
  & "php$exe" $args
  $ret=$LASTEXITCODE
}
exit $ret
```
- Create new file called `php.cmd` and paste below codes:
```cmd
:: custom php binary
@ECHO OFF

SETLOCAL

SET "PHP_EXE=%~dp0\php.exe"

"%PHP_EXE%" %*
```
### now fix problem of **PowerShell says "execution of scripts is disabled on this system."**
- Open powershell terminal
- type below codes to list **Current Execution Policy**
```powershell
Get-ExecutionPolicy
```
> Result: The execution policy is printed with its name like _Restricted_. then continue the step
- type below codes to **Change Execution Policy to Unrestricted For The Current User**
```powershell
Set-ExecutionPolicy -Scope User Unrestricted
```

#### Change Execution Policy to Unrestricted For All Users
The execution policy can be change to the Unrestricted for all users in the system. In order to accomplish this the PowerShell terminal should be opened with the Local Administrator or Domain Administrator privileges. This is explained in the following posts.

### Youtube video tutorial - fix running scripts is disabled on this system

{% youtube F-fWwkG5Xrk %}

**incoming terms (problem lists fixable with this article):**
- PowerShell “Running script is disabled on this system” Error and Solution
- PowerShell - Running scripts is disabled on this system
- php.cmd
- php.ps1
