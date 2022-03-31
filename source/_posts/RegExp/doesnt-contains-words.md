---
cover: https://res.cloudinary.com/practicaldev/image/fetch/https://images.ctfassets.net/f20lfrunubsq/3VjnlRLGZqdWhDPENCTGQl/ab3c078638607cf2a3d35f4b0cf10fa1/Screenshot_2019-11-03_at_16.57.11__2_.png
date: 2022-03-30T06:43:38+0000
title: RegExp Match Doesnt Contain Words
updated: 2022-03-30T06:43:38+0000
uuid: 838eebf3-a7ed-4888-884d-2b361639e7c9
category:
  - Uncategorized
tags: []
lang: en
description: RegExp Match Doesnt Contain Words
subtitle: RegExp Match Doesnt Contain Words
excerpt: RegExp Match Doesnt Contain Words
thumbnail: https://res.cloudinary.com/practicaldev/image/fetch/https://images.ctfassets.net/f20lfrunubsq/3VjnlRLGZqdWhDPENCTGQl/ab3c078638607cf2a3d35f4b0cf10fa1/Screenshot_2019-11-03_at_16.57.11__2_.png
photos:
  - https://res.cloudinary.com/practicaldev/image/fetch/https://images.ctfassets.net/f20lfrunubsq/3VjnlRLGZqdWhDPENCTGQl/ab3c078638607cf2a3d35f4b0cf10fa1/Screenshot_2019-11-03_at_16.57.11__2_.png
wordcount: 823
---

## RegEx to tell if a string does not contain a specific character
Are you trying to test whether or not a string does not contain a character using regular expressions ?
Are you trying:
- Use Regex to enable the widest range of validations, and
- Always look for a positive match (i.e. instead of using !Regex.IsMatch(cell, regexvariable), I wanted to rely on always being able to use Regex.IsMatch(cell, regexvariable) since the majority of DataTables invoking this method will be using the positive match instead of the negative.

## Solution
I came across this question looking for the same thing but for JavaScript. The expression above did not work in my case, but I came across the below expression which did:

### RegExp
```reg
^((?!0).)*$
```

### RegExp Explanation
>
> - Match whole strings except `0` (zero)

## Other example
i want to find and match a `string` from all `local javascript file import statement` without `.js` extension:

### RegExp
```regexp
^import.*\/((?!.js).)*([\'\"]);$
```
#### RegExp Modern Approach
```regexp
^import.*\/((?!.js).)*(['"]);$
```

### String to match
```js
import notranslate from '../translator/notranslate.js';
import notranslate from '../translator/notranslate'; // <-- i want match this
```

![https://pasteboard.co/bdtnVlEUocwy.png](https://gcdnb.pbrd.co/images/bdtnVlEUocwy.png?o=1)

### RegExp Explanation
- `^` asserts position at start of a line
- `import` matches the characters import literally (case sensitive)
- `((?!.js).)*` 1st Capturing Group
- - `*` matches the previous token between zero and unlimited times, as many times as possible, giving back as needed (greedy)
  > A repeated capturing group will only capture the last iteration. Put a capturing group around the repeated group to capture all iterations or use a non-capturing group instead if you're not interested in the data
- - `/` matches the character `/` with literally (case sensitive)
- `(?!.js)` Negative Lookahead
  > Assert that the Regex below does not match
- - `.` matches any character (except for line terminators)
- - `js` matches the characters js literally (case sensitive)
- `.` matches any character (except for line terminators)
- `([\'\"])` 2nd Capturing Group
- - `[\'\"]` Match a single character present in the list below
- - `\'` matches the character `'` with literally (case sensitive)
- - `\"` matches the character `"` with literally (case sensitive)
- `;` matches the character `;` with literally (case sensitive)
- `$` asserts position at the end of a line

Global pattern flags
- `g` modifier: **g**lobal. All matches (don't return after first match)
- `m` modifier: **m**ulti line. Causes `^` and `$` to match the begin/end of each line (not only begin/end of string)

## RegExp Online Playground
[RegExp Playground **regex101**](https://regex101.com/r/tp1eQZ)