/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-global-assign */
/* global adsbygoogle */

document.addEventListener('DOMContentLoaded', function (_e) {
  const allAds = [
    {
      pub: '2974518380815858',
      ads: [
        {
          style: 'display: block; text-align: center',
          'data-ad-layout': 'in-article',
          'data-ad-format': 'fluid',
          'data-ad-slot': '2192856090'
        }
      ]
    },
    {
      pub: '0168582118085122',
      ads: [
        {
          style: 'display:block',
          'data-ad-slot': '7354749098',
          'data-ad-forma': 'auto',
          'data-full-width-responsive': 'true'
        }
      ]
    },
    {
      pub: '2188063137129806',
      ads: [
        {
          style: 'display: block; text-align: center',
          'data-ad-layout': 'in-article',
          'data-ad-format': 'fluid',
          'data-ad-slot': '5634823028'
        }
      ]
    }
  ].sort(function () {
    return 0.5 - Math.random();
  });

  // select ads
  const ck = 'currentAds';
  const ca = getCookie(ck);
  let ads;
  if (ca.length > 0) {
    ads = allAds.find((item) => item.pub === ca);
    // console.log('using cached pub', ca);
  } else {
    ads = allAds[0];
    // console.log('caching pub', ads.pub);
    setCookie(
      ck,
      ads.pub,
      1,
      location.pathname,
      location.hostname,
      location.protocol.includes('https')
    );
  }

  // create pagead
  const script = document.createElement('script');
  script.src = `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${ads.pub}`;
  script.async = true;
  script.setAttribute('crossorigin', 'anonymous');
  document.head.appendChild(script);

  // select random place
  const article = document.querySelector('article') || document;
  const adsPlaces = Array.from(
    article.querySelectorAll('h1,h2,h3,h4,h5,pre')
  ).sort(function () {
    return 0.5 - Math.random();
  });

  ads.ads.forEach((attr) => {
    const ins = createIns(attr);
    insertAfter(ins, adsPlaces.shift());
  });

  const allIns = Array.from(document.querySelectorAll('ins'));
  //console.log('total ads', allIns.length);
  for (let i = 0; i < allIns.length; i++) {
    //console.log('apply ad', i);
    const ins = allIns[i];
    if (ins.innerHTML.trim() == '') {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  }
});

/**
 * create ins
 * @param {Record<string,any>} attributes
 * @returns
 */
function createIns(attributes) {
  const ins = document.createElement('ins');
  Object.keys(attributes).forEach((key) => {
    ins.setAttribute(key, attributes[key]);
  });
  if (!ins.classList.contains('adsbygoogle')) ins.classList.add('adsbygoogle');
  return ins;
}

/**
 * insert next other
 * @param {HTMLElement} newNode
 * @param {HTMLElement} referenceNode
 */
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function setCookie(name, value, expires, path, domain, secure) {
  let exp = '';
  if (expires) {
    const d = new Date();
    d.setTime(d.getTime() + parseInt(expires) * 24 * 60 * 60 * 1000); // days
    exp = '; expires=' + d.toGMTString(); // toGMTString | toUTCString
  }
  if (!path) {
    path = '/';
  }
  const cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    exp +
    '; path=' +
    path +
    (domain ? '; domain=' + domain : '') +
    (secure ? '; secure' : '');
  console.log(cookie);
  document.cookie = cookie;
}

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
