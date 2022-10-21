/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-global-assign */
/* global adsbygoogle */

document.addEventListener('DOMContentLoaded', function (_e) {
  const banned = [/lagu|jackpot|montok|hack|crack|nulled/gi];
  if (
    banned
      .map((regex) => regex.test(document.title))
      .some((result) => result == true)
  ) {
    // skip showing ads from banned page
    return;
  }

  /** FUNC START */

  const log =
    location.port.length > 0
      ? console.log
      : function (..._args) {
          //
        };

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
    if (!ins.classList.contains('adsbygoogle')) {
      ins.classList.add('adsbygoogle');
    }
    return ins;
  }

  /**
   * insert next other
   * @param {HTMLElement} newNode
   * @param {HTMLElement} referenceNode insert after this element
   */
  function insertAfter(newNode, referenceNode) {
    if (referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }

  /**
   * Create detailed cookie
   * @param {string} name
   * @param {string} value
   * @param {number} expires
   * @param {string} path
   * @param {string} domain
   * @param {boolean} secure
   */
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
    log(cookie);
    document.cookie = cookie;
  }

  /**
   * get cookie by name
   * @param {string} cname
   * @returns
   */
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

  /**
   * Replace elements with new
   * @param {HTMLElement} newElement
   * @param {HTMLElement} oldElement
   */
  function replaceWith(newElement, oldElement) {
    if (!oldElement.parentNode) {
      log(oldElement, 'parent null');
      let d = document.createElement('div');
      d.appendChild(oldElement);
    } else {
      //log(oldElement.parentNode.tagName);
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }
  }

  /** FUNC END */

  const allAds = [
    /*{
      name: 'rah bagus',
      pub: '2974518380815858',
      ads: [
        {
          style: 'display: block; text-align: center',
          'data-ad-layout': 'in-article',
          'data-ad-format': 'fluid',
          'data-ad-slot': '2192856090'
        }
      ]
    },*/
    {
      name: 'purwanto',
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
      name: 'kiki',
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
    // shuffle
    return 0.5 - Math.random();
  });

  // select ads
  const ck = 'currentAds';
  const ca = getCookie(ck);
  /**
   * @type {typeof allAds[number]}
   */
  let ads = allAds.find((item) => item.pub === ca);
  if (ca.length > 0 && typeof ads === 'object') {
    log('cached pub', ca);
  } else {
    ads = allAds[0];

    if (location.pathname != '/') {
      log('caching pub', ads.pub);
      setCookie(
        ck,
        ads.pub,
        1,
        location.pathname,
        location.hostname,
        location.protocol.includes('https') &&
          location.host === 'www.webmanajemen.com'
      );
    }
  }

  // create pagead
  const script = document.createElement('script');
  script.src = `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${ads.pub}`;
  script.async = true;
  script.setAttribute('crossorigin', 'anonymous');
  document.head.appendChild(script);

  // select random place
  let adsPlaces = [];
  const articles = Array.from(document.querySelectorAll('article'))
    .map(getAllPlaces)
    .flat(1);
  adsPlaces = adsPlaces.concat(articles);

  /**
   * get all ads places
   * @param {Element|Document} from
   */
  function getAllPlaces(from) {
    return Array.from(from.querySelectorAll('h1,h2,h3,h4,h5,pre,header,hr,br'))
      .sort(function () {
        return 0.5 - Math.random();
      })
      .filter((el) => el !== null);
  }

  ads.ads.forEach((attr) => {
    const ins = createIns(attr);
    let nextOf = adsPlaces.shift();
    while (!nextOf) {
      if (adsPlaces.length > 0) {
        // select next place
        nextOf = adsPlaces.shift();
      } else {
        // if ads places empty, put to any div
        nextOf = document.querySelector('div');
      }
    }
    insertAfter(ins, nextOf);
  });

  const allIns = Array.from(document.querySelectorAll('ins'));
  //log('total ads', allIns.length);
  for (let i = 0; i < allIns.length; i++) {
    //log('apply ad', i);
    const ins = allIns[i];
    if (ins.innerHTML.trim() == '') {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  }
});
