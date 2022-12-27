/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-global-assign */
/* global adsbygoogle gtag */

/** scroll to hash */
const hash = window.location.hash.substring(1).replace(/[=]/gi, '');
if (hash.length > 0) {
	const el = document.querySelector(hash);
	if (el) {
		const distanceFromTop = el.getBoundingClientRect().top;
		if (typeof distanceFromTop === 'number')
			window.scrollTo({
				top: distanceFromTop,
				behavior: 'smooth',
			});
	}
}

/* remember scroll position - https://stackoverflow.com/a/65746118 */

window.onbeforeunload = function () {
	var scrollPos;
	if (typeof window.pageYOffset != 'undefined') {
		scrollPos = window.pageYOffset;
	} else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
		scrollPos = document.documentElement.scrollTop;
	} else if (typeof document.body != 'undefined') {
		scrollPos = document.body.scrollTop;
	}
	document.cookie = 'scrollTop=' + scrollPos + 'URL=' + window.location.href;
};

window.onload = function () {
	if (document.cookie.includes(window.location.href)) {
		if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {
			var arr = document.cookie.match(/scrollTop=([^;]+)(;|$)/);
			document.documentElement.scrollTop = parseInt(arr[1]);
			document.body.scrollTop = parseInt(arr[1]);
		}
	}
};

document.addEventListener('DOMContentLoaded', function () {
	if (!islocalhost()) {
		window.addEventListener('scroll', triggerAdsense);
	} else {
		triggerAdsense();
	}
});

/**
 * Prevent Duplicate
 */
let called = false;

/**
 * Trigger adsense
 * @param {Event} _e
 * @returns
 */
function triggerAdsense(_e) {
	if (called) return;
	called = true;

	/**
	 * debug on localhost
	 */
	const log = islocalhost()
		? console.log
		: function (..._args) {
				//
		  };

	const existingIns = Array.from(document.querySelectorAll('ins[class*=adsbygoogle]'));
	log('existing ins', existingIns.length);

	for (let i = 0; i < existingIns.length; i++) {
		const ins = existingIns[i];

		if (islocalhost()) {
			log('apply test ad to existing ins', i + 1);
			ins.setAttribute('data-adtest', 'on');
		}
	}

	/**
	 * do not show ads to these page title
	 */
	const banned = [/lagu|jackpot|montok|hack|crack|nulled/gi];
	if (banned.map(regex => regex.test(document.title)).some(result => result == true)) {
		// skip showing ads from banned page
		return;
	}

	const allAds = [
		{
			name: 'kiki',
			pub: '2188063137129806',
			ads: [
				{
					style: 'display: block; text-align: center',
					'data-ad-layout': 'in-article',
					'data-ad-format': 'fluid',
					'data-ad-slot': '5634823028',
				},
				{
					style: 'display: block; text-align: center',
					'data-ad-layout': 'in-article',
					'data-ad-format': 'fluid',
					'data-ad-slot': '8481296455',
				},
				{
					style: 'display:block',
					'data-ad-slot': '2667720583',
					'data-ad-format': 'auto',
					'data-full-width-responsive': 'true',
				},
				{
					style: 'display:block',
					'data-ad-format': 'fluid',
					'data-ad-layout-key': '-gw-3+1f-3d+2z',
					'data-ad-slot': '6979059162',
				},
			],
		},
	].sort(function () {
		// shuffle
		return 0.5 - Math.random();
	});

	// select ads
	// cookie key
	const ck = 'currentAds';
	// select previous ads id from cookie
	const ca = getCookie(ck);
	/**
	 * @type {typeof allAds[number]}
	 */
	let ads = allAds.find(item => item.pub === ca);
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
				location.protocol.includes('https') && location.host === 'www.webmanajemen.com',
			);
		}
	}

	// find element *[adsense="fill"]
	const fixedPlacement = Array.from(document.querySelectorAll('[adsense="fill"]'));
	if (fixedPlacement.length > 0) {
		for (let i = 0; i < fixedPlacement.length; i++) {
			const place = fixedPlacement[i];
			const attr = ads.ads.shift();
			if (attr) {
				attr['data-ad-client'] = 'ca-pub-' + ads.pub;
				const ins = createIns(attr);
				log('insert ads to adsense="fill"', i + 1);
				replaceWith(ins, place);
			}
		}
	}

	// find content/article wrapper
	let findPlaces = Array.from(document.querySelectorAll('article'));
	if (findPlaces.length === 0) {
		// theme-next main content
		findPlaces = Array.from(document.querySelectorAll('.page.main-inner'));
	}
	if (findPlaces.length === 0) {
		findPlaces = Array.from(document.querySelectorAll('#main-content'));
	}
	if (findPlaces.length === 0) {
		findPlaces = Array.from(document.querySelectorAll('#bootstrap-wrapper'));
	}
	// fallback search at body
	if (findPlaces.length === 0) {
		findPlaces = Array.from(document.querySelectorAll('body'));
	}
	// select random place
	let adsPlaces = findPlaces
		.map(getAllPlaces)
		.flat(1)
		.sort(function () {
			return 0.5 - Math.random();
		})
		.filter(el => el !== null)
		.sort(function () {
			return 0.5 - Math.random();
		});

	log('total targeted ads places', adsPlaces.length);

	if (adsPlaces.length > 0 && ads.ads.length > 0) {
		for (let i = 0; i < ads.ads.length; i++) {
			const attr = ads.ads[i];
			if (attr) {
				attr['data-ad-client'] = 'ca-pub-' + ads.pub;
				const ins = createIns(attr);
				let nextOf = adsPlaces.shift(); // get first element and remove it from list
				while (!nextOf) {
					// find next when nextOf = null
					if (adsPlaces.length > 0) {
						// select next place
						nextOf = adsPlaces.shift();
					} else {
						// if ads places empty, put to any div
						nextOf = document.querySelector('div');
					}
				}

				log('add banner', i + 1);
				insertAfter(ins, nextOf);
			}
		}
	}

	// create pagead
	const script = document.createElement('script');
	script.src = `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${ads.pub}`;
	script.async = true;
	script.setAttribute('crossorigin', 'anonymous');
	document.head.appendChild(script);

	const allIns = Array.from(document.querySelectorAll('ins'));
	log('total ins', allIns.length);

	for (let i = 0; i < allIns.length; i++) {
		log('apply banner', i + 1);
		const ins = allIns[i];
		if (!ins) continue;
		if (!ins.getAttribute('data-ad-client')) {
			console.log(ins);
			continue;
		}
		const adclient = ins.getAttribute('data-ad-client').replace('ca-pub-', '');
		const anonclient = adclient.slice(0, 3) + 'xxx' + adclient.slice(adclient.length - 3);
		const adsid = ins.getAttribute('data-ad-slot');
		const anonid = adsid.slice(0, 3) + 'xxx' + adsid.slice(adsid.length - 3);
		const bg = `https://via.placeholder.com/200x50/FFFFFF/000000/?text=${anonclient}-${anonid}`;
		ins.style.backgroundImage = `url('${bg}')`;
		ins.style.backgroundRepeat = 'no-repeat';
		if (ins.innerHTML.trim().length === 0) {
			(adsbygoogle = window.adsbygoogle || []).push({});
		}
	}

	/** FUNC START */

	/**
	 * create ins
	 * @param {Record<string,any>} attributes
	 * @returns
	 */
	function createIns(attributes) {
		if (!attributes['data-ad-client']) {
			attributes['data-ad-client'] = 'ca-pub-' + ads.pub;
		}
		const ins = document.createElement('ins');
		Object.keys(attributes).forEach(key => {
			ins.setAttribute(key, attributes[key]);
		});
		if (!ins.classList.contains('adsbygoogle')) {
			ins.classList.add('adsbygoogle');
		}
		if (!ins.classList.contains('bannerAds')) {
			ins.classList.add('bannerAds');
		}
		if (islocalhost()) {
			ins.setAttribute('data-adtest', 'on');
		}
		return ins;
	}

	/**
	 * insert next other
	 * @param {HTMLElement} newNode
	 * @param {HTMLElement|undefined} referenceNode insert after this element
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
	 * get all ads places
	 * @param {Element|Document} from
	 */
	function getAllPlaces(from) {
		return Array.from(from.querySelectorAll('h1,h2,h3,h4,h5,pre,header,hr,br,table,blockquote'))
			.sort(function () {
				return 0.5 - Math.random();
			})
			.filter(el => el !== null);
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
}

/**
 * check current script running on localhost
 * @returns
 */
function islocalhost() {
	// local hostname
	if (['adsense.webmanajemen.com', 'localhost', '127.0.0.1'].includes(location.hostname)) return true;
	// local network
	if (location.hostname.startsWith('192.168.')) return true;
	// port defined
	if (location.port.length > 0) return true;
	return false;
}
