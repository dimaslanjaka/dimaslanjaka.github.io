---
ads: false
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
category:
  - Programming
  - Regular Expression
comments: false
cover: https://www.w3programmers.com/wp-content/uploads/2012/07/regex.jpg
date: 2021-09-22T00:00:00+07:00
lang: en
location: Indonesia
subtitle: Regular Expression is a
tags:
  - RegExp
title: What is RegExp
type: post
uuid: 4cd70405-503d-4888-85a2-55b39642d633
webtitle: RegExp
updated: 2021-12-19T06:34:45+07:00
thumbnail: https://www.w3programmers.com/wp-content/uploads/2012/07/regex.jpg
photos:
  - https://www.w3programmers.com/wp-content/uploads/2012/07/regex.jpg
description: Regular Expression is a
excerpt: Regular Expression is a
wordcount: 1124
---

<!--https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285-->

## What Is Regular Expression ?
Regular Expression (RegExp) a sequence of symbols and characters expressing a string or pattern to be searched for within a longer piece of text. [Read More](https://en.wikipedia.org/wiki/Regular_expression)

## What can a regular expression be used for ?
A regular expression can be a single character, or a more complicated pattern. Regular expressions can be used to perform all types of text search and text replace operations. /w3schools/i is a regular expression.

## Which is the best example of a regex ?
- **Anchors — ^ and $**
  | RegExp                      | Explanations                                                                                   |
  | --------------------------- | ---------------------------------------------------------------------------------------------- |
  | <b>^</b>Hello               | matches any string that _starts with **Hello**_ ->  [Try it!](https://regex101.com/r/cO8lqs/2) |
  | world<b>$</b>               | matches a string that _ends with **world**_                                                    |
  | <b>^</b>Hello world<b>$</b> | _exact string match_ (starts and ends with **Hello world**)                                    |
  | Hello                       | _matches any string_ that has the text **Hello** in it                                         |

- **Quantifiers — * + ? and {}**
  | RegExp              | Explanations                                                                                           |
  | ------------------- | ------------------------------------------------------------------------------------------------------ |
  | abc*                | matches a string that has ab followed by zero or more c ->  [Try it!](https://regex101.com/r/cO8lqs/1) |
  | abc+                | matches a string that has ab followed by one or more                                                   |
  | abc<b>?</b>         | matches a string that has ab followed by zero or one                                                   |
  | abc<b>{2}</b>       | matches a string that has ab followed by 2                                                             |
  | abc<b>{2,}</b>      | matches a string that has ab followed by 2 or more                                                     |
  | abc<b>{2,5}</b>     | matches a string that has ab followed by 2 up to 5                                                     |
  | ca<b>(bc)*</b>      | matches a string that has a followed by zero or more copies of the sequence                            |
  | bca<b>(bc){2,5}</b> | matches a string that has a followed by 2 up to 5 copies of the sequence bc                            |

- **OR operator — | or []**
  | RegExp      | Explanations                                                                                                                         |
  | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
  | a(b&#x7c;c) | matches a string that has **_a_ followed by _b_ or _c_** (and captures **_b_ or _c_**) -> [Try it!](https://regex101.com/r/cO8lqs/3) |
  | a[bc]       | same as previous, **but without capturing _b_ or _c_**                                                                               |

- **Character classes — \d \w \s and .**
  | RegExp | Explanations |
  | ------ | ------------ |

