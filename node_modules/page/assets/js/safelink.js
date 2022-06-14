var H = (function () {
	return {
		enc: function (msg_e = '', key = 'dimaslanjaka') {
			var enc_msg = CryptoJS.AES.encrypt(msg_e, key);
			return enc_msg.toString();
		},
		dec: function (enc_msg = '', key = 'dimaslanjaka') {
			var decryptedBytes = CryptoJS.AES.decrypt(enc_msg, key);
			var dec_msg = decryptedBytes.toString(CryptoJS.enc.Utf8);
			return dec_msg;
		},
		check: function (msg = '', key = 'dimaslanjaka') {
			var dec = H.dec(msg, key);
			var enc = H.enc(dec, key);
			var x = H.dec(enc, key);
			/**console.log({
        dec,
        enc,
        msg,
        x
      }); */
			return dec == x;
		},
		try: function (x = '', y = 'dimaslanjaka') {
			if (H.check(x, y)) {
				return H.dec(x, y);
			} else {
				return false;
			}
		},
	};
})();

$(function () {
	// scroll to top first visit
	$('html, body').animate(
		{
			scrollTop: 0,
		},
		'slow',
	);

	//--progress
	var getlink = $('#result'), // button
		gotolink = $('#result2'), // div
		timer = $('#progress');
	// disable gotolink and getlink
	getlink.prop('disabled', true);
	gotolink.attr('disabled', 'true');

	countdown(function () {
		var safq = getQuery('url');
		if (!safq) {
			var safq = getQuery('u');
			if (!safq) {
				var safq = getQuery('o');
			}
		}

		if (safq) {
			var safq = decodeURIComponent(safq).replace(/\s+/g, '+');
		}

		var saf = false;
		var log = { 'safelink query': safq };

		if (isURL(safq)) {
			// is plain url?
			saf = safq;
			log.is_url = true;
		} else if (safq && isB64(safq)) {
			// is base64 encoded?
			saf = BASE64(safq);
			log.base64 = true;
		} else if (H.try(saf, 'dimaslanjaka')) {
			saf = H.try(saf, 'dimaslanjaka');
		}
		log.saf = saf;
		console.log(log);
		if (saf) {
			var saf = decodeURIComponent(saf);
			var l = parse_url(saf);
			var link_ =
				'<h4>Your Link Here</h4> <i class="fas fa-arrow-circle-right mr-1"></i> <a href="' +
				saf +
				'" target="_blank" class="btn btn-success btn-sm">' +
				l.hostname +
				'</a> <i class="ml-1 fas fa-arrow-circle-left"></i>';
			getlink.html('<u>click <b>2x</b></u> to get your links');
			getlink.prop('disabled', false);
			timer.remove();
			// hide goto link
			gotolink.html(link_);
			gotolink.fadeOut('fast');
			if (typeof gtag == 'function') {
				setTimeout(() => {
					gtag('event', 'safelink-' + saf);
				}, 300);
			}
		}
	});

	// getlink listener
	$('#result').on('click', function () {
		gotolink.removeClass('d-none');
		$('html, body').animate(
			{
				scrollTop: eval(gotolink.offset().top - 10),
			},
			100,
		);
		gotolink.fadeIn('slow');
		setTimeout(() => {
			gotolink.removeAttr('disabled'); // enable div
		}, 400);
	});

	var enc_ = getQuery('crypt_enc');
	if (enc_) {
		swal({
			title: 'Encrypt Information',
			type: 'info',
			html: '<b>' + (H.enc(enc_) ? H.enc(enc_) : 'Encryption Failed') + '</b>',
			showCloseButton: true,
			showCancelButton: false,
			focusConfirm: false,
			confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
			confirmButtonAriaLabel: 'Thumbs up, great!',
			cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
			cancelButtonAriaLabel: 'Thumbs down',
		});
	}
	var dec_ = getQuery('crypt_dec');
	if (dec_) {
		swal({
			title: 'Decrypt Information',
			type: 'info',
			html: '<b>' + (H.try(dec_) ? H.try(dec_) : 'Decryption Failed') + '</b>',
			showCloseButton: true,
			showCancelButton: false,
			focusConfirm: false,
			confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
			confirmButtonAriaLabel: 'Thumbs up, great!',
			cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
			cancelButtonAriaLabel: 'Thumbs down',
		});
	}
});

function download_script(url, success = false) {
	var script = document.createElement('script');
	script.src = url;
	var head = document.getElementsByTagName('head')[0],
		done = false;
	if (success) {
		script.onload = script.onreadystatechange = function () {
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
				done = true;
				return success();
				//script.onload = script.onreadystatechange = null;
				//head.removeChild(script);
			}
		};
	}
	head.appendChild(script);
}

function countdown(callback) {
	var bar = document.getElementById('progress'),
		time = 0,
		max = 5,
		int = setInterval(function () {
			bar.style.width = Math.floor((100 * time++) / max) + '%';
			if (time - 1 == max) {
				clearInterval(int);
				if (typeof callback == 'function') {
					setTimeout(function () {
						callback();
						$(bar).parent('div').remove();
					}, 600);
				}
			}
		}, 1000);
}

/**
 * is base64?
 * @param {string} str
 * @returns
 */
function isB64(str) {
	if (!str || str.trim() == '') {
		return null;
	}
	var notBase64 = /[^A-Z0-9+\/=]/i;
	var rg = '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$';
	var len = str.length;
	if (!len || len % 4 !== 0 || notBase64.test(str) || !b64DecodeUnicode(str)) {
		return false;
	} else if (b64EncodeUnicode(b64DecodeUnicode(str)) == str) {
		return true;
	} else {
		return false;
	}
}

function b64EncodeUnicode(str) {
	return btoa(
		encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
			return String.fromCharCode(parseInt(p1, 16));
		}),
	);
}

function b64DecodeUnicode(str) {
	return decodeURIComponent(
		Array.prototype.map
			.call(atob(str), function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);
}

function BASE64(str) {
	if (isB64(str) !== false) {
		return b64DecodeUnicode(str);
	} else {
		return false;
	}
}

function getQuery(name, url = false) {
	if (!url) {
		url = window.location.href;
	}
	var parsed = parse_url(url),
		queries = parsed.search.replace(/^\?/g, '');
	var url = parsed.protocol + '://' + parsed.host + '/' + parsed.pathname + '?' + queries;
	if (parsed.hash) {
		url += '#' + parsed.hash;
	}
	var params = new URLSearchParams(queries);

	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
	//var regex = new RegExp('[?&#]' + name + '(=(.*)|&|#|$)');
	var results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return false;
	var result = decodeURIComponent(results[2].replace(/\+/g, ' '));
	return result;
}

function parse_url(href) {
	var l = document.createElement('a');
	l.href = href;
	return l;
}
function isURL(str) {
	regexp =
		/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
	if (regexp.test(str) && str.match(/^(https?|ftp)\:?/g)) {
		return true;
	} else {
		return false;
	}
}
