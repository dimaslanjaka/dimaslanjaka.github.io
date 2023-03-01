/* eslint-disable @typescript-eslint/no-unused-vars */

class adblock {
  scriptMethod() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'adblock-script-test';
      script.async = !0;
      script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.onerror = function () {
        window.adblock = !0;
        console.log('adblock enabled');
        document.querySelector('#adblock-script-test').remove();
        reject(new Error('adblock enabled'));
      };
      script.onload = function () {
        console.log('adblock disabled');
        document.querySelector('#adblock-script-test').remove();
        resolve(null);
      };
      var firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    });
  }
  ajaxMethod() {
    return new Promise((resolve, reject) => {
      fetch('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
        .then((response) => response.text())
        .then((_response) => {
          console.log('adblock disabled');
          resolve(null);
        })
        .catch(() => {
          console.log('adblock enabled');
          reject(new Error('adblock enabled'));
        });
    });
  }
}
