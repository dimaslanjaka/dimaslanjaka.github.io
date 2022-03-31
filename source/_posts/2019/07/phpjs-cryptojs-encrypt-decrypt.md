---
author:
  nick: Dimas Lanjaka Kumala Indra
  link: https://www.blogger.com/profile/17555754514989936273
  email: noreply@blogger.com
category:
  - Programming
  - PHP
comments: true
cover: https://raw.githubusercontent.com/dimaslanjaka/dimaslanjaka.github.io/master/assets/img/phpjs.png
date: 2019-07-22T00:16:00.001+07:00
lang: en
location: ""
modified: 2020-01-22T19:08:55.026+07:00
subtitle: CryptoJS encrypt decrypt support PHP , PHP 7.x. See the Pen PHP
  CryptoJS Encrypt Decrypt by dimas
tags:
  - JS
  - PHP
title: "[PHP][JS] CryptoJS encrypt decrypt"
type: post
uuid: 83ca465d-648e-4888-875f-4bb6f2810c96
webtitle: WMI Gitlab
updated: 2020-01-22T19:08:55+07:00
thumbnail: https://raw.githubusercontent.com/dimaslanjaka/dimaslanjaka.github.io/master/assets/img/phpjs.png
photos:
  - https://raw.githubusercontent.com/dimaslanjaka/dimaslanjaka.github.io/master/assets/img/phpjs.png
description: CryptoJS encrypt decrypt support PHP , PHP 7.x. See the Pen PHP
  CryptoJS Encrypt Decrypt by dimas
excerpt: CryptoJS encrypt decrypt support PHP , PHP 7.x. See the Pen PHP
  CryptoJS Encrypt Decrypt by dimas
wordcount: 508
---

<div dir="ltr" style="text-align: left;" trbidi="on">  <div>    <img src="https://raw.githubusercontent.com/dimaslanjaka/dimaslanjaka.github.io/master/assets/img/phpjs.png" width="100%" itemprop="image">    &nbsp;CryptoJS encrypt decrypt support PHP 5, PHP 7.x.     <div class="m-3">      <p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="dimaslanjaka" data-slug-hash="oKXmGr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="PHP CryptoJS Encrypt Decrypt">        <span>See the Pen <a href="https://codepen.io/dimaslanjaka/pen/oKXmGr/" rel="noopener noreferer nofollow">            PHP CryptoJS Encrypt Decrypt</a> by dimas lanjaka (<a href="https://codepen.io/dimaslanjaka" rel="noopener noreferer nofollow">@dimaslanjaka</a>)           on <a href="https://codepen.io" rel="noopener noreferer nofollow">CodePen</a>.</span>      </p>      <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>    </div>    <br>  </div>  <h4>Code PHP and details variable</h4>  <h5>[JS]</h5>  <pre><code><br>    /**<br>    * @package https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js<br>    */<br>   var salt = 'salt'; //salt<br>   var iv = '1111111111111111'; //pass salt minimum length 12 chars<br>   var iterations = '999'; //iterations<br><br>   /**<br>    * Get key<br>    * @param string passphrase<br>    * @param string salt<br>    */<br>   function getKey(passphrase, salt) {<br>     var key = CryptoJS.PBKDF2(passphrase, salt, {<br>       hasher: CryptoJS.algo.SHA256,<br>       keySize: 64 / 8,<br>       iterations: iterations<br>     });<br>     return key;<br>   }<br>   /**<br>    * Encrypt function<br>    * @param string passphrase<br>    * @param string plainText<br>    */<br>   function userJSEncrypt(passphrase, plainText) {<br>     var key = getKey(passphrase, salt);<br>     var encrypted = CryptoJS.AES.encrypt(plainText, key, {<br>       iv: CryptoJS.enc.Utf8.parse(iv)<br>     });<br>     return encrypted.ciphertext.toString(CryptoJS.enc.Base64);<br>   }<br>   /**<br>    * Decrypt function<br>    * @param string passphrase<br>    * @param string encryptedText<br>    */<br>   function userJSDecrypt(passphrase, encryptedText) {<br>     var key = getKey(passphrase, salt);<br>     var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {<br>       iv: CryptoJS.enc.Utf8.parse(iv)<br>     });<br>     return decrypted.toString(CryptoJS.enc.Utf8);<br>   }<br></code></pre>  <h5>[PHP 5.6++]</h5>  <pre><code><br>&lt;?php<br>const SALT = 'salt'; //salt<br>const IV = '1111111111111111'; //pass salt minimum length 12 chars or it'll be show warning messages<br>const ITERATIONS = 999; //iterations<br>function userPHPEncrypt($passphrase, $plainText)<br>{<br>  $key = \hash_pbkdf2("sha256", $passphrase, SALT, ITERATIONS, 64);<br>  $encryptedData = \openssl_encrypt($plainText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);<br>  return \base64_encode($encryptedData);<br>}<br>function userPHPDecrypt($passphrase, $encryptedTextBase64)<br>{<br>  $encryptedText = \base64_decode($encryptedTextBase64);<br>  $key = \hash_pbkdf2("sha256", $passphrase, SALT, ITERATIONS, 64);<br>  $decryptedText = \openssl_decrypt($encryptedText, 'AES-256-CBC', \hex2bin($key), OPENSSL_RAW_DATA, IV);<br>  return $decryptedText;<br>}<br></code></pre>   <blockquote class="alert alert-info">    <h5>Fix Problems</h5>    <a href="https://blog.akarmas.com/2019/07/fix-openssl-encrypt-decrypt-php.html" rel="noopener noreferer nofollow">How to fix openssl_encrypt() and       openssl_decrypt() errors</a>  </blockquote></div>