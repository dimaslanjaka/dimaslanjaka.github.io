(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global._0dfd836c20efdf30f95a274124608359 = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var cookie$1 = {exports: {}};

	/* eslint-disable @typescript-eslint/no-unused-vars */
	cookie$1.exports;

	(function (module) {
		function setCookie(name, value, days, path = '/') {
			var expires = '';
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
				expires = '; expires=' + date.toUTCString();
			}
			document.cookie = name + '=' + (value || '') + expires + '; path=' + path + ';';
		}

		function createCookieMins(name, value, minutes, path = '/') {
			return new Promise(function (resolve) {
				if (minutes) {
					var date = new Date();
					date.setTime(date.getTime() + minutes * 60 * 1000);
					var expires = '; expires=' + date.toGMTString();
				} else {
					expires = '';
				}
				document.cookie = name + '=' + value + expires + '; path=' + path + ';';
				resolve(null);
			});
		}

		function getCookie(name) {
			var nameEQ = name + '=';
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}

		/**
		 * remove cookie
		 * @param {string} name
		 * @returns
		 */
		function eraseCookie(name) {
			document.cookie = name + '=; Max-Age=-99999999;';
		}

		/**
		 * remove cookie
		 * @param {string} name
		 * @returns
		 */
		function removeCookie(name) {
			return eraseCookie(name);
		}

		if ('exports' in module) {
			module.exports = { getCookie, removeCookie, eraseCookie, setCookie, createCookieMins };
		} 
	} (cookie$1));

	var cookieExports = cookie$1.exports;
	var cookie = /*@__PURE__*/getDefaultExportFromCjs(cookieExports);

	return cookie;

}));
