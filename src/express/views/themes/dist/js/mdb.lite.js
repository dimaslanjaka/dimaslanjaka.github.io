/* !
 * Material Design for Bootstrap 4
 * Version: MDB Lite 4.11.0
 *
 *
 * Copyright: Material Design for Bootstrap
 * https://mdbootstrap.com/
 *
 * Read the license: https://mdbootstrap.com/license/
 *
 *
 * Documentation: https://mdbootstrap.com/
 *
 * Getting started: https://mdbootstrap.com/getting-started/
 *
 * Tutorials: https://mdbootstrap.com/bootstrap-tutorial/
 *
 * Templates: https://mdbootstrap.com/templates/
 *
 * Support: https://mdbootstrap.com/forums/forum/support/
 *
 * Contact: office@mdbootstrap.com
 *
 * Attribution: Animate CSS, Twitter Bootstrap, Materialize CSS, Normalize CSS, Waves JS, WOW JS, Toastr, Chart.js
 *
 */


/*

  jquery.easing.js
  velocity.js
  wow.js
  scrolling-navbar.js
  waves.js
  forms-free.js
  preloading.js
  cards.js
  character-counter.js
  toastr.js
  smooth-scroll.js
  dropdown.js
  buttons.js
  sidenav.js
  collapsible.js
  range-input.js
  file-input.js
  material-select.js
  jquery.sticky.js
  scrollbar.js
  mdb-autocomplete.js
  enhanced-modals.js
  treeview.js

*/

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
/*! Note that this has been modified by Materialize to confirm that Velocity is not already being imported. */
jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(!function(e){function t(e){var t=e.length,a=r.type(e);return"function"===a||r.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===a||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var r=function(e,t){return new r.fn.init(e,t)};r.isWindow=function(e){return null!=e&&e==e.window},r.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[i.call(e)]||"object":typeof e},r.isArray=Array.isArray||function(e){return"array"===r.type(e)},r.isPlainObject=function(e){var t;if(!e||"object"!==r.type(e)||e.nodeType||r.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(a){return!1}for(t in e);return void 0===t||o.call(e,t)},r.each=function(e,r,a){var n,o=0,i=e.length,s=t(e);if(a){if(s)for(;i>o&&(n=r.apply(e[o],a),n!==!1);o++);else for(o in e)if(n=r.apply(e[o],a),n===!1)break}else if(s)for(;i>o&&(n=r.call(e[o],o,e[o]),n!==!1);o++);else for(o in e)if(n=r.call(e[o],o,e[o]),n===!1)break;return e},r.data=function(e,t,n){if(void 0===n){var o=e[r.expando],i=o&&a[o];if(void 0===t)return i;if(i&&t in i)return i[t]}else if(void 0!==t){var o=e[r.expando]||(e[r.expando]=++r.uuid);return a[o]=a[o]||{},a[o][t]=n,n}},r.removeData=function(e,t){var n=e[r.expando],o=n&&a[n];o&&r.each(t,function(e,t){delete o[t]})},r.extend=function(){var e,t,a,n,o,i,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[l]||{},l++),"object"!=typeof s&&"function"!==r.type(s)&&(s={}),l===u&&(s=this,l--);u>l;l++)if(null!=(o=arguments[l]))for(n in o)e=s[n],a=o[n],s!==a&&(c&&a&&(r.isPlainObject(a)||(t=r.isArray(a)))?(t?(t=!1,i=e&&r.isArray(e)?e:[]):i=e&&r.isPlainObject(e)?e:{},s[n]=r.extend(c,i,a)):void 0!==a&&(s[n]=a));return s},r.queue=function(e,a,n){function o(e,r){var a=r||[];return null!=e&&(t(Object(e))?!function(e,t){for(var r=+t.length,a=0,n=e.length;r>a;)e[n++]=t[a++];if(r!==r)for(;void 0!==t[a];)e[n++]=t[a++];return e.length=n,e}(a,"string"==typeof e?[e]:e):[].push.call(a,e)),a}if(e){a=(a||"fx")+"queue";var i=r.data(e,a);return n?(!i||r.isArray(n)?i=r.data(e,a,o(n)):i.push(n),i):i||[]}},r.dequeue=function(e,t){r.each(e.nodeType?[e]:e,function(e,a){t=t||"fx";var n=r.queue(a,t),o=n.shift();"inprogress"===o&&(o=n.shift()),o&&("fx"===t&&n.unshift("inprogress"),o.call(a,function(){r.dequeue(a,t)}))})},r.fn=r.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),a=this.offset(),n=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:r(e).offset();return a.top-=parseFloat(t.style.marginTop)||0,a.left-=parseFloat(t.style.marginLeft)||0,e.style&&(n.top+=parseFloat(e.style.borderTopWidth)||0,n.left+=parseFloat(e.style.borderLeftWidth)||0),{top:a.top-n.top,left:a.left-n.left}}};var a={};r.expando="velocity"+(new Date).getTime(),r.uuid=0;for(var n={},o=n.hasOwnProperty,i=n.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<s.length;l++)n["[object "+s[l]+"]"]=s[l].toLowerCase();r.fn.init.prototype=r.fn,e.Velocity={Utilities:r}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,r,a){function n(e){for(var t=-1,r=e?e.length:0,a=[];++t<r;){var n=e[t];n&&a.push(n)}return a}function o(e){return m.isWrapped(e)?e=[].slice.call(e):m.isNode(e)&&(e=[e]),e}function i(e){var t=f.data(e,"velocity");return null===t?a:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,r,a,n){function o(e,t){return 1-3*t+3*e}function i(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,r){return((o(t,r)*e+i(t,r))*e+s(t))*e}function u(e,t,r){return 3*o(t,r)*e*e+2*i(t,r)*e+s(t)}function c(t,r){for(var n=0;m>n;++n){var o=u(r,e,a);if(0===o)return r;var i=l(r,e,a)-t;r-=i/o}return r}function p(){for(var t=0;b>t;++t)w[t]=l(t*x,e,a)}function f(t,r,n){var o,i,s=0;do i=r+(n-r)/2,o=l(i,e,a)-t,o>0?n=i:r=i;while(Math.abs(o)>h&&++s<v);return i}function d(t){for(var r=0,n=1,o=b-1;n!=o&&w[n]<=t;++n)r+=x;--n;var i=(t-w[n])/(w[n+1]-w[n]),s=r+i*x,l=u(s,e,a);return l>=y?c(t,s):0==l?s:f(t,r,r+x)}function g(){V=!0,(e!=r||a!=n)&&p()}var m=4,y=.001,h=1e-7,v=10,b=11,x=1/(b-1),S="Float32Array"in t;if(4!==arguments.length)return!1;for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1;e=Math.min(e,1),a=Math.min(a,1),e=Math.max(e,0),a=Math.max(a,0);var w=S?new Float32Array(b):new Array(b),V=!1,C=function(t){return V||g(),e===r&&a===n?t:0===t?0:1===t?1:l(d(t),r,n)};C.getControlPoints=function(){return[{x:e,y:r},{x:a,y:n}]};var T="generateBezier("+[e,r,a,n]+")";return C.toString=function(){return T},C}function u(e,t){var r=e;return m.isString(e)?b.Easings[e]||(r=!1):r=m.isArray(e)&&1===e.length?s.apply(null,e):m.isArray(e)&&2===e.length?x.apply(null,e.concat([t])):m.isArray(e)&&4===e.length?l.apply(null,e):!1,r===!1&&(r=b.Easings[b.defaults.easing]?b.defaults.easing:v),r}function c(e){if(e){var t=(new Date).getTime(),r=b.State.calls.length;r>1e4&&(b.State.calls=n(b.State.calls));for(var o=0;r>o;o++)if(b.State.calls[o]){var s=b.State.calls[o],l=s[0],u=s[2],d=s[3],g=!!d,y=null;d||(d=b.State.calls[o][3]=t-16);for(var h=Math.min((t-d)/u.duration,1),v=0,x=l.length;x>v;v++){var P=l[v],V=P.element;if(i(V)){var C=!1;if(u.display!==a&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var T=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];f.each(T,function(e,t){S.setPropertyValue(V,"display",t)})}S.setPropertyValue(V,"display",u.display)}u.visibility!==a&&"hidden"!==u.visibility&&S.setPropertyValue(V,"visibility",u.visibility);for(var k in P)if("element"!==k){var A,F=P[k],j=m.isString(F.easing)?b.Easings[F.easing]:F.easing;if(1===h)A=F.endValue;else{var E=F.endValue-F.startValue;if(A=F.startValue+E*j(h,u,E),!g&&A===F.currentValue)continue}if(F.currentValue=A,"tween"===k)y=A;else{if(S.Hooks.registered[k]){var H=S.Hooks.getRoot(k),N=i(V).rootPropertyValueCache[H];N&&(F.rootPropertyValue=N)}var L=S.setPropertyValue(V,k,F.currentValue+(0===parseFloat(A)?"":F.unitType),F.rootPropertyValue,F.scrollData);S.Hooks.registered[k]&&(i(V).rootPropertyValueCache[H]=S.Normalizations.registered[H]?S.Normalizations.registered[H]("extract",null,L[1]):L[1]),"transform"===L[0]&&(C=!0)}}u.mobileHA&&i(V).transformCache.translate3d===a&&(i(V).transformCache.translate3d="(0px, 0px, 0px)",C=!0),C&&S.flushTransformCache(V)}}u.display!==a&&"none"!==u.display&&(b.State.calls[o][2].display=!1),u.visibility!==a&&"hidden"!==u.visibility&&(b.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],h,Math.max(0,d+u.duration-t),d,y),1===h&&p(o)}}b.State.isTicking&&w(c)}function p(e,t){if(!b.State.calls[e])return!1;for(var r=b.State.calls[e][0],n=b.State.calls[e][1],o=b.State.calls[e][2],s=b.State.calls[e][4],l=!1,u=0,c=r.length;c>u;u++){var p=r[u].element;if(t||o.loop||("none"===o.display&&S.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&S.setPropertyValue(p,"visibility",o.visibility)),o.loop!==!0&&(f.queue(p)[1]===a||!/\.velocityQueueEntryFlag/i.test(f.queue(p)[1]))&&i(p)){i(p).isAnimating=!1,i(p).rootPropertyValueCache={};var d=!1;f.each(S.Lists.transforms3D,function(e,t){var r=/^scale/.test(t)?1:0,n=i(p).transformCache[t];i(p).transformCache[t]!==a&&new RegExp("^\\("+r+"[^.]").test(n)&&(d=!0,delete i(p).transformCache[t])}),o.mobileHA&&(d=!0,delete i(p).transformCache.translate3d),d&&S.flushTransformCache(p),S.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(n,n)}catch(g){setTimeout(function(){throw g},1)}s&&o.loop!==!0&&s(n),i(p)&&o.loop===!0&&!t&&(f.each(i(p).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&f.dequeue(p,o.queue)}b.State.calls[e]=!1;for(var m=0,y=b.State.calls.length;y>m;m++)if(b.State.calls[m]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var f,d=function(){if(r.documentMode)return r.documentMode;for(var e=7;e>4;e--){var t=r.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return a}(),g=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var r,a=(new Date).getTime();return r=Math.max(0,16-(a-e)),e=a+r,setTimeout(function(){t(a+r)},r)}}(),m={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==a&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},y=!1;if(e.fn&&e.fn.jquery?(f=e,y=!0):f=t.Velocity.Utilities,8>=d&&!y)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=d)return void(jQuery.fn.velocity=jQuery.fn.animate);var h=400,v="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:r.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:f,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:h,easing:v,begin:a,complete:a,progress:a,display:a,visibility:a,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){f.data(e,"velocity",{isSVG:m.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==a?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=r.documentElement||r.body.parentNode||r.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var x=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,a){var n={x:t.x+a.dx*r,v:t.v+a.dv*r,tension:t.tension,friction:t.friction};return{dx:n.v,dv:e(n)}}function r(r,a){var n={dx:r.v,dv:e(r)},o=t(r,.5*a,n),i=t(r,.5*a,o),s=t(r,a,i),l=1/6*(n.dx+2*(o.dx+i.dx)+s.dx),u=1/6*(n.dv+2*(o.dv+i.dv)+s.dv);return r.x=r.x+l*a,r.v=r.v+u*a,r}return function a(e,t,n){var o,i,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0,p=1e-4,f=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,n=n||null,l.tension=e,l.friction=t,o=null!==n,o?(c=a(e,t),i=c/n*f):i=f;s=r(s||l,i),u.push(1+s.x),c+=16,Math.abs(s.x)>p&&Math.abs(s.v)>p;);return o?function(e){return u[e*(u.length-1)|0]}:c}}();b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},f.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=l.apply(null,t[1])});var S=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<S.Lists.colors.length;e++){var t="color"===S.Lists.colors[e]?"0 0 0 1":"255 255 255 1";S.Hooks.templates[S.Lists.colors[e]]=["Red Green Blue Alpha",t]}var r,a,n;if(d)for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");var o=a[1].match(S.RegEx.valueSplit);"Color"===n[0]&&(n.push(n.shift()),o.push(o.shift()),S.Hooks.templates[r]=[n.join(" "),o.join(" ")])}for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");for(var e in n){var i=r+n[e],s=e;S.Hooks.registered[i]=[r,s]}}},getRoot:function(e){var t=S.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return S.RegEx.valueUnwrap.test(t)&&(t=t.match(S.RegEx.valueUnwrap)[1]),S.Values.isCSSNullValue(t)&&(t=S.Hooks.templates[e][1]),t},extractValue:function(e,t){var r=S.Hooks.registered[e];if(r){var a=r[0],n=r[1];return t=S.Hooks.cleanRootPropertyValue(a,t),t.toString().match(S.RegEx.valueSplit)[n]}return t},injectValue:function(e,t,r){var a=S.Hooks.registered[e];if(a){var n,o,i=a[0],s=a[1];return r=S.Hooks.cleanRootPropertyValue(i,r),n=r.toString().match(S.RegEx.valueSplit),n[s]=t,o=n.join(" ")}return r}},Normalizations:{registered:{clip:function(e,t,r){switch(e){case"name":return"clip";case"extract":var a;return S.RegEx.wrappedValueAlreadyExtracted.test(r)?a=r:(a=r.toString().match(S.RegEx.valueUnwrap),a=a?a[1].replace(/,(\s+)?/g," "):r),a;case"inject":return"rect("+r+")"}},blur:function(e,t,r){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var a=parseFloat(r);if(!a&&0!==a){var n=r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a=n?n[1]:0}return a;case"inject":return parseFloat(r)?"blur("+r+")":"none"}},opacity:function(e,t,r){if(8>=d)switch(e){case"name":return"filter";case"extract":var a=r.toString().match(/alpha\(opacity=(.*)\)/i);return r=a?a[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(r)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(r),10)+")"}else switch(e){case"name":return"opacity";case"extract":return r;case"inject":return r}}},register:function(){9>=d||b.State.isGingerbread||(S.Lists.transformsBase=S.Lists.transformsBase.concat(S.Lists.transforms3D));for(var e=0;e<S.Lists.transformsBase.length;e++)!function(){var t=S.Lists.transformsBase[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return"transform";case"extract":return i(r)===a||i(r).transformCache[t]===a?/^scale/i.test(t)?1:0:i(r).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case"scal":case"scale":b.State.isAndroid&&i(r).transformCache[t]===a&&1>n&&(n=1),o=!/(\d)$/i.test(n);break;case"skew":o=!/(deg|\d)$/i.test(n);break;case"rotate":o=!/(deg|\d)$/i.test(n)}return o||(i(r).transformCache[t]="("+n+")"),i(r).transformCache[t]}}}();for(var e=0;e<S.Lists.colors.length;e++)!function(){var t=S.Lists.colors[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return t;case"extract":var o;if(S.RegEx.wrappedValueAlreadyExtracted.test(n))o=n;else{var i,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(n)?i=s[n]!==a?s[n]:s.black:S.RegEx.isHex.test(n)?i="rgb("+S.Values.hexToRgb(n).join(" ")+")":/^rgba?\(/i.test(n)||(i=s.black),o=(i||n).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=d||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=d?4===n.split(" ").length&&(n=n.split(/\s+/).slice(0,3).join(" ")):3===n.split(" ").length&&(n+=" 1"),(8>=d?"rgb":"rgba")+"("+n.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(d||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],r=0,a=t.length;a>r;r++){var n;if(n=0===r?e:t[r]+e.replace(/^\w/,function(e){return e.toUpperCase()}),m.isString(b.State.prefixElement.style[n]))return b.State.prefixMatches[e]=n,[n,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(r,function(e,t,r,a){return t+t+r+r+a+a}),t=a.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,r,n,o){function s(e,r){function n(){u&&S.setPropertyValue(e,"display","none")}var l=0;if(8>=d)l=f.css(e,r);else{var u=!1;if(/^(width|height)$/.test(r)&&0===S.getPropertyValue(e,"display")&&(u=!0,S.setPropertyValue(e,"display",S.Values.getDisplayType(e))),!o){if("height"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(S.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(S.getPropertyValue(e,"paddingBottom"))||0);return n(),c}if("width"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(S.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(S.getPropertyValue(e,"paddingRight"))||0);return n(),p}}var g;g=i(e)===a?t.getComputedStyle(e,null):i(e).computedStyle?i(e).computedStyle:i(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===r&&(r="borderTopColor"),l=9===d&&"filter"===r?g.getPropertyValue(r):g[r],(""===l||null===l)&&(l=e.style[r]),n()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(r)){var m=s(e,"position");("fixed"===m||"absolute"===m&&/top|left/i.test(r))&&(l=f(e).position()[r]+"px")}return l}var l;if(S.Hooks.registered[r]){var u=r,c=S.Hooks.getRoot(u);n===a&&(n=S.getPropertyValue(e,S.Names.prefixCheck(c)[0])),S.Normalizations.registered[c]&&(n=S.Normalizations.registered[c]("extract",e,n)),l=S.Hooks.extractValue(u,n)}else if(S.Normalizations.registered[r]){var p,g;p=S.Normalizations.registered[r]("name",e),"transform"!==p&&(g=s(e,S.Names.prefixCheck(p)[0]),S.Values.isCSSNullValue(g)&&S.Hooks.templates[r]&&(g=S.Hooks.templates[r][1])),l=S.Normalizations.registered[r]("extract",e,g)}if(!/^[\d-]/.test(l))if(i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r))if(/^(height|width)$/i.test(r))try{l=e.getBBox()[r]}catch(m){l=0}else l=e.getAttribute(r);else l=s(e,S.Names.prefixCheck(r)[0]);return S.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+r+": "+l),l},setPropertyValue:function(e,r,a,n,o){var s=r;if("scroll"===r)o.container?o.container["scroll"+o.direction]=a:"Left"===o.direction?t.scrollTo(a,o.alternateValue):t.scrollTo(o.alternateValue,a);else if(S.Normalizations.registered[r]&&"transform"===S.Normalizations.registered[r]("name",e))S.Normalizations.registered[r]("inject",e,a),s="transform",a=i(e).transformCache[r];else{if(S.Hooks.registered[r]){var l=r,u=S.Hooks.getRoot(r);n=n||S.getPropertyValue(e,u),a=S.Hooks.injectValue(l,a,n),r=u}if(S.Normalizations.registered[r]&&(a=S.Normalizations.registered[r]("inject",e,a),r=S.Normalizations.registered[r]("name",e)),s=S.Names.prefixCheck(r)[0],8>=d)try{e.style[s]=a}catch(c){b.debug&&console.log("Browser does not support ["+a+"] for ["+s+"]")}else i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r)?e.setAttribute(r,a):e.style[s]=a;b.debug>=2&&console.log("Set "+r+" ("+s+"): "+a)}return[s,a]},flushTransformCache:function(e){function t(t){return parseFloat(S.getPropertyValue(e,t))}var r="";if((d||b.State.isAndroid&&!b.State.isChrome)&&i(e).isSVG){var a={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};f.each(i(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),a[e]&&(r+=e+"("+a[e].join(" ")+") ",delete a[e])})}else{var n,o;f.each(i(e).transformCache,function(t){return n=i(e).transformCache[t],"transformPerspective"===t?(o=n,!0):(9===d&&"rotateZ"===t&&(t="rotate"),void(r+=t+n+" "))}),o&&(r="perspective"+o+" "+r)}S.setPropertyValue(e,"transform",r)}};S.Hooks.register(),S.Normalizations.register(),b.hook=function(e,t,r){var n=a;return e=o(e),f.each(e,function(e,o){if(i(o)===a&&b.init(o),r===a)n===a&&(n=b.CSS.getPropertyValue(o,t));else{var s=b.CSS.setPropertyValue(o,t,r);"transform"===s[0]&&b.CSS.flushTransformCache(o),n=s}}),n};var P=function(){function e(){return s?k.promise||null:l}function n(){function e(e){function p(e,t){var r=a,n=a,i=a;return m.isArray(e)?(r=e[0],!m.isArray(e[1])&&/^[\d-]/.test(e[1])||m.isFunction(e[1])||S.RegEx.isHex.test(e[1])?i=e[1]:(m.isString(e[1])&&!S.RegEx.isHex.test(e[1])||m.isArray(e[1]))&&(n=t?e[1]:u(e[1],s.duration),e[2]!==a&&(i=e[2]))):r=e,t||(n=n||s.easing),m.isFunction(r)&&(r=r.call(o,V,w)),m.isFunction(i)&&(i=i.call(o,V,w)),[r||0,n,i]}function d(e,t){var r,a;return a=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return r=e,""}),r||(r=S.Values.getUnitType(e)),[a,r]}function h(){var e={myParent:o.parentNode||r.body,position:S.getPropertyValue(o,"position"),fontSize:S.getPropertyValue(o,"fontSize")},a=e.position===L.lastPosition&&e.myParent===L.lastParent,n=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var s=100,l={};if(n&&a)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var u=i(o).isSVG?r.createElementNS("http://www.w3.org/2000/svg","rect"):r.createElement("div");b.init(u),e.myParent.appendChild(u),f.each(["overflow","overflowX","overflowY"],function(e,t){b.CSS.setPropertyValue(u,t,"hidden")}),b.CSS.setPropertyValue(u,"position",e.position),b.CSS.setPropertyValue(u,"fontSize",e.fontSize),b.CSS.setPropertyValue(u,"boxSizing","content-box"),f.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(u,t,s+"%")}),b.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(S.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(S.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=L.lastEmToPx=(parseFloat(S.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===L.remToPx&&(L.remToPx=parseFloat(S.getPropertyValue(r.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(s.begin&&0===V)try{s.begin.call(g,g)}catch(x){setTimeout(function(){throw x},1)}if("scroll"===A){var P,C,T,F=/^x$/i.test(s.axis)?"Left":"Top",j=parseFloat(s.offset)||0;s.container?m.isWrapped(s.container)||m.isNode(s.container)?(s.container=s.container[0]||s.container,P=s.container["scroll"+F],T=P+f(o).position()[F.toLowerCase()]+j):s.container=null:(P=b.State.scrollAnchor[b.State["scrollProperty"+F]],C=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===F?"Top":"Left")]],T=f(o).offset()[F.toLowerCase()]+j),l={scroll:{rootPropertyValue:!1,startValue:P,currentValue:P,endValue:T,unitType:"",easing:s.easing,scrollData:{container:s.container,direction:F,alternateValue:C}},element:o},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===A){if(!i(o).tweensContainer)return void f.dequeue(o,s.queue);"none"===i(o).opts.display&&(i(o).opts.display="auto"),"hidden"===i(o).opts.visibility&&(i(o).opts.visibility="visible"),i(o).opts.loop=!1,i(o).opts.begin=null,i(o).opts.complete=null,v.easing||delete s.easing,v.duration||delete s.duration,s=f.extend({},i(o).opts,s);var E=f.extend(!0,{},i(o).tweensContainer);for(var H in E)if("element"!==H){var N=E[H].startValue;E[H].startValue=E[H].currentValue=E[H].endValue,E[H].endValue=N,m.isEmptyObject(v)||(E[H].easing=s.easing),b.debug&&console.log("reverse tweensContainer ("+H+"): "+JSON.stringify(E[H]),o)}l=E}else if("start"===A){var E;i(o).tweensContainer&&i(o).isAnimating===!0&&(E=i(o).tweensContainer),f.each(y,function(e,t){if(RegExp("^"+S.Lists.colors.join("$|^")+"$").test(e)){var r=p(t,!0),n=r[0],o=r[1],i=r[2];if(S.RegEx.isHex.test(n)){for(var s=["Red","Green","Blue"],l=S.Values.hexToRgb(n),u=i?S.Values.hexToRgb(i):a,c=0;c<s.length;c++){var f=[l[c]];o&&f.push(o),u!==a&&f.push(u[c]),y[e+s[c]]=f}delete y[e]}}});for(var z in y){var O=p(y[z]),q=O[0],$=O[1],M=O[2];z=S.Names.camelCase(z);var I=S.Hooks.getRoot(z),B=!1;if(i(o).isSVG||"tween"===I||S.Names.prefixCheck(I)[1]!==!1||S.Normalizations.registered[I]!==a){(s.display!==a&&null!==s.display&&"none"!==s.display||s.visibility!==a&&"hidden"!==s.visibility)&&/opacity|filter/.test(z)&&!M&&0!==q&&(M=0),s._cacheValues&&E&&E[z]?(M===a&&(M=E[z].endValue+E[z].unitType),B=i(o).rootPropertyValueCache[I]):S.Hooks.registered[z]?M===a?(B=S.getPropertyValue(o,I),M=S.getPropertyValue(o,z,B)):B=S.Hooks.templates[I][1]:M===a&&(M=S.getPropertyValue(o,z));var W,G,Y,D=!1;if(W=d(z,M),M=W[0],Y=W[1],W=d(z,q),q=W[0].replace(/^([+-\/*])=/,function(e,t){return D=t,""}),G=W[1],M=parseFloat(M)||0,q=parseFloat(q)||0,"%"===G&&(/^(fontSize|lineHeight)$/.test(z)?(q/=100,G="em"):/^scale/.test(z)?(q/=100,G=""):/(Red|Green|Blue)$/i.test(z)&&(q=q/100*255,G="")),/[\/*]/.test(D))G=Y;else if(Y!==G&&0!==M)if(0===q)G=Y;else{n=n||h();var Q=/margin|padding|left|right|width|text|word|letter/i.test(z)||/X$/.test(z)||"x"===z?"x":"y";switch(Y){case"%":M*="x"===Q?n.percentToPxWidth:n.percentToPxHeight;break;case"px":break;default:M*=n[Y+"ToPx"]}switch(G){case"%":M*=1/("x"===Q?n.percentToPxWidth:n.percentToPxHeight);break;case"px":break;default:M*=1/n[G+"ToPx"]}}switch(D){case"+":q=M+q;break;case"-":q=M-q;break;case"*":q=M*q;break;case"/":q=M/q}l[z]={rootPropertyValue:B,startValue:M,currentValue:M,endValue:q,unitType:G,easing:$},b.debug&&console.log("tweensContainer ("+z+"): "+JSON.stringify(l[z]),o)}else b.debug&&console.log("Skipping ["+I+"] due to a lack of browser support.")}l.element=o}l.element&&(S.Values.addClass(o,"velocity-animating"),R.push(l),""===s.queue&&(i(o).tweensContainer=l,i(o).opts=s),i(o).isAnimating=!0,V===w-1?(b.State.calls.push([R,g,s,null,k.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,c())):V++)}var n,o=this,s=f.extend({},b.defaults,v),l={};switch(i(o)===a&&b.init(o),parseFloat(s.delay)&&s.queue!==!1&&f.queue(o,s.queue,function(e){b.velocityQueueEntryFlag=!0,i(o).delayTimer={setTimeout:setTimeout(e,parseFloat(s.delay)),next:e}}),s.duration.toString().toLowerCase()){case"fast":s.duration=200;break;case"normal":s.duration=h;break;case"slow":s.duration=600;break;default:s.duration=parseFloat(s.duration)||1}b.mock!==!1&&(b.mock===!0?s.duration=s.delay=1:(s.duration*=parseFloat(b.mock)||1,s.delay*=parseFloat(b.mock)||1)),s.easing=u(s.easing,s.duration),s.begin&&!m.isFunction(s.begin)&&(s.begin=null),s.progress&&!m.isFunction(s.progress)&&(s.progress=null),s.complete&&!m.isFunction(s.complete)&&(s.complete=null),s.display!==a&&null!==s.display&&(s.display=s.display.toString().toLowerCase(),"auto"===s.display&&(s.display=b.CSS.Values.getDisplayType(o))),s.visibility!==a&&null!==s.visibility&&(s.visibility=s.visibility.toString().toLowerCase()),s.mobileHA=s.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,s.queue===!1?s.delay?setTimeout(e,s.delay):e():f.queue(o,s.queue,function(t,r){return r===!0?(k.promise&&k.resolver(g),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==s.queue&&"fx"!==s.queue||"inprogress"===f.queue(o)[0]||f.dequeue(o)}var s,l,d,g,y,v,x=arguments[0]&&(arguments[0].p||f.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||m.isString(arguments[0].properties));if(m.isWrapped(this)?(s=!1,d=0,g=this,l=this):(s=!0,d=1,g=x?arguments[0].elements||arguments[0].e:arguments[0]),g=o(g)){x?(y=arguments[0].properties||arguments[0].p,v=arguments[0].options||arguments[0].o):(y=arguments[d],v=arguments[d+1]);var w=g.length,V=0;if(!/^(stop|finish)$/i.test(y)&&!f.isPlainObject(v)){var C=d+1;v={};for(var T=C;T<arguments.length;T++)m.isArray(arguments[T])||!/^(fast|normal|slow)$/i.test(arguments[T])&&!/^\d/.test(arguments[T])?m.isString(arguments[T])||m.isArray(arguments[T])?v.easing=arguments[T]:m.isFunction(arguments[T])&&(v.complete=arguments[T]):v.duration=arguments[T]}var k={promise:null,resolver:null,rejecter:null};s&&b.Promise&&(k.promise=new b.Promise(function(e,t){k.resolver=e,k.rejecter=t}));var A;switch(y){case"scroll":A="scroll";break;case"reverse":A="reverse";break;case"finish":case"stop":f.each(g,function(e,t){i(t)&&i(t).delayTimer&&(clearTimeout(i(t).delayTimer.setTimeout),i(t).delayTimer.next&&i(t).delayTimer.next(),delete i(t).delayTimer)});var F=[];return f.each(b.State.calls,function(e,t){t&&f.each(t[1],function(r,n){var o=v===a?"":v;return o===!0||t[2].queue===o||v===a&&t[2].queue===!1?void f.each(g,function(r,a){a===n&&((v===!0||m.isString(v))&&(f.each(f.queue(a,m.isString(v)?v:""),function(e,t){
m.isFunction(t)&&t(null,!0)}),f.queue(a,m.isString(v)?v:"",[])),"stop"===y?(i(a)&&i(a).tweensContainer&&o!==!1&&f.each(i(a).tweensContainer,function(e,t){t.endValue=t.currentValue}),F.push(e)):"finish"===y&&(t[2].duration=1))}):!0})}),"stop"===y&&(f.each(F,function(e,t){p(t,!0)}),k.promise&&k.resolver(g)),e();default:if(!f.isPlainObject(y)||m.isEmptyObject(y)){if(m.isString(y)&&b.Redirects[y]){var j=f.extend({},v),E=j.duration,H=j.delay||0;return j.backwards===!0&&(g=f.extend(!0,[],g).reverse()),f.each(g,function(e,t){parseFloat(j.stagger)?j.delay=H+parseFloat(j.stagger)*e:m.isFunction(j.stagger)&&(j.delay=H+j.stagger.call(t,e,w)),j.drag&&(j.duration=parseFloat(E)||(/^(callout|transition)/.test(y)?1e3:h),j.duration=Math.max(j.duration*(j.backwards?1-e/w:(e+1)/w),.75*j.duration,200)),b.Redirects[y].call(t,t,j||{},e,w,g,k.promise?k:a)}),e()}var N="Velocity: First argument ("+y+") was not a property map, a known action, or a registered redirect. Aborting.";return k.promise?k.rejecter(new Error(N)):console.log(N),e()}A="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},R=[];f.each(g,function(e,t){m.isNode(t)&&n.call(t)});var z,j=f.extend({},b.defaults,v);if(j.loop=parseInt(j.loop),z=2*j.loop-1,j.loop)for(var O=0;z>O;O++){var q={delay:j.delay,progress:j.progress};O===z-1&&(q.display=j.display,q.visibility=j.visibility,q.complete=j.complete),P(g,"reverse",q)}return e()}};b=f.extend(P,b),b.animate=P;var w=t.requestAnimationFrame||g;return b.State.isMobile||r.hidden===a||r.addEventListener("visibilitychange",function(){r.hidden?(w=function(e){return setTimeout(function(){e(!0)},16)},c()):w=t.requestAnimationFrame||g}),e.Velocity=b,e!==t&&(e.fn.velocity=P,e.fn.velocity.defaults=b.defaults),f.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u=l.begin,c=l.complete,p={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},d={};l.display===a&&(l.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(i,i);for(var r in p){d[r]=e.style[r];var a=b.CSS.getPropertyValue(e,r);p[r]="Down"===t?[a,0]:[0,a]}d.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in d)e.style[t]=d[t];c&&c.call(i,i),s&&s.resolver(i)},b(e,p,l)}}),f.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u={opacity:"In"===t?1:0},c=l.complete;l.complete=n!==o-1?l.begin=null:function(){c&&c.call(i,i),s&&s.resolver(i)},l.display===a&&(l.display="In"===t?"auto":"none"),b(this,u,l)}}),b}(window.jQuery||window.Zepto||window,window,document)}));

/*!
 * bsCustomFileInput v1.3.2 (https://github.com/Johann-S/bs-custom-file-input)
 * Copyright 2018 - 2019 Johann-S <johann.servoire@gmail.com>
 * Licensed under MIT (https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.bsCustomFileInput = factory());
}(this, function () {
  'use strict';

  var Selector = {
    CUSTOMFILE: '.custom-file input[type="file"]',
    CUSTOMFILELABEL: '.custom-file-label',
    FORM: 'form',
    INPUT: 'input'
  };

  var textNodeType = 3;

  var getDefaultText = function getDefaultText(input) {
    var defaultText = '';
    var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

    if (label) {
      defaultText = label.innerHTML;
    }

    return defaultText;
  };

  var findFirstChildNode = function findFirstChildNode(element) {
    if (element.childNodes.length > 0) {
      var childNodes = [].slice.call(element.childNodes);

      for (var i = 0; i < childNodes.length; i++) {
        var node = childNodes[i];

        if (node.nodeType !== textNodeType) {
          return node;
        }
      }
    }

    return element;
  };

  var restoreDefaultText = function restoreDefaultText(input) {
    var defaultText = input.bsCustomFileInput.defaultText;
    var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

    if (label) {
      var element = findFirstChildNode(label);
      element.innerHTML = defaultText;
    }
  };

  var fileApi = !!window.File;
  var FAKE_PATH = 'fakepath';
  var FAKE_PATH_SEPARATOR = '\\';

  var getSelectedFiles = function getSelectedFiles(input) {
    if (input.hasAttribute('multiple') && fileApi) {
      return [].slice.call(input.files).map(function (file) {
        return file.name;
      }).join(', ');
    }

    if (input.value.indexOf(FAKE_PATH) !== -1) {
      var splittedValue = input.value.split(FAKE_PATH_SEPARATOR);
      return splittedValue[splittedValue.length - 1];
    }

    return input.value;
  };

  function handleInputChange() {
    var label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL);

    if (label) {
      var element = findFirstChildNode(label);
      var inputValue = getSelectedFiles(this);

      if (inputValue.length) {
        element.innerHTML = inputValue;
      } else {
        restoreDefaultText(this);
      }
    }
  }

  function handleFormReset() {
    var customFileList = [].slice.call(this.querySelectorAll(Selector.INPUT)).filter(function (input) {
      return !!input.bsCustomFileInput;
    });

    for (var i = 0, len = customFileList.length; i < len; i++) {
      restoreDefaultText(customFileList[i]);
    }
  }

  var customProperty = 'bsCustomFileInput';
  var Event = {
    FORMRESET: 'reset',
    INPUTCHANGE: 'change'
  };
  var bsCustomFileInput = {
    init: function init(inputSelector, formSelector) {
      if (inputSelector === void 0) {
        inputSelector = Selector.CUSTOMFILE;
      }

      if (formSelector === void 0) {
        formSelector = Selector.FORM;
      }

      var customFileInputList = [].slice.call(document.querySelectorAll(inputSelector));
      var formList = [].slice.call(document.querySelectorAll(formSelector));

      for (var i = 0, len = customFileInputList.length; i < len; i++) {
        var input = customFileInputList[i];
        Object.defineProperty(input, customProperty, {
          value: {
            defaultText: getDefaultText(input)
          },
          writable: true
        });
        handleInputChange.call(input);
        input.addEventListener(Event.INPUTCHANGE, handleInputChange);
      }

      for (var _i = 0, _len = formList.length; _i < _len; _i++) {
        formList[_i].addEventListener(Event.FORMRESET, handleFormReset);

        Object.defineProperty(formList[_i], customProperty, {
          value: true,
          writable: true
        });
      }
    },
    destroy: function destroy() {
      var formList = [].slice.call(document.querySelectorAll(Selector.FORM)).filter(function (form) {
        return !!form.bsCustomFileInput;
      });
      var customFileInputList = [].slice.call(document.querySelectorAll(Selector.INPUT)).filter(function (input) {
        return !!input.bsCustomFileInput;
      });

      for (var i = 0, len = customFileInputList.length; i < len; i++) {
        var input = customFileInputList[i];
        restoreDefaultText(input);
        input[customProperty] = undefined;
        input.removeEventListener(Event.INPUTCHANGE, handleInputChange);
      }

      for (var _i2 = 0, _len2 = formList.length; _i2 < _len2; _i2++) {
        formList[_i2].removeEventListener(Event.FORMRESET, handleFormReset);

        formList[_i2][customProperty] = undefined;
      }
    }
  };

  return bsCustomFileInput;

}));
//# sourceMappingURL=bs-custom-file-input.js.map

document.addEventListener("DOMContentLoaded", function () {

  bsCustomFileInput.init()
});

'use strict';

var WOW;

(function ($) {
  WOW = function WOW() {
    return {
      init: function init() {
        var animationName = [];
        var once = 1;

        function mdbWow() {
          var windowHeight = window.innerHeight;
          var scroll = window.scrollY;
          $('.wow').each(function () {
            if ($(this).css('visibility') == 'visible') {
              return;
            }

            if (windowHeight + scroll - 100 > getOffset(this) && scroll < getOffset(this) || windowHeight + scroll - 100 > getOffset(this) + $(this).height() && scroll < getOffset(this) + $(this).height() || windowHeight + scroll == $(document).height() && getOffset(this) + 100 > $(document).height()) {
              var index = $(this).index('.wow');
              var delay = $(this).attr('data-wow-delay');

              if (delay) {
                delay = $(this).attr('data-wow-delay').slice(0, -1);
                var self = this;
                var timeout = parseFloat(delay) * 1000;
                $(self).addClass('animated');
                $(self).css({
                  'visibility': 'visible'
                });
                $(self).css({
                  'animation-delay': delay
                });
                $(self).css({
                  'animation-name': animationName[index]
                });
                var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;

                if ($(this).attr('data-wow-delay')) {
                  removeTime += $(this).attr('data-wow-delay').slice(0, -1) * 1000;
                }

                var self = this;
                setTimeout(function () {
                  $(self).removeClass('animated');
                }, removeTime);
              } else {
                $(this).addClass('animated');
                $(this).css({
                  'visibility': 'visible'
                });
                $(this).css({
                  'animation-name': animationName[index]
                });
                var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;
                var self = this;
                setTimeout(function () {
                  $(self).removeClass('animated');
                }, removeTime);
              }
            }
          });
        }

        function appear() {
          $('.wow').each(function () {
            var index = $(this).index('.wow');
            var delay = $(this).attr('data-wow-delay');

            if (delay) {
              delay = $(this).attr('data-wow-delay').slice(0, -1);
              var timeout = parseFloat(delay) * 1000;
              $(this).addClass('animated');
              $(this).css({
                'visibility': 'visible'
              });
              $(this).css({
                'animation-delay': delay + 's'
              });
              $(this).css({
                'animation-name': animationName[index]
              });
            } else {
              $(this).addClass('animated');
              $(this).css({
                'visibility': 'visible'
              });
              $(this).css({
                'animation-name': animationName[index]
              });
            }
          });
        }

        function hide() {
          var windowHeight = window.innerHeight;
          var scroll = window.scrollY;
          $('.wow.animated').each(function () {
            if (windowHeight + scroll - 100 > getOffset(this) && scroll > getOffset(this) + 100 || windowHeight + scroll - 100 < getOffset(this) && scroll < getOffset(this) + 100 || getOffset(this) + $(this).height > $(document).height() - 100) {
              $(this).removeClass('animated');
              $(this).css({
                'animation-name': 'none'
              });
              $(this).css({
                'visibility': 'hidden'
              });
            } else {
              var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;

              if ($(this).attr('data-wow-delay')) {
                removeTime += $(this).attr('data-wow-delay').slice(0, -1) * 1000;
              }

              var self = this;
              setTimeout(function () {
                $(self).removeClass('animated');
              }, removeTime);
            }
          });
          mdbWow();
          once--;
        }

        function getOffset(elem) {
          var box = elem.getBoundingClientRect();
          var body = document.body;
          var docEl = document.documentElement;
          var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
          var clientTop = docEl.clientTop || body.clientTop || 0;
          var top = box.top + scrollTop - clientTop;
          return Math.round(top);
        }

        $('.wow').each(function () {
          $(this).css({
            'visibility': 'hidden'
          });
          animationName[$(this).index('.wow')] = $(this).css('animation-name');
          $(this).css({
            'animation-name': 'none'
          });
        });
        $(window).scroll(function () {
          if (once) {
            hide();
          } else {
            mdbWow();
          }
        });
        appear();
      }
    };
  };
})(jQuery);

window.WOW = WOW;
(function ($) {
  var SCROLLING_NAVBAR_OFFSET_TOP = 50;
  $(window).on('scroll', function () {
    var $navbar = $('.navbar');

    if ($navbar.length) {
      if ($navbar.offset().top > SCROLLING_NAVBAR_OFFSET_TOP) {
        $('.scrolling-navbar').addClass('top-nav-collapse');
      } else {
        $('.scrolling-navbar').removeClass('top-nav-collapse');
      }
    }
  });
})(jQuery);
/*!
 * Waves v0.7.6
 * http://fian.my.id/Waves
 *
 * Copyright 2014-2018 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */


(function (window, factory) {
  'use strict';

  // AMD. Register as an anonymous module.  Wrap in function so we have access
  // to root via `this`.
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      window.Waves = factory.call(window);
      return window.Waves;
    });
  }

  // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that support module.exports, like Node.
  else if (typeof exports === 'object') {
    module.exports = factory.call(window);
  }

  // Browser globals.
  else {
    window.Waves = factory.call(window);
  }
})(typeof window === 'object' ? window : this, function () {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);
  var toString = Object.prototype.toString;
  var isTouchAvailable = 'ontouchstart' in window;


  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function isObject(value) {
    var type = typeof value;
    return type === 'function' || type === 'object' && !!value;
  }

  function isDOMNode(obj) {
    return isObject(obj) && obj.nodeType > 0;
  }

  function getWavesElements(nodes) {
    var stringRepr = toString.call(nodes);

    if (stringRepr === '[object String]') {
      return $$(nodes);
    } else if (isObject(nodes) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
      return nodes;
    } else if (isDOMNode(nodes)) {
      return [nodes];
    }

    return [];
  }

  function offset(elem) {
    var docElem, win,
      box = {
        top: 0,
        left: 0
      },
      doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(styleObj) {
    var style = '';

    for (var prop in styleObj) {
      if (styleObj.hasOwnProperty(prop)) {
        style += (prop + ':' + styleObj[prop] + ';');
      }
    }

    return style;
  }

  var Effect = {

    // Effect duration
    duration: 750,

    // Effect delay (check for scroll before showing effect)
    delay: 200,

    show: function (e, element, velocity) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      element = element || this;

      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple waves-rippling';
      element.appendChild(ripple);

      // Get click coordinate and element width
      var pos = offset(element);
      var relativeY = 0;
      var relativeX = 0;
      // Support for touch devices
      if ('touches' in e && e.touches.length) {
        relativeY = (e.touches[0].pageY - pos.top);
        relativeX = (e.touches[0].pageX - pos.left);
      }
      //Normal case
      else {
        relativeY = (e.pageY - pos.top);
        relativeX = (e.pageX - pos.left);
      }
      // Support for synthetic events
      relativeX = relativeX >= 0 ? relativeX : 0;
      relativeY = relativeY >= 0 ? relativeY : 0;

      var scale = 'scale(' + ((element.clientWidth / 100) * 3) + ')';
      var translate = 'translate(0,0)';

      if (velocity) {
        translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-translate', translate);

      // Set ripple position
      var rippleStyle = {
        top: relativeY + 'px',
        left: relativeX + 'px'
      };

      ripple.classList.add('waves-notransition');
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.classList.remove('waves-notransition');

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale + ' ' + translate;
      rippleStyle['-moz-transform'] = scale + ' ' + translate;
      rippleStyle['-ms-transform'] = scale + ' ' + translate;
      rippleStyle['-o-transform'] = scale + ' ' + translate;
      rippleStyle.transform = scale + ' ' + translate;
      rippleStyle.opacity = '1';

      var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
      rippleStyle['-webkit-transition-duration'] = duration + 'ms';
      rippleStyle['-moz-transition-duration'] = duration + 'ms';
      rippleStyle['-o-transition-duration'] = duration + 'ms';
      rippleStyle['transition-duration'] = duration + 'ms';

      ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e, element) {
      element = element || this;

      var ripples = element.getElementsByClassName('waves-rippling');

      for (var i = 0, len = ripples.length; i < len; i++) {
        removeRipple(e, element, ripples[i]);
      }

      if (isTouchAvailable) {
        element.removeEventListener('touchend', Effect.hide);
        element.removeEventListener('touchcancel', Effect.hide);
      }

      element.removeEventListener('mouseup', Effect.hide);
      element.removeEventListener('mouseleave', Effect.hide);
    }
  };

  /**
   * Collection of wrapper for HTML element that only have single tag
   * like <input> and <img>
   */
  var TagWrapper = {

    // Wrap <input> tag so it can perform the effect
    input: function (element) {

      var parent = element.parentNode;

      // If input already have parent just pass through
      if (parent.tagName.toLowerCase() === 'span' && parent.classList.contains('waves-effect')) {
        return;
      }

      // Put element class and style to the specified parent
      var wrapper = document.createElement('span');
      wrapper.className = 'waves-input-wrapper';
      // element.className = 'waves-button-input';

      // Put element as child
      parent.replaceChild(wrapper, element);
      wrapper.appendChild(element);

    },

    // Wrap <img> tag so it can perform the effect
    img: function (element) {

      var parent = element.parentNode;

      // If input already have parent just pass through
      if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
        return;
      }

      // Put element as child
      var wrapper = document.createElement('i');
      parent.replaceChild(wrapper, element);
      wrapper.appendChild(element);

    }
  };

  /**
   * Hide the effect and remove the ripple. Must be
   * a separate function to pass the JSLint...
   */
  function removeRipple(e, el, ripple) {

    // Check if the ripple still exist
    if (!ripple) {
      return;
    }

    ripple.classList.remove('waves-rippling');

    var relativeX = ripple.getAttribute('data-x');
    var relativeY = ripple.getAttribute('data-y');
    var scale = ripple.getAttribute('data-scale');
    var translate = ripple.getAttribute('data-translate');

    // Get delay beetween mousedown and mouse leave
    var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    var delay = 350 - diff;

    if (delay < 0) {
      delay = 0;
    }

    if (e.type === 'mousemove') {
      delay = 150;
    }

    // Fade out ripple after delay
    var duration = e.type === 'mousemove' ? 2500 : Effect.duration;

    setTimeout(function () {

      var style = {
        top: relativeY + 'px',
        left: relativeX + 'px',
        opacity: '0',

        // Duration
        '-webkit-transition-duration': duration + 'ms',
        '-moz-transition-duration': duration + 'ms',
        '-o-transition-duration': duration + 'ms',
        'transition-duration': duration + 'ms',
        '-webkit-transform': scale + ' ' + translate,
        '-moz-transform': scale + ' ' + translate,
        '-ms-transform': scale + ' ' + translate,
        '-o-transform': scale + ' ' + translate,
        'transform': scale + ' ' + translate
      };

      ripple.setAttribute('style', convertStyle(style));

      setTimeout(function () {
        try {
          el.removeChild(ripple);
        } catch (e) {
          return false;
        }
      }, duration);

    }, delay);
  }


  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {

    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,

    allowEvent: function (e) {

      var allow = true;

      if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
        allow = false;
      }

      return allow;
    },
    registerEvent: function (e) {
      var eType = e.type;

      if (eType === 'touchstart') {

        TouchHandler.touches += 1; // push

      } else if (/^(touchend|touchcancel)$/.test(eType)) {

        setTimeout(function () {
          if (TouchHandler.touches) {
            TouchHandler.touches -= 1; // pop after 500ms
          }
        }, 500);

      }
    }
  };


  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {

    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentElement) {
      if ((!(target instanceof SVGElement)) && target.classList.contains('waves-effect')) {
        element = target;
        break;
      }
      target = target.parentElement;
    }

    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {

    // Disable effect if element has "disabled" property on it
    // In some cases, the event is not triggered by the current element
    // if (e.target.getAttribute('disabled') !== null) {
    //     return;
    // }

    var element = getWavesEffectElement(e);

    if (element !== null) {

      // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
      if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
        return;
      }

      TouchHandler.registerEvent(e);

      if (e.type === 'touchstart' && Effect.delay) {

        var hidden = false;

        var timer = setTimeout(function () {
          timer = null;
          Effect.show(e, element);
        }, Effect.delay);

        var hideEffect = function (hideEvent) {

          // if touch hasn't moved, and effect not yet started: start effect now
          if (timer) {
            clearTimeout(timer);
            timer = null;
            Effect.show(e, element);
          }
          if (!hidden) {
            hidden = true;
            Effect.hide(hideEvent, element);
          }

          removeListeners();
        };

        var touchMove = function (moveEvent) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          hideEffect(moveEvent);

          removeListeners();
        };

        element.addEventListener('touchmove', touchMove, false);
        element.addEventListener('touchend', hideEffect, false);
        element.addEventListener('touchcancel', hideEffect, false);

        var removeListeners = function () {
          element.removeEventListener('touchmove', touchMove);
          element.removeEventListener('touchend', hideEffect);
          element.removeEventListener('touchcancel', hideEffect);
        };
      } else {

        Effect.show(e, element);

        if (isTouchAvailable) {
          element.addEventListener('touchend', Effect.hide, false);
          element.addEventListener('touchcancel', Effect.hide, false);
        }

        element.addEventListener('mouseup', Effect.hide, false);
        element.addEventListener('mouseleave', Effect.hide, false);
      }
    }
  }

  Waves.init = function (options) {
    var body = document.body;

    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    if ('delay' in options) {
      Effect.delay = options.delay;
    }

    if (isTouchAvailable) {
      body.addEventListener('touchstart', showEffect, false);
      body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
      body.addEventListener('touchend', TouchHandler.registerEvent, false);
    }

    body.addEventListener('mousedown', showEffect, false);
  };


  /**
   * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
   * waves classes to a set of elements. Set drag to true if the ripple mouseover
   * or skimming effect should be applied to the elements.
   */
  Waves.attach = function (elements, classes) {

    elements = getWavesElements(elements);

    if (toString.call(classes) === '[object Array]') {
      classes = classes.join(' ');
    }

    classes = classes ? ' ' + classes : '';

    var element, tagName;

    for (var i = 0, len = elements.length; i < len; i++) {

      element = elements[i];
      tagName = element.tagName.toLowerCase();

      if (['input', 'img'].indexOf(tagName) !== -1) {
        TagWrapper[tagName](element);
        element = element.parentElement;
      }

      if (element.className.indexOf('waves-effect') === -1) {
        element.className += ' waves-effect' + classes;
      }
    }
  };


  /**
   * Cause a ripple to appear in an element via code.
   */
  Waves.ripple = function (elements, options) {
    elements = getWavesElements(elements);
    var elementsLen = elements.length;

    options = options || {};
    options.wait = options.wait || 0;
    options.position = options.position || null; // default = centre of element


    if (elementsLen) {
      var element, pos, off, centre = {},
        i = 0;
      var mousedown = {
        type: 'mousedown',
        button: 1
      };
      var hideRipple = function (mouseup, element) {
        return function () {
          Effect.hide(mouseup, element);
        };
      };

      for (; i < elementsLen; i++) {
        element = elements[i];
        pos = options.position || {
          x: element.clientWidth / 2,
          y: element.clientHeight / 2
        };

        off = offset(element);
        centre.x = off.left + pos.x;
        centre.y = off.top + pos.y;

        mousedown.pageX = centre.x;
        mousedown.pageY = centre.y;

        Effect.show(mousedown, element);

        if (options.wait >= 0 && options.wait !== null) {
          var mouseup = {
            type: 'mouseup',
            button: 1
          };

          setTimeout(hideRipple(mouseup, element), options.wait);
        }
      }
    }
  };

  /**
   * Remove all ripples from an element.
   */
  Waves.calm = function (elements) {
    elements = getWavesElements(elements);
    var mouseup = {
      type: 'mouseup',
      button: 1
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      Effect.hide(mouseup, elements[i]);
    }
  };

  /**
   * Deprecated API fallback
   */
  Waves.displayEffect = function (options) {
    console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
    Waves.init(options);
  };

  return Waves;
});
$(document).ready(function () {
  //Initialization
  Waves.attach('.btn:not(.btn-flat), .btn-floating', ['waves-light']);
  Waves.attach('.btn-flat', ['waves-effect']);
  Waves.attach('.chip', ['waves-effect']);
  Waves.attach('.view a .mask', ['waves-light']);
  Waves.attach('.waves-light', ['waves-light']);
  Waves.attach('.navbar-nav a:not(.navbar-brand), .nav-icons li a, .nav-tabs .nav-item:not(.dropdown)', ['waves-light']);
  Waves.attach('.pager li a', ['waves-light']);
  Waves.attach('.pagination .page-item .page-link', ['waves-effect']);
  Waves.init();
});

var _this = this;

(function ($) {
  var inputSelector = ['text', 'password', 'email', 'url', 'tel', 'number', 'search', 'search-md'].map(function (selector) {
    return "input[type=" + selector + "]";
  }).join(', ') + ", textarea";
  var textAreaSelector = '.materialize-textarea';

  var updateTextFields = function updateTextFields($input) {
    var $labelAndIcon = $input.siblings('label, i');
    var hasValue = $input.val().length;
    var hasPlaceholder = $input.attr('placeholder');
    var addOrRemove = (hasValue || hasPlaceholder ? 'add' : 'remove') + "Class";
    $labelAndIcon[addOrRemove]('active');
  };

  var validateField = function validateField($input) {
    if ($input.hasClass('validate')) {
      var value = $input.val();
      var noValue = !value.length;
      var isValid = !$input[0].validity.badInput;

      if (noValue && isValid) {
        $input.removeClass('valid').removeClass('invalid');
      } else {
        var valid = $input.is(':valid');
        var length = Number($input.attr('length')) || 0;

        if (valid && (!length || length > value.length)) {
          $input.removeClass('invalid').addClass('valid');
        } else {
          $input.removeClass('valid').addClass('invalid');
        }
      }
    }
  };

  var textAreaAutoResize = function textAreaAutoResize() {
    var $textarea = $(_this);

    if ($textarea.val().length) {
      var $hiddenDiv = $('.hiddendiv');
      var fontFamily = $textarea.css('font-family');
      var fontSize = $textarea.css('font-size');

      if (fontSize) {
        $hiddenDiv.css('font-size', fontSize);
      }

      if (fontFamily) {
        $hiddenDiv.css('font-family', fontFamily);
      }

      if ($textarea.attr('wrap') === 'off') {
        $hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
      }

      $hiddenDiv.text($textarea.val() + "\n");
      var content = $hiddenDiv.html().replace(/\n/g, '<br>');
      $hiddenDiv.html(content); // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      $hiddenDiv.css('width', $textarea.is(':visible') ? $textarea.width() : $(window).width() / 2);
      $textarea.css('height', $hiddenDiv.height());
    }
  };

  $(inputSelector).each(function (index, input) {
    var $this = $(input);
    var $labelAndIcon = $this.siblings('label, i');
    updateTextFields($this);
    var isValid = input.validity.badInput;

    if (isValid) {
      $labelAndIcon.addClass('active');
    }
  });
  $(document).on('focus', inputSelector, function (e) {
    $(e.target).siblings('label, i').addClass('active');
  });
  $(document).on('blur', inputSelector, function (e) {
    var $this = $(e.target);
    var noValue = !$this.val();
    var invalid = !e.target.validity.badInput;
    var noPlaceholder = $this.attr('placeholder') === undefined;

    if (noValue && invalid && noPlaceholder) {
      $this.siblings('label, i').removeClass('active');
    }

    validateField($this);
  });
  $(document).on('change', inputSelector, function (e) {
    var $this = $(e.target);
    updateTextFields($this);
    validateField($this);
  });
  $('input[autofocus]').siblings('label, i').addClass('active');
  $(document).on('reset', function (e) {
    var $formReset = $(e.target);

    if ($formReset.is('form')) {
      var $formInputs = $formReset.find(inputSelector);
      $formInputs.removeClass('valid').removeClass('invalid').each(function (index, input) {
        var $this = $(input);
        var noDefaultValue = !$this.val();
        var noPlaceholder = !$this.attr('placeholder');

        if (noDefaultValue && noPlaceholder) {
          $this.siblings('label, i').removeClass('active');
        }
      });
      $formReset.find('select.initialized').each(function (index, select) {
        var $select = $(select);
        var $visibleInput = $select.siblings('input.select-dropdown');
        var defaultValue = $select.children('[selected]').val();
        $select.val(defaultValue);
        $visibleInput.val(defaultValue);
      });
    }
  });

  function init() {
    var $text = $('.md-textarea-auto');

    if ($text.length) {
      var observe;

      if (window.attachEvent) {
        observe = function observe(element, event, handler) {
          element.attachEvent("on" + event, handler);
        };
      } else {
        observe = function observe(element, event, handler) {
          element.addEventListener(event, handler, false);
        };
      }

      $text.each(function () {
        var self = this;

        function resize() {
          self.style.height = 'auto';
          self.style.height = self.scrollHeight + "px";
        }

        function delayedResize() {
          window.setTimeout(resize, 0);
        }

        observe(self, 'change', resize);
        observe(self, 'cut', delayedResize);
        observe(self, 'paste', delayedResize);
        observe(self, 'drop', delayedResize);
        observe(self, 'keydown', delayedResize);
        resize();
      });
    }
  }

  init();
  var $body = $('body');

  if (!$('.hiddendiv').first().length) {
    var $hiddenDiv = $('<div class="hiddendiv common"></div>');
    $body.append($hiddenDiv);
  }

  $(textAreaSelector).each(textAreaAutoResize);
  $body.on('keyup keydown', textAreaSelector, textAreaAutoResize);
  var $dateInputs = $('input[type="date"]');
  $dateInputs.each(function (index, $item) {
    $item.type = 'text';
  });
  $dateInputs.on('focus', function ($item) {
    $item.target.type = 'date';
  });
  $dateInputs.on('blur', function ($item) {
    $item.target.type = 'text';
    $("label[for=" + $item.target.id + "]").removeClass('active');
  });
})(jQuery);
// 'use strict';
var loader_path = '../dev/dist/mdb-addons/preloader.html';
var windowLoaded = false;
$(window).on('load', function () {
  windowLoaded = true;
});
$(document).ready(function () {
  $('body').attr('aria-busy', true);
  $('#preloader-markup').load(loader_path, function () {
    if (windowLoaded) {
      $('#mdb-preloader').fadeOut('slow');
      $('body').removeAttr('aria-busy');
    } else {
      $(window).on('load', function () {
        $('#mdb-preloader').fadeOut('slow');
        $('body').removeAttr('aria-busy');
      });
    }
  });
});
jQuery(function ($) {
  $(document).on('click.card', '.card', function (e) {
    var $this = $(this);
    var $reveal = $this.find('.card-reveal');

    if ($reveal.length) {
      var $clickedElem = $(e.target);
      var isTitleClicked = $clickedElem.is('.card-reveal .card-title');
      var isTitleIconClicked = $clickedElem.is('.card-reveal .card-title i');
      var isActivatorClicked = $clickedElem.is('.card .activator');
      var isActivatorIconClicked = $clickedElem.is('.card .activator i');

      if (isTitleClicked || isTitleIconClicked) {
        takeRevealDown($reveal);
      } else if (isActivatorClicked || isActivatorIconClicked) {
        takeRevealUp($reveal);
      }
    }
  });

  var takeRevealUp = function takeRevealUp(revealElem) {
    revealElem.css({
      display: 'block'
    }).velocity({
      translateY: '-100%'
    }, {
      duration: 300,
      queue: false,
      easing: 'easeInOutQuad'
    });
  };

  var takeRevealDown = function takeRevealDown(revealElem) {
    revealElem.velocity({
      translateY: 0
    }, {
      duration: 225,
      queue: false,
      easing: 'easeInOutQuad',
      complete: function complete() {
        revealElem.css({
          display: 'none'
        });
      }
    });
  };

  $('.rotate-btn').on('click', function () {
    $(this).closest('.card').toggleClass('flipped');
  });
  $(window).on('load', function () {
    var $rotatingCards = $('.card-rotating');
    $rotatingCards.each(function () {
      var $this = $(this);
      var $cardWrapper = $this.parent();
      var $front = $this.find('.front');
      var $back = $this.find('.back');
      var $frontHeight = $this.find('.front').outerHeight();
      var $backHeight = $this.find('.back').outerHeight();
      if ($frontHeight > $backHeight) $($cardWrapper, $back).height($frontHeight);else if ($frontHeight < $backHeight) $($cardWrapper, $front).height($backHeight);else $($cardWrapper).height($backHeight);
    });
  });
  $('.card-share > a').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('share-expanded').parent().find('div').toggleClass('social-reveal-active');
  });
  $('.map-card').on('click', function () {
    $(this).find('.card-body').toggleClass('closed');
  });
});
jQuery(function ($) {
  $.fn.characterCounter = function () {
    return this.each(function () {
      var $this = $(this);
      var hasLengthAttribute = $this.attr('length') !== undefined;

      if (hasLengthAttribute) {
        $this.on('input focus', updateCounter);
        $this.on('blur', removeCounterElement);
        addCounterElement($this);
      }
    });
  };

  function updateCounter() {
    var $this = $(this);
    var maxLength = Number($this.attr('length'));
    var actualLength = Number($this.val().length);
    var isValidLength = actualLength <= maxLength;
    $this.parent().find('span[class="character-counter"]').html(actualLength + "/" + maxLength);
    addInputStyle(isValidLength, $this);
  }

  function addCounterElement($input) {
    var $counterElement = $('<span/>').addClass('character-counter').css('float', 'right').css('font-size', '12px').css('height', 1);
    $input.parent().append($counterElement);
  }

  function removeCounterElement() {
    $(this).parent().find('span[class="character-counter"]').html('');
  }

  function addInputStyle(isValidLength, $input) {
    var inputHasInvalidClass = $input.hasClass('invalid');

    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass('invalid');
    } else if (!isValidLength && !inputHasInvalidClass) {
      $input.removeClass('valid');
      $input.addClass('invalid');
    }
  }

  $(document).ready(function () {
    $('input, textarea').characterCounter();
  });
});
/*
 * Toastr
 * Copyright 2012-2015
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/CodeSeven/toastr
 */
/* global define */
; (function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.1',
                warning: warning
            };

            var previousToast;

            return toastr;

            ////////////////

            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if (create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement, clearOptions) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearToast($toastElement, options, clearOptions)) {
                    clearContainer(options);
                }
            }

            function remove($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    removeToast($toastElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }

            // internal functions

            function clearContainer (options) {
                var toastsToClear = $container.children();
                for (var i = toastsToClear.length - 1; i >= 0; i--) {
                    clearToast($(toastsToClear[i]), options);
                }
            }

            function clearToast ($toastElement, options, clearOptions) {
                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass)
                    .attr('aria-live', 'polite')
                    .attr('role', 'alert');

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'md-toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'md-toast-error',
                        info: 'md-toast-info',
                        success: 'md-toast-success',
                        warning: 'md-toast-warning'
                    },
                    iconClass: 'md-toast-info',
                    positionClass: 'md-toast-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'md-toast-title',
                    messageClass: 'md-toast-message',
                    target: 'body',
                    closeHtml: '<button type="button">&times;</button>',
                    newestOnTop: true,
                    preventDuplicates: false,
                    progressBar: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions();
                var iconClass = map.iconClass || options.iconClass;

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                if (shouldExit(options, map)) { return; }

                toastId++;

                $container = getContainer(options, true);

                var intervalId = null;
                var $toastElement = $('<div/>');
                var $titleElement = $('<div/>');
                var $messageElement = $('<div/>');
                var $progressElement = $('<div/>');
                var $closeElement = $(options.closeHtml);
                var progressBar = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                };
                var response = {
                    toastId: toastId,
                    state: 'visible',
                    startTime: new Date(),
                    options: options,
                    map: map
                };

                personalizeToast();

                displayToast();

                handleEvents();

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function personalizeToast() {
                    setIcon();
                    setTitle();
                    setMessage();
                    setCloseButton();
                    setProgressBar();
                    setSequence();
                }

                function handleEvents() {
                    $toastElement.hover(stickAround, delayedHideToast);
                    if (!options.onclick && options.tapToDismiss) {
                        $toastElement.click(hideToast);
                    }

                    if (options.closeButton && $closeElement) {
                        $closeElement.click(function (event) {
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                                event.cancelBubble = true;
                            }
                            hideToast(true);
                        });
                    }

                    if (options.onclick) {
                        $toastElement.click(function () {
                            options.onclick();
                            hideToast();
                        });
                    }
                }

                function displayToast() {
                    $toastElement.hide();

                    $toastElement[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                    );

                    if (options.timeOut > 0) {
                        intervalId = setTimeout(hideToast, options.timeOut);
                        progressBar.maxHideTime = parseFloat(options.timeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        if (options.progressBar) {
                            progressBar.intervalId = setInterval(updateProgress, 10);
                        }
                    }
                }

                function setIcon() {
                    if (map.iconClass) {
                        $toastElement.addClass(options.toastClass).addClass(iconClass);
                    }
                }

                function setSequence() {
                    if (options.newestOnTop) {
                        $container.prepend($toastElement);
                    } else {
                        $container.append($toastElement);
                    }
                }

                function setTitle() {
                    if (map.title) {
                        $titleElement.append(map.title).addClass(options.titleClass);
                        $toastElement.append($titleElement);
                    }
                }

                function setMessage() {
                    if (map.message) {
                        $messageElement.append(map.message).addClass(options.messageClass);
                        $toastElement.append($messageElement);
                    }
                }

                function setCloseButton() {
                    if (options.closeButton) {
                        $closeElement.addClass('md-toast-close-button').attr('role', 'button');
                        $toastElement.prepend($closeElement);
                    }
                }

                function setProgressBar() {
                    if (options.progressBar) {
                        $progressElement.addClass('md-toast-progress');
                        $toastElement.prepend($progressElement);
                    }
                }

                function shouldExit(options, map) {
                    if (options.preventDuplicates) {
                        if (map.message === previousToast) {
                            return true;
                        } else {
                            previousToast = map.message;
                        }
                    }
                    return false;
                }

                function hideToast(override) {
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    clearTimeout(progressBar.intervalId);
                    return $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () {
                            removeToast($toastElement);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    progressBar.hideEta = 0;
                    $toastElement.stop(true, true)[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing}
                    );
                }

                function updateProgress() {
                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                    $progressElement.width(percentage + '%');
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                    previousToast = undefined;
                }
            }

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window['toastr'] = factory(window['jQuery']);
    }
}));

var SMOOTH_SCROLL_DURATION = 700;
$('.smooth-scroll').on('click', 'a', function () {
  var elAttr = $(this).attr('href');

  if (typeof elAttr !== typeof undefined && elAttr.indexOf('#') === 0) {
    var offset = $(this).attr('data-offset') ? $(this).attr('data-offset') : 0;
    var setHash = $(this).parentsUntil('.smooth-scroll').last().parent().attr('data-allow-hashes');
    $('body,html').animate({
      scrollTop: $(elAttr).offset().top - offset
    }, SMOOTH_SCROLL_DURATION);

    if (typeof setHash !== typeof undefined && setHash !== false) {
      history.replaceState(null, null, elAttr);
    }

    return false;
  }
});
jQuery(function ($) {
  var isTouchDevice = 'ontouchstart' in document.documentElement;

  var toggleOpen = function toggleOpen(btn, open) {
    if (open && !btn.hasClass('active') || !open && btn.hasClass('active')) {
      btn[open ? 'addClass' : 'removeClass']('active');
      var btnList = document.querySelectorAll('ul .btn-floating');
      btnList.forEach(function (el) {
        return el.classList[open ? 'add' : 'remove']('shown');
      });
    }
  };

  var handleClick = function handleClick(btn) {
    if (btn.hasClass('active')) {
      toggleOpen(btn, false);
    } else {
      toggleOpen(btn, true);
    }
  };

  var $btn = $('.fixed-action-btn:not(.smooth-scroll) > .btn-floating');
  $btn.on('mouseenter', function (e) {
    if (!isTouchDevice) {
      toggleOpen($(e.currentTarget).parent(), true);
    }
  });
  $btn.parent().on('mouseleave', function (e) {
    return toggleOpen($(e.currentTarget), false);
  });
  $btn.on('click', function (e) {
    e.preventDefault();
    handleClick($(e.currentTarget).parent());
  });
  $.fn.extend({
    openFAB: function openFAB() {
      toggleOpen($(this), true);
    },
    closeFAB: function closeFAB() {
      toggleOpen($(this), false);
    }
  });
});
jQuery(function ($) {
  var SideNav =
  /*#__PURE__*/
  function () {
    function SideNav(element, options) {
      this.settings = {
        menuLeftMinBorder: 0.3,
        menuLeftMaxBorder: -0.5,
        menuRightMinBorder: -0.3,
        menuRightMaxBorder: 0.5,
        menuVelocityOffset: 10
      };
      this.defaults = {
        menuWidth: 240,
        edge: 'left',
        closeOnClick: false,
        breakpoint: 1440,
        timeDurationOpen: 300,
        timeDurationClose: 200,
        timeDurationOverlayOpen: 50,
        timeDurationOverlayClose: 200,
        easingOpen: 'easeOutQuad',
        easingClose: 'easeOutCubic',
        showOverlay: true,
        showCloseButton: false,
        slim: false
      };
      this.$element = element;
      this.$elementCloned = element.clone().css({
        display: 'inline-block',
        lineHeight: '24px'
      });
      this.options = this.assignOptions(options);
      this.menuOut = false;
      this.lastTouchVelocity = {
        x: {
          startPosition: 0,
          startTime: 0,
          endPosition: 0,
          endTime: 0
        }
      };
      this.$body = $('body');
      this.$menu = $("#" + this.$element.attr('data-activates'));
      this.$sidenavOverlay = $('#sidenav-overlay');
      this.$dragTarget = $('<div class="drag-target"></div>');
      this.$body.append(this.$dragTarget);
    }

    var _proto = SideNav.prototype;

    _proto.assignOptions = function assignOptions(newOptions) {
      return $.extend({}, this.defaults, newOptions);
    };

    _proto.init = function init() {
      this.setMenuWidth();
      this.setMenuTranslation();
      this.closeOnClick();
      this.openOnClick();
      this.bindTouchEvents();
      this.showCloseButton();
      this.inputOnClick();

      if (this.options.slim === true) {
        this.handleSlim();
      }
    };

    _proto.setMenuWidth = function setMenuWidth() {
      var $sidenavBg = $("#" + this.$menu.attr('id')).find('> .sidenav-bg');
      this.$menu.css('width', this.options.menuWidth);
      $sidenavBg.css('width', this.options.menuWidth);
    };

    _proto.setMenuTranslation = function setMenuTranslation() {
      var _this = this;

      if (this.options.edge === 'left') {
        this.$menu.css('transform', 'translateX(-100%)');
        this.$dragTarget.css({
          left: 0
        });
      } else {
        this.$menu.addClass('right-aligned').css('transform', 'translateX(100%)');
        this.$dragTarget.css({
          right: 0
        });
      }

      if (!this.$menu.hasClass('fixed')) {
        return;
      }

      if (window.innerWidth > this.options.breakpoint) {
        this.$menu.css('transform', 'translateX(0)');
      }

      this.$menu.find('input[type=text]').on('touchstart', function () {
        _this.$menu.addClass('transform-fix-input');
      });
      $(window).on('resize', function () {
        if (window.innerWidth > _this.options.breakpoint) {
          if (_this.$sidenavOverlay.length) {
            _this.removeMenu(true);
          } else {
            _this.$menu.css('transform', 'translateX(0%)');
          }
        } else if (_this.menuOut === false) {
          var xValue = _this.options.edge === 'left' ? '-100' : '100';

          _this.$menu.css('transform', "translateX(" + xValue + "%)");
        }
      });
    };

    _proto.closeOnClick = function closeOnClick() {
      var _this2 = this;

      if (this.options.closeOnClick === true) {
        this.$menu.on('click', 'a:not(.collapsible-header)', function () {
          return _this2.removeMenu();
        });

        if (this.$menu.css('transform') === 'translateX(0)') {
          this.$menu.on('click', function () {
            return _this2.removeMenu();
          });
        }
      }
    };

    _proto.openOnClick = function openOnClick() {
      var _this3 = this;

      // eslint-disable-next-line consistent-return
      this.$element.on('click', function (e) {
        e.preventDefault();

        if (_this3.menuOut === true) {
          return _this3.removeMenu();
        }

        if (_this3.options.showOverlay === true) {
          if (!$('#sidenav-overlay').length) {
            _this3.$sidenavOverlay = $('<div id="sidenav-overlay"></div>');

            _this3.$body.append(_this3.$sidenavOverlay);
          }
        } else {
          _this3.showCloseButton();
        }

        var translateX = [];

        if (_this3.options.edge === 'left') {
          translateX = [0, -1 * _this3.options.menuWidth];
        } else {
          translateX = [0, _this3.options.menuWidth];
        }

        if (_this3.$menu.css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
          _this3.$menu.velocity({
            translateX: translateX
          }, {
            duration: _this3.options.timeDurationOpen,
            queue: false,
            easing: _this3.options.easingOpen
          });
        }

        _this3.$sidenavOverlay.on('click', function () {
          return _this3.removeMenu();
        });

        _this3.$sidenavOverlay.on('touchmove', _this3.touchmoveEventHandler.bind(_this3));

        _this3.$menu.on('touchmove', function (e) {
          e.preventDefault();

          _this3.$menu.find('.custom-scrollbar').css('padding-bottom', '30px');
        });

        _this3.menuOut = true;
      });
    };

    _proto.bindTouchEvents = function bindTouchEvents() {
      var _this4 = this;

      this.$dragTarget.on('click', function () {
        return _this4.removeMenu();
      });
      this.$dragTarget.on('touchstart', function (e) {
        _this4.lastTouchVelocity.x.startPosition = e.touches[0].clientX;
        _this4.lastTouchVelocity.x.startTime = Date.now();
      });
      this.$dragTarget.on('touchmove', this.touchmoveEventHandler.bind(this));
      this.$dragTarget.on('touchend', this.touchendEventHandler.bind(this));
    };

    _proto.showCloseButton = function showCloseButton() {
      if (this.options.showCloseButton === true) {
        this.$menu.prepend(this.$elementCloned);
        this.$menu.find('.logo-wrapper').css({
          borderTop: '1px solid rgba(153,153,153,.3)'
        });
      }
    };

    _proto.inputOnClick = function inputOnClick() {
      var _this5 = this;

      this.$menu.find('input[type=text]').on('touchstart', function () {
        return _this5.$menu.css('transform', 'translateX(0)');
      });
    };

    _proto.removeMenu = function removeMenu(restoreMenu) {
      var _this6 = this;

      this.$body.css({
        overflow: '',
        width: ''
      });
      this.$menu.velocity({
        translateX: this.options.edge === 'left' ? '-100%' : '100%'
      }, {
        duration: this.options.timeDurationClose,
        queue: false,
        easing: this.options.easingClose,
        complete: function complete() {
          if (restoreMenu === true) {
            _this6.$menu.removeAttr('style');

            _this6.$menu.css('width', _this6.options.menuWidth);
          }
        }
      });
      this.$menu.removeClass('transform-fix-input');
      this.hideSidenavOverlay();
      this.menuOut = false;
    };

    _proto.handleSlim = function handleSlim() {
      var _this7 = this;

      var $toggle = $('#toggle');
      $toggle.on('click', function () {
        if (_this7.$menu.hasClass('slim')) {
          _this7.$menu.removeClass('slim');

          $('.sv-slim-icon').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
          $('.fixed-sn .double-nav').css({
            transition: 'all .3s ease-in-out',
            'padding-left': '15.9rem'
          });
          $('.fixed-sn main, .fixed-sn footer').css({
            transition: 'all .3s ease-in-out',
            'padding-left': '15rem'
          });
        } else {
          _this7.$menu.addClass('slim');

          $('.sv-slim-icon').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
          $('.fixed-sn .double-nav').css('padding-left', '4.6rem');
          $('.fixed-sn main, .fixed-sn footer').css({
            'padding-left': '3.7rem'
          });
        }
      });
    };

    _proto.touchmoveEventHandler = function touchmoveEventHandler(e) {
      if (e.type !== 'touchmove') {
        return;
      }

      var _e$touches = e.touches,
          touch = _e$touches[0];
      var touchX = touch.clientX; // calculate velocity every 20ms

      if (Date.now() - this.lastTouchVelocity.x.startTime > 20) {
        this.lastTouchVelocity.x.startPosition = touch.clientX;
        this.lastTouchVelocity.x.startTime = Date.now();
      }

      this.disableScrolling();
      var overlayExists = this.$sidenavOverlay.length !== 0;

      if (!overlayExists) {
        this.buildSidenavOverlay();
      } // Keep within boundaries


      if (this.options.edge === 'left') {
        if (touchX > this.options.menuWidth) {
          touchX = this.options.menuWidth;
        } else if (touchX < 0) {
          touchX = 0;
        }
      }

      this.translateSidenavX(touchX);
      this.updateOverlayOpacity(touchX);
    };

    _proto.calculateTouchVelocityX = function calculateTouchVelocityX() {
      var distance = Math.abs(this.lastTouchVelocity.x.endPosition - this.lastTouchVelocity.x.startPosition);
      var time = Math.abs(this.lastTouchVelocity.x.endTime - this.lastTouchVelocity.x.startTime);
      return distance / time;
    };

    _proto.touchendEventHandler = function touchendEventHandler(e) {
      if (e.type !== 'touchend') {
        return;
      }

      var touch = e.changedTouches[0];
      this.lastTouchVelocity.x.endTime = Date.now();
      this.lastTouchVelocity.x.endPosition = touch.clientX;
      var velocityX = this.calculateTouchVelocityX();
      var touchX = touch.clientX;
      var leftPos = touchX - this.options.menuWidth;
      var rightPos = touchX - this.options.menuWidth / 2;

      if (leftPos > 0) {
        leftPos = 0;
      }

      if (rightPos < 0) {
        rightPos = 0;
      }

      if (this.options.edge === 'left') {
        // If velocityX <= 0.3 then the user is flinging the menu closed so ignore this.menuOut
        if (this.menuOut || velocityX <= this.settings.menuLeftMinBorder || velocityX < this.options.menuLeftMaxBorder) {
          if (leftPos !== 0) {
            this.translateMenuX([0, leftPos], '300');
          }

          this.showSidenavOverlay();
        } else if (!this.menuOut || velocityX > this.settings.menuLeftMinBorder) {
          this.enableScrolling();
          this.translateMenuX([-1 * this.options.menuWidth - this.options.menuVelocityOffset, leftPos], '200');
          this.hideSidenavOverlay();
        }

        this.$dragTarget.css({
          width: '10px',
          right: '',
          left: 0
        });
      } else if (this.menuOut && velocityX >= this.settings.menuRightMinBorder || velocityX > this.settings.menuRightMaxBorder) {
        this.translateMenuX([0, rightPos], '300');
        this.showSidenavOverlay();
        this.$dragTarget.css({
          width: '50%',
          right: '',
          left: 0
        });
      } else if (!this.menuOut || velocityX < this.settings.menuRightMinBorder) {
        this.enableScrolling();
        this.translateMenuX([this.options.menuWidth + this.options.menuVelocityOffset, rightPos], '200');
        this.hideSidenavOverlay();
        this.$dragTarget.css({
          width: '10px',
          right: 0,
          left: ''
        });
      }
    };

    _proto.buildSidenavOverlay = function buildSidenavOverlay() {
      var _this8 = this;

      if (this.options.showOverlay === true) {
        this.$sidenavOverlay = $('<div id="sidenav-overlay"></div>');
        this.$sidenavOverlay.css('opacity', 0).on('click', function () {
          return _this8.removeMenu();
        });
        this.$body.append(this.$sidenavOverlay);
      }
    };

    _proto.disableScrolling = function disableScrolling() {
      var oldWidth = this.$body.innerWidth();
      this.$body.css('overflow', 'hidden');
      this.$body.width(oldWidth);
    };

    _proto.enableScrolling = function enableScrolling() {
      this.$body.css({
        overflow: '',
        width: ''
      });
    };

    _proto.translateMenuX = function translateMenuX(fromTo, duration) {
      this.$menu.velocity({
        translateX: fromTo
      }, {
        duration: typeof duration === 'string' ? Number(duration) : duration,
        queue: false,
        easing: this.options.easingOpen
      });
    };

    _proto.translateSidenavX = function translateSidenavX(touchX) {
      if (this.options.edge === 'left') {
        var isRightDirection = touchX >= this.options.menuWidth / 2;
        this.menuOut = isRightDirection;
        this.$menu.css('transform', "translateX(" + (touchX - this.options.menuWidth) + "px)");
      } else {
        var isLeftDirection = touchX < window.innerWidth - this.options.menuWidth / 2;
        this.menuOut = isLeftDirection;
        var rightPos = touchX - this.options.menuWidth / 2;

        if (rightPos < 0) {
          rightPos = 0;
        }

        this.$menu.css('transform', "translateX(" + rightPos + "px)");
      }
    };

    _proto.updateOverlayOpacity = function updateOverlayOpacity(touchX) {
      var overlayPercentage;

      if (this.options.edge === 'left') {
        overlayPercentage = touchX / this.options.menuWidth;
      } else {
        overlayPercentage = Math.abs((touchX - window.innerWidth) / this.options.menuWidth);
      }

      this.$sidenavOverlay.velocity({
        opacity: overlayPercentage
      }, {
        duration: 10,
        queue: false,
        easing: this.options.easingOpen
      });
    };

    _proto.showSidenavOverlay = function showSidenavOverlay() {
      if (this.options.showOverlay === true && !$('#sidenav-overlay').length) {
        this.buildSidenavOverlay();
      }

      this.$sidenavOverlay.velocity({
        opacity: 1
      }, {
        duration: this.options.timeDurationOverlayOpen,
        queue: false,
        easing: this.options.easingOpen
      });
    };

    _proto.hideSidenavOverlay = function hideSidenavOverlay() {
      this.$sidenavOverlay.velocity({
        opacity: 0
      }, {
        duration: this.options.timeDurationOverlayClose,
        queue: false,
        easing: this.options.easingOpen,
        complete: function complete() {
          $(this).remove();
        }
      });
    };

    return SideNav;
  }();

  $.fn.sideNav = function (options) {
    $(this).each(function () {
      var sidenav = new SideNav($(this), options);
      sidenav.init();
    });
  };

  $('.side-nav').on('touchmove', function (e) {
    e.stopPropagation();
  }, false);
});
jQuery(function ($) {
  $.fn.collapsible = function (options) {
    var defaults = {
      accordion: undefined
    };
    options = $.extend(defaults, options);
    return this.each(function () {
      var $this = $(this);
      var $panelHeaders = $this.find('> li > .collapsible-header');
      var collapsibleType = $this.data('collapsible');
      $this.off('click.collapse', '.collapsible-header');
      $panelHeaders.off('click.collapse');

      if (options.accordion || collapsibleType === 'accordion' || collapsibleType === undefined) {
        $panelHeaders.on('click.collapse', function (e) {
          var element = $(e.target);

          if (isChildOfPanelHeader(element)) {
            element = getPanelHeader(element);
          }

          element.toggleClass('active');
          accordionOpen($this, element);
        });
        accordionOpen($this, $panelHeaders.filter('.active').first());
      } else {
        $panelHeaders.each(function () {
          $(this).on('click.collapse', function (e) {
            var element = $(e.target);

            if (isChildOfPanelHeader(element)) {
              element = getPanelHeader(element);
            }

            element.toggleClass('active');
            expandableOpen(element);
          });

          if ($(this).hasClass('active')) {
            expandableOpen($(this));
          }
        });
      }
    });
  };

  function accordionOpen($collapsible, object) {
    var $panelHeaders = $collapsible.find('> li > .collapsible-header');
    expandableOpen(object);
    $panelHeaders.not(object).removeClass('active').parent().removeClass('active').children('.collapsible-body').stop(true, false).slideUp({
      duration: 350,
      easing: 'easeOutQuart',
      queue: false,
      complete: function complete() {
        $(this).css('height', '');
      }
    });
  }

  function expandableOpen(object) {
    object.hasClass('active') ? object.parent().addClass('active') : object.parent().removeClass('active');
    object.parent().hasClass('active') ? object.siblings('.collapsible-body').stop(true, false).slideDown({
      duration: 350,
      easing: 'easeOutQuart',
      queue: false,
      complete: function complete() {
        $(this).css('height', '');
      }
    }) : object.siblings('.collapsible-body').stop(true, false).slideUp({
      duration: 350,
      easing: 'easeOutQuart',
      queue: false,
      complete: function complete() {
        $(this).css('height', '');
      }
    });
  }

  function isChildOfPanelHeader(object) {
    var $panelHeader = getPanelHeader(object);
    return $panelHeader.length > 0;
  }

  function getPanelHeader(object) {
    return object.closest('li > .collapsible-header');
  }

  $('.collapsible').collapsible();
});
(function ($) {
  var rangeWrapper = '.range-field';
  var rangeType = 'input[type=range]:not(.custom-range):not(.multi-range)';
  var thumbHtml = '<span class="thumb"><span class="value"></span></span>';
  var rangeMousedown = false;
  var left;

  function addThumb() {
    var $thumb = $(thumbHtml);
    $(rangeType).after($thumb);
  }

  $(document).on('change', rangeType, function () {
    var $thumb = $(this);
    var $thumbValue = $thumb.siblings('.thumb').find('.value');
    $thumbValue.html($thumb.val());
  });
  $(document).on('input mousedown touchstart', rangeType, function (e) {
    var $this = $(this);
    var $thumb = $this.siblings('.thumb');
    var width = $this.outerWidth();
    var noThumb = !$thumb.length;

    if (noThumb) {
      addThumb();
    } // Set indicator value


    $thumb.find('.value').html($this.val());
    rangeMousedown = true;
    $this.addClass('active');

    if (!$thumb.hasClass('active')) {
      $thumb.velocity({
        height: '30px',
        width: '30px',
        top: '-20px',
        marginLeft: '-15px'
      }, {
        duration: 300,
        easing: 'easeOutExpo'
      });
    }

    if (e.type !== 'input') {
      var isMobile = e.pageX === undefined || e.pageX === null;

      if (isMobile) {
        left = e.originalEvent.touches[0].pageX - $(this).offset().left;
      } else {
        left = e.pageX - $(this).offset().left;
      }

      if (left < 0) {
        left = 0;
      } else if (left > width) {
        left = width;
      }

      $thumb.addClass('active').css('left', left);
    }

    $thumb.find('.value').html($this.val());
  });
  $(document).on('mouseup touchend', rangeWrapper, function () {
    rangeMousedown = false;
    $(this).removeClass('active');
  });
  $(document).on('mousemove touchmove', rangeWrapper, function (e) {
    var $thumb = $(this).children('.thumb');
    var left;

    if (rangeMousedown) {
      if (!$thumb.hasClass('active')) {
        $thumb.velocity({
          height: '30px',
          width: '30px',
          top: '-20px',
          marginLeft: '-15px'
        }, {
          duration: 300,
          easing: 'easeOutExpo'
        });
      }

      var isMobile = e.pageX === undefined || e.pageX === null;

      if (isMobile) {
        left = e.originalEvent.touches[0].pageX - $(this).offset().left;
      } else {
        left = e.pageX - $(this).offset().left;
      }

      var width = $(this).outerWidth();

      if (left < 0) {
        left = 0;
      } else if (left > width) {
        left = width;
      }

      $thumb.addClass('active').css('left', left);
      $thumb.find('.value').html($thumb.siblings(rangeType).val());
    }
  });
  $(document).on('mouseout touchleave', rangeWrapper, function () {
    if (!rangeMousedown) {
      var $thumb = $(this).children('.thumb');

      if ($thumb.hasClass('active')) {
        $thumb.velocity({
          height: '0',
          width: '0',
          top: '10px',
          marginLeft: '-6px'
        }, {
          duration: 100
        });
      }

      $thumb.removeClass('active');
    }
  });
})(jQuery);
jQuery(function ($) {
  $(document).on('change', '.file-field input[type="file"]', function () {
    var $this = $(this);
    var $fileField = $this.closest('.file-field');
    var $pathInput = $fileField.find('input.file-path');
    var files = $this.get(0).files;
    var fileNames = [];

    if (Array.isArray(files)) {
      fileNames = files.map(function (file) {
        return file.name;
      });
    } else {
      fileNames = Object.values(files).map(function (file) {
        return file.name;
      });
    }

    $pathInput.val(fileNames.join(', '));
    $pathInput.trigger('change');
  });
});
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jQuery(function ($) {
  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown($activator, options) {
      if (options === void 0) {
        options = {};
      }

      this.$activator = $activator;
      this.$activates = $("#" + $activator.attr('data-activates'));
      /* eslint-disable newline-per-chained-call */

      this.options = {
        inDuration: this.fallback().or($activator.data('induration')).or($activator.attr('data-in-duration')).or(options.inDuration).or(300).value(),
        outDuration: this.fallback().or($activator.data('outduration')).or($activator.attr('data-out-duration')).or(options.outDuration).or(225).value(),
        easingEffectIn: this.fallback().or($activator.data('easingeffectin')).or($activator.attr('data-easing-effect-in')).or(options.easingEffectIn).or('easeOutCubic').value(),
        easingEffectOut: this.fallback().or($activator.data('easingeffectout')).or($activator.attr('data-easing-effect-out')).or(options.easingEffectOut).or('swing').value(),
        constrainWidth: this.fallback().or($activator.data('constrainwidth')).or($activator.attr('data-constrain-width')).or(options.constrainWidth).or(true).value(),
        hover: this.fallback().or($activator.data('hover')).or($activator.attr('data-hover')).or(options.hover).or(false).value(),
        gutter: this.fallback().or($activator.data('gutter')).or($activator.attr('data-gutter')).or(options.gutter).or(0).value(),
        belowOrigin: this.fallback().or($activator.data('beloworigin')).or($activator.attr('data-below-origin')).or(options.belowOrigin).or(false).value(),
        alignment: this.fallback().or($activator.data('alignment')).or($activator.attr('data-alignment')).or(options.alignment).or('left').value(),
        maxHeight: this.fallback().or($activator.data('maxheight')).or($activator.attr('data-max-height')).or(options.maxHeight).or('').value(),
        resetScroll: this.fallback().or($activator.data('resetscroll')).or($activator.attr('data-reset-scroll')).or(options.resetScroll).or(true).value()
      };
      /* eslint-enable newline-per-chained-call */

      this.isFocused = false;
    }

    Dropdown.mdbDropdownAutoInit = function mdbDropdownAutoInit() {
      $('.dropdown-button').dropdown();
      this.bindMultiLevelDropdownEvents();
      this.bindBootstrapEvents();
    };

    Dropdown.bindMultiLevelDropdownEvents = function bindMultiLevelDropdownEvents() {
      var $multiLevelDropdown = $('.multi-level-dropdown');
      $multiLevelDropdown.find('.dropdown-submenu > a').on('mouseenter', function (e) {
        var $submenu = $(this);
        $multiLevelDropdown.find('.dropdown-submenu .dropdown-menu').removeClass('show');
        $submenu.next('.dropdown-menu').addClass('show');
        e.stopPropagation();
      });
      $multiLevelDropdown.find('.dropdown').on('hidden.bs.dropdown', function () {
        $multiLevelDropdown.find('.dropdown-menu.show').removeClass('show');
      });
    };

    Dropdown.bindBootstrapEvents = function bindBootstrapEvents() {
      var _this = this;

      var $dropdowns = $('.dropdown, .dropup');
      $dropdowns.on({
        'show.bs.dropdown': function showBsDropdown(e) {
          var $dropdown = $(e.target);

          var effects = _this._getDropdownEffects($dropdown);

          _this._dropdownEffectStart($dropdown, effects.effectIn);
        },
        'shown.bs.dropdown': function shownBsDropdown(e) {
          var $dropdown = $(e.target);

          var effects = _this._getDropdownEffects($dropdown);

          if (effects.effectIn && effects.effectOut) {
            _this._dropdownEffectEnd($dropdown, effects);
          }
        },
        'hide.bs.dropdown': function hideBsDropdown(e) {
          var $dropdown = $(e.target);

          var effects = _this._getDropdownEffects($dropdown);

          if (effects.effectOut) {
            e.preventDefault();

            _this._dropdownEffectStart($dropdown, effects.effectOut);

            _this._dropdownEffectEnd($dropdown, effects, function () {
              $dropdown.removeClass('show');
              $dropdown.find('.dropdown-menu').removeClass('show');
            });
          }
        }
      });
    };

    Dropdown._getDropdownEffects = function _getDropdownEffects($dropdown) {
      var defaultInEffect = 'fadeIn';
      var defaultOutEffect = 'fadeOut';
      var $dropdownMenu = $dropdown.find('.dropdown-menu');
      var $parentUl = $dropdown.parents('ul.nav');

      if ($parentUl.height > 0) {
        defaultInEffect = $parentUl.data('dropdown-in') || null;
        defaultOutEffect = $parentUl.data('dropdown-out') || null;
      }

      return {
        effectIn: $dropdownMenu.data('dropdown-in') || defaultInEffect,
        effectOut: $dropdownMenu.data('dropdown-out') || defaultOutEffect
      };
    };

    Dropdown._dropdownEffectStart = function _dropdownEffectStart($dropdown, effectToStart) {
      if (effectToStart) {
        $dropdown.addClass('dropdown-animating');
        $dropdown.find('.dropdown-menu').addClass(['animated', effectToStart].join(' '));
      }
    };

    Dropdown._dropdownEffectEnd = function _dropdownEffectEnd($dropdown, effects, callback) {
      $dropdown.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $dropdown.removeClass('dropdown-animating');
        $dropdown.find('.dropdown-menu').removeClass(['animated', effects.effectIn, effects.effectOut].join(' '));

        if (typeof callback === 'function') {
          callback();
        }
      });
    };

    var _proto = Dropdown.prototype;

    _proto.returnPublicInterface = function returnPublicInterface() {
      return {
        $activator: this.$activator,
        $activates: this.$activates,
        updatePosition: this.updatePosition.bind(this)
      };
    };

    _proto.init = function init() {
      this.appendDropdownToActivator();

      if (this.options.hover) {
        this.handleHoverableDropdown();
      } else {
        this.handleClickableDropdown();
      }

      this.bindEvents();
    };

    _proto.appendDropdownToActivator = function appendDropdownToActivator() {
      this.$activator.after(this.$activates);
    };

    _proto.handleHoverableDropdown = function handleHoverableDropdown() {
      var _this2 = this;

      var opened = false;
      this.$activator.unbind("click." + this.$activator.attr('id'));
      this.$activator.on('mouseenter', function () {
        if (opened === false) {
          _this2.placeDropdown();

          opened = true;
        }
      });
      this.$activator.on('mouseleave', function (e) {
        var toEl = e.toElement || e.relatedTarget;
        var mouseHoversDropdown = $(toEl).closest('.dropdown-content').is(_this2.$activates);

        if (!mouseHoversDropdown) {
          _this2.$activates.stop(true, true);

          _this2.hideDropdown();

          opened = false;
        }
      });
      this.$activates.on('mouseleave', function (e) {
        var toEl = e.toElement || e.relatedTarget;
        var mouseHoversActivator = $(toEl).closest('.dropdown-button').is(_this2.$activator);

        if (!mouseHoversActivator) {
          _this2.$activates.stop(true, true);

          _this2.hideDropdown();

          opened = false;
        }
      });
    };

    _proto.handleClickableDropdown = function handleClickableDropdown() {
      var _this3 = this;

      this.$activator.unbind("click." + this.$activator.attr('id'));
      this.$activator.bind("click." + this.$activator.attr('id'), function (e) {
        if (_this3.isFocused) {
          return;
        }

        var activatorClicked = _this3.$activator.get(0) === e.currentTarget;

        var activatorActive = _this3.$activator.hasClass('active');

        var dropdownContentClicked = $(e.target).closest('.dropdown-content').length !== 0;

        if (activatorClicked && !activatorActive && !dropdownContentClicked) {
          e.preventDefault();

          _this3.placeDropdown('click');
        } else if (activatorActive) {
          _this3.hideDropdown();

          $(document).unbind("click." + _this3.$activates.attr('id') + " touchstart." + _this3.$activates.attr('id'));
        }

        if (_this3.$activates.hasClass('active')) {
          $(document).bind("click." + _this3.$activates.attr('id') + " touchstart." + _this3.$activates.attr('id'), function (e) {
            var clickedOutsideDropdown = !_this3.$activates.is(e.target) && !_this3.$activator.is(e.target) && !_this3.$activator.find(e.target).length;

            if (clickedOutsideDropdown) {
              _this3.hideDropdown();

              $(document).unbind("click." + _this3.$activates.attr('id') + " touchstart." + _this3.$activates.attr('id'));
            }
          });
        }
      });
    };

    _proto.bindEvents = function bindEvents() {
      var _this4 = this;

      this.$activator.on('open', function (e, eventType) {
        _this4.placeDropdown(eventType);
      });
      this.$activator.on('close', this.hideDropdown.bind(this));
    };

    _proto.placeDropdown = function placeDropdown(eventType) {
      if (eventType === 'focus') {
        this.isFocused = true;
      }

      this.$activates.addClass('active');
      this.$activator.addClass('active');

      if (this.options.constrainWidth === true) {
        this.$activates.css('width', this.$activator.outerWidth());
      } else {
        this.$activates.css('white-space', 'nowrap');
      }

      this.updatePosition();
      this.showDropdown();
    };

    _proto.showDropdown = function showDropdown() {
      this.$activates.stop(true, true).css('opacity', 0).slideDown({
        queue: false,
        duration: this.options.inDuration,
        easing: this.options.easingEffectIn,
        complete: function complete() {
          $(this).css('height', '');
        }
      }).animate(_objectSpread({
        opacity: 1
      }, this.options.resetScroll && {
        scrollTop: 0
      }), {
        queue: false,
        duration: this.options.inDuration,
        easing: 'easeOutSine'
      });
    };

    _proto.hideDropdown = function hideDropdown() {
      var _this5 = this;

      this.isFocused = false;
      this.$activates.fadeOut({
        durations: this.options.outDuration,
        easing: this.options.easingEffectOut
      });
      this.$activates.removeClass('active');
      this.$activator.removeClass('active');
      setTimeout(function () {
        _this5.$activates.css('max-height', _this5.options.maxHeight);
      }, this.options.outDuration);
    };

    _proto.updatePosition = function updatePosition() {
      var windowHeight = window.innerHeight;
      var originHeight = this.$activator.innerHeight();
      var offsetTop = this.$activator.offset().top - $(window).scrollTop();

      var currAlignment = this._getHorizontalAlignment();

      var gutterSpacing = 0;
      var leftPosition = 0;
      var $wrapper = this.$activator.parent();
      var verticalOffset = this.options.belowOrigin ? originHeight : 0;
      var scrollOffset = !$wrapper.is('body') && $wrapper.get(0).scrollHeight > $wrapper.get(0).clientHeight ? $wrapper.get(0).scrollTop : 0;
      var doesNotFitFromBottom = offsetTop + this.$activates.innerHeight() > windowHeight;
      var doesNotFitFromTop = offsetTop + originHeight - this.$activates.innerHeight() < 0;

      if (doesNotFitFromBottom && doesNotFitFromTop) {
        var adjustedHeight = windowHeight - offsetTop - verticalOffset;
        this.$activates.css('max-height', adjustedHeight);
      } else if (doesNotFitFromBottom) {
        if (!verticalOffset) {
          verticalOffset += originHeight;
        }

        verticalOffset -= this.$activates.innerHeight();
      }

      if (currAlignment === 'left') {
        gutterSpacing = this.options.gutter;
        leftPosition = this.$activator.position().left + gutterSpacing;
      } else if (currAlignment === 'right') {
        var offsetRight = this.$activator.position().left + this.$activator.outerWidth() - this.$activates.outerWidth();
        gutterSpacing = -this.options.gutter;
        leftPosition = offsetRight + gutterSpacing;
      }

      this.$activates.css({
        position: 'absolute',
        top: this.$activator.position().top + verticalOffset + scrollOffset,
        left: leftPosition
      });
    };

    _proto._getHorizontalAlignment = function _getHorizontalAlignment() {
      var offsetLeft = this.$activator.offset().left;

      if (offsetLeft + this.$activates.innerWidth() > $(window).width()) {
        return 'right';
      } else if (offsetLeft - this.$activates.innerWidth() + this.$activator.innerWidth() < 0) {
        return 'left';
      }

      return this.options.alignment;
    };

    _proto.fallback = function fallback() {
      return {
        _value: undefined,
        or: function or(value) {
          if (typeof value !== 'undefined' && typeof this._value === 'undefined') {
            this._value = value;
          }

          return this;
        },
        value: function value() {
          return this._value;
        }
      };
    };

    return Dropdown;
  }();

  $.fn.scrollTo = function (elem) {
    this.scrollTop(this.scrollTop() - this.offset().top + $(elem).offset().top);
    return this;
  };

  $.fn.dropdown = function (options) {
    if (this.length > 1) {
      var instances = [];
      this.each(function () {
        var dropdown = new Dropdown(this, options);
        dropdown.init();
        instances.push(dropdown.returnPublicInterface());
      });
      return instances;
    }

    var dropdown = new Dropdown(this, options);
    dropdown.init();
    return dropdown.returnPublicInterface();
  };

  Dropdown.mdbDropdownAutoInit();
});
jQuery(function ($) {
  var DropdownSearchable =
  /*#__PURE__*/
  function () {
    function DropdownSearchable($searchWrappers, options) {
      if (options === void 0) {
        options = {};
      }

      this.$searchWrappers = $searchWrappers;
      this.options = {
        color: this.fallback().or(options.color).or('#000').value(),
        backgroundColor: this.fallback().or(options.backgroundColor).or('').value(),
        fontSize: this.fallback().or(options.fontSize).or('.9rem').value(),
        fontWeight: this.fallback().or(options.fontWeight).or('400').value(),
        borderRadius: this.fallback().or(options.borderRadius).or('').value(),
        borderColor: this.fallback().or(options.borderColor).or('').value(),
        margin: this.fallback().or(options.margin).or('').value()
      };
    }

    var _proto = DropdownSearchable.prototype;

    _proto.init = function init() {
      this.bindSearchEvents();
      return this.$searchWrappers.css({
        color: this.options.color,
        backgroundColor: this.options.backgroundColor,
        fontSize: this.options.fontSize,
        fontWeight: this.options.fontWeight,
        borderRadius: this.options.borderRadius,
        borderColor: this.options.borderColor,
        margin: this.options.margin
      });
    };

    _proto.bindSearchEvents = function bindSearchEvents() {
      this.$searchWrappers.each(function () {
        var $searchInput = $(this).find('input').first();
        $searchInput.on('keyup', function () {
          var $linksInDropMenu = $searchInput.closest('div[id]').find('a, li');
          $linksInDropMenu.each(function () {
            var $this = $(this);

            if ($this.html().toLowerCase().indexOf($searchInput.val().toLowerCase()) > -1) {
              $this.css({
                display: ''
              });
            } else {
              $this.css({
                display: 'none'
              });
            }
          });
        });
      });
    };

    _proto.fallback = function fallback() {
      return {
        _value: undefined,
        or: function or(value) {
          if (typeof value !== 'undefined' && typeof this._value === 'undefined') {
            this._value = value;
          }

          return this;
        },
        value: function value() {
          return this._value;
        }
      };
    };

    return DropdownSearchable;
  }();

  $.fn.mdbDropSearch = function (options) {
    var dropdownSearchable = new DropdownSearchable(this, options);
    return dropdownSearchable.init();
  };
});
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MaterialSelectViewRenderer =
/*#__PURE__*/
function () {
  function MaterialSelectViewRenderer(view) {
    this.view = view;
  }

  var _proto = MaterialSelectViewRenderer.prototype;

  _proto.destroy = function destroy() {
    var currentUuid = this.view.$nativeSelect.data('select-id');
    this.view.$nativeSelect.data('select-id', null).removeClass('initialized');
    this.view.$nativeSelect.parent().find('span.caret').remove();
    this.view.$nativeSelect.parent().find('input').remove();
    this.view.$nativeSelect.unwrap();
    $("ul#select-options-" + currentUuid).remove();
  };

  _proto.render = function render() {
    this.setWrapperClasses();
    this.setMaterialSelectInitialValue();
    this.view.$nativeSelect.data('select-id', this.view.properties.id);
    this.view.$nativeSelect.before(this.view.$selectWrapper);

    if (this.view.options.showResetButton) {
      this.appendResetButton();
    }

    this.appendDropdownIcon();
    this.appendMaterialSelect();
    this.appendMaterialOptionsList();
    this.appendNativeSelect();
    this.appendSelectLabel();
    this.appendCustomTemplateParts();

    if (this.shouldValidate) {
      this.appendValidationFeedbackElements();
    }

    if (this.isRequired) {
      this.enableValidation();
    }

    if (!this.isDisabled) {
      this.setMaterialOptionsListMaxHeight();
      this.view.dropdown = this.view.$materialSelect.dropdown({
        hover: false,
        closeOnClick: false,
        resetScroll: false
      });
    }

    if (this.shouldInheritTabindex) {
      this.view.$materialSelect.attr('tabindex', this.view.$nativeSelect.attr('tabindex'));
    }

    if (this.isDefaultMaterialInput) {
      this.view.$mainLabel.css('top', '-7px');
    }

    if (this.isCustomSelect) {
      this.view.$materialSelect.css({
        display: 'inline-block',
        width: '100%',
        height: 'calc(1.5em + .75rem + 2px)',
        padding: '.375rem 1.75rem .375rem .75rem',
        fontSize: '1rem',
        lineHeight: '1.5',
        backgroundColor: '#fff',
        border: '1px solid #ced4da'
      });
    }

    this.addAccessibilityAttributes();
    this.markInitialized();
  };

  _proto.setWrapperClasses = function setWrapperClasses() {
    if (this.isDefaultMaterialInput) {
      this.view.$selectWrapper.addClass(this.view.$nativeSelect.attr('class').split(' ').filter(function (el) {
        return el !== 'md-form';
      }).join(' ')).css({
        marginTop: '1.5rem',
        marginBottom: '1.5rem'
      });
    } else {
      this.view.$selectWrapper.addClass(this.view.$nativeSelect.attr('class'));
    }
  };

  _proto.setMaterialSelectInitialValue = function setMaterialSelectInitialValue() {
    if (!this.view.options.placeholder) {
      var sanitizedLabelHtml = this.view.$materialSelectInitialOption.replace(/"/g, '&quot;').replace(/  +/g, ' ').trim();
      this.view.$materialSelect.val(sanitizedLabelHtml);
    } else {
      this.view.$materialSelect.attr('placeholder', this.view.options.placeholder);

      if (!this.view.$nativeSelect.find('option[value=""][selected][disabled][data-mdb-placeholder]').length) {
        this.view.$nativeSelect.prepend('<option value="" selected disabled data-mdb-placeholder></option>');
      }
    }
  };

  _proto.appendDropdownIcon = function appendDropdownIcon() {
    if (this.isDisabled) {
      this.view.$dropdownIcon.addClass('disabled');
    }

    this.view.$selectWrapper.append(this.view.$dropdownIcon);
  };

  _proto.appendResetButton = function appendResetButton() {
    if (this.isDisabled) {
      this.view.$btnReset.addClass('disabled');
    }

    if (this.view.$nativeSelect.get(0).selectedIndex === -1) {
      this.view.$btnReset.hide();
    }

    this.view.$selectWrapper.append(this.view.$btnReset);
  };

  _proto.appendMaterialSelect = function appendMaterialSelect() {
    this.view.$selectWrapper.append(this.view.$materialSelect);
  };

  _proto.appendMaterialOptionsList = function appendMaterialOptionsList() {
    if (this.isSearchable) {
      this.appendSearchInputOption();
    }

    if (this.isEditable && this.isSearchable) {
      this.appendAddOptionBtn();
    }

    this.buildMaterialOptions();

    if (this.isMultiple) {
      this.appendToggleAllCheckbox();
    }

    this.view.$selectWrapper.append(this.view.$materialOptionsList);
  };

  _proto.appendNativeSelect = function appendNativeSelect() {
    this.view.$nativeSelect.appendTo(this.view.$selectWrapper);
  };

  _proto.appendSelectLabel = function appendSelectLabel() {
    if (this.view.$materialSelect.val() || this.view.options.placeholder) {
      this.view.$mainLabel.addClass('active');
    }

    this.view.$mainLabel[this.isDisabled ? 'addClass' : 'removeClass']('disabled');
    this.view.$mainLabel.appendTo(this.view.$selectWrapper);
  };

  _proto.appendCustomTemplateParts = function appendCustomTemplateParts() {
    var _this = this;

    this.view.$customTemplateParts.each(function (_, element) {
      var $templatePart = $(element);
      $templatePart.appendTo(_this.view.$materialOptionsList).wrap('<li></li>');
    });
    this.view.$btnSave.appendTo(this.view.$materialOptionsList); // @Depreciated
  };

  _proto.appendValidationFeedbackElements = function appendValidationFeedbackElements() {
    this.view.$validFeedback.insertAfter(this.view.$selectWrapper);
    this.view.$invalidFeedback.insertAfter(this.view.$selectWrapper);
  };

  _proto.enableValidation = function enableValidation() {
    this.view.$nativeSelect.css({
      position: 'absolute',
      top: '1rem',
      left: '0',
      height: '0',
      width: '0',
      opacity: '0',
      padding: '0',
      'pointer-events': 'none'
    });

    if (this.view.$nativeSelect.attr('style').indexOf('inline!important') === -1) {
      this.view.$nativeSelect.attr('style', this.view.$nativeSelect.attr('style') + " display: inline!important;");
    }

    this.view.$nativeSelect.attr('tabindex', -1);
    this.view.$nativeSelect.data('inherit-tabindex', false);
  };

  _proto.setMaterialOptionsListMaxHeight = function setMaterialOptionsListMaxHeight() {
    var $tempWrapper = $('<div />').appendTo($('body'));
    $tempWrapper.css({
      position: 'absolute !important',
      visibility: 'hidden !important',
      display: 'block !important'
    });
    this.view.$materialOptionsList.show();
    var $optionsListClone = this.view.$materialOptionsList.clone().appendTo($tempWrapper);
    var multiplier = this.view.options.visibleOptions;
    var additionalHeight = 0;
    var $materialOptions = $optionsListClone.find('li').not('.disabled');
    var optionHeight = $materialOptions.first().height();
    var optionsCount = $materialOptions.length;

    if (this.isSearchable) {
      additionalHeight += this.view.$searchInput.height();
    }

    if (this.isMultiple) {
      additionalHeight += this.view.$toggleAll.height();
    }

    this.view.$materialOptionsList.hide();
    $tempWrapper.remove();

    if (multiplier >= 0 && multiplier < optionsCount) {
      var maxHeight = optionHeight * multiplier + additionalHeight;
      this.view.$materialOptionsList.css('max-height', maxHeight);
      this.view.$materialSelect.data('maxheight', maxHeight);
    }
  };

  _proto.addAccessibilityAttributes = function addAccessibilityAttributes() {
    this.view.$materialSelect.attr({
      role: this.isSearchable ? 'combobox' : 'listbox',
      'aria-multiselectable': this.isMultiple,
      'aria-disabled': this.isDisabled,
      'aria-required': this.isRequired,
      'aria-labelledby': this.view.$mainLabel.attr('id'),
      'aria-haspopup': true,
      'aria-expanded': false
    });

    if (this.view.$searchInput) {
      this.view.$searchInput.attr('role', 'searchbox');
    }

    this.view.$materialOptionsList.find('li').each(function () {
      var $this = $(this);
      $this.attr({
        role: 'option',
        'aria-selected': $this.hasClass('active'),
        'aria-disabled': $this.hasClass('disabled')
      });
    });
  };

  _proto.markInitialized = function markInitialized() {
    this.view.$nativeSelect.addClass('initialized');
  };

  _proto.appendSearchInputOption = function appendSearchInputOption() {
    var placeholder = this.view.$nativeSelect.attr('searchable');
    var divClass = this.isDefaultMaterialInput ? '' : 'md-form';
    var inputClass = this.isDefaultMaterialInput ? 'select-default mb-2' : '';
    this.view.$searchInput = $("<span class=\"search-wrap ml-2\"><div class=\"" + divClass + " mt-0\"><input type=\"text\" class=\"search w-100 d-block " + inputClass + "\" tabindex=\"-1\" placeholder=\"" + placeholder + "\"></div></span>");
    this.view.$materialOptionsList.append(this.view.$searchInput);
    this.view.$searchInput.on('click', function (e) {
      return e.stopPropagation();
    });
  };

  _proto.appendAddOptionBtn = function appendAddOptionBtn() {
    this.view.$searchInput.append(this.view.$addOptionBtn);
  };

  _proto.buildMaterialOptions = function buildMaterialOptions() {
    var _this2 = this;

    this.view.$nativeSelectChildren.each(function (index, option) {
      var $this = $(option);

      if ($this.is('option')) {
        _this2.buildSingleOption($this, _this2.isMultiple ? 'multiple' : '');
      } else if ($this.is('optgroup')) {
        var $materialOptgroup = $("<li class=\"optgroup\"><span>" + $this.attr('label') + "</span></li>");

        _this2.view.$materialOptionsList.append($materialOptgroup);

        var $optgroupOptions = $this.children('option');
        $optgroupOptions.each(function (index, optgroupOption) {
          _this2.buildSingleOption($(optgroupOption), 'optgroup-option');
        });
      }
    });
  };

  _proto.appendToggleAllCheckbox = function appendToggleAllCheckbox() {
    var firstOption = this.view.$materialOptionsList.find('li').first();

    if (firstOption.hasClass('disabled') && firstOption.find('input').prop('disabled')) {
      firstOption.after(this.view.$toggleAll);
    } else {
      this.view.$materialOptionsList.find('li').first().before(this.view.$toggleAll);
    }
  };

  _proto.addNewOption = function addNewOption() {
    var val = this.view.$searchInput.find('input').val();
    var $newOption = $("<option value=\"" + val.toLowerCase() + "\" selected>" + val + "</option>").prop('selected', true);

    if (!this.isMultiple) {
      this.view.$nativeSelectChildren.each(function (index, option) {
        $(option).attr('selected', false);
      });
    }

    this.view.$nativeSelect.append($newOption);
  };

  _proto.buildSingleOption = function buildSingleOption($nativeSelectChild, type) {
    var disabled = $nativeSelectChild.is(':disabled') ? 'disabled' : '';
    var active = $nativeSelectChild.is(':selected') ? 'active' : '';
    var optgroupClass = type === 'optgroup-option' ? 'optgroup-option' : '';
    var iconUrl = $nativeSelectChild.data('icon');
    var fas = $nativeSelectChild.data('fas') ? "<i class=\"fa-pull-right m-2 fas fa-" + $nativeSelectChild.data('fas') + " " + this.view.options.fasClasses + "\"></i> " : '';
    var far = $nativeSelectChild.data('far') ? "<i class=\"fa-pull-right m-2 far fa-" + $nativeSelectChild.data('far') + " " + this.view.options.farClasses + "\"></i> " : '';
    var fab = $nativeSelectChild.data('fab') ? "<i class=\"fa-pull-right m-2 fab fa-" + $nativeSelectChild.data('fab') + " " + this.view.options.fabClasses + "\"></i> " : '';
    var classes = $nativeSelectChild.attr('class');
    var iconHtml = iconUrl ? "<img alt=\"\" src=\"" + iconUrl + "\" class=\"" + classes + "\">" : '';
    var checkboxHtml = this.isMultiple ? "<input type=\"checkbox\" class=\"form-check-input\" " + disabled + "/><label></label>" : '';
    var secondaryText = $nativeSelectChild.data('secondary-text') ? "<p class=\"text-muted pt-0 mb-0\" disabled>" + $nativeSelectChild.data('secondary-text') + "</p>" : '';
    this.view.$materialOptionsList.append($("<li class=\"" + disabled + " " + active + " " + optgroupClass + " " + (this.view.options.copyClassesOption ? classes : '') + " \">" + iconHtml + "<span class=\"filtrable\">" + checkboxHtml + " " + $nativeSelectChild.html() + " " + fas + " " + far + " " + fab + " " + secondaryText + "</span></li>"));
  };

  _createClass(MaterialSelectViewRenderer, [{
    key: "shouldValidate",
    get: function get() {
      return this.view.options.validate;
    }
  }, {
    key: "shouldInheritTabindex",
    get: function get() {
      return this.view.$nativeSelect.data('inherit-tabindex') !== false;
    }
  }, {
    key: "isMultiple",
    get: function get() {
      return this.view.isMultiple;
    }
  }, {
    key: "isSearchable",
    get: function get() {
      return this.view.isSearchable;
    }
  }, {
    key: "isRequired",
    get: function get() {
      return this.view.isRequired;
    }
  }, {
    key: "isEditable",
    get: function get() {
      return this.view.isEditable;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.view.isDisabled;
    }
  }, {
    key: "isDefaultMaterialInput",
    get: function get() {
      return this.view.options.defaultMaterialInput;
    }
  }, {
    key: "isCustomSelect",
    get: function get() {
      return this.view.$materialSelect.hasClass('custom-select') && this.view.$materialSelect.hasClass('select-dropdown');
    }
  }]);

  return MaterialSelectViewRenderer;
}();
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MaterialSelectView =
/*#__PURE__*/
function () {
  // eslint-disable-next-line object-curly-newline
  function MaterialSelectView($nativeSelect, _ref) {
    var options = _ref.options,
        id = _ref.properties.id;
    this.properties = {
      id: id,
      isMultiple: Boolean($nativeSelect.attr('multiple')),
      isSearchable: Boolean($nativeSelect.attr('searchable')),
      isRequired: Boolean($nativeSelect.attr('required')),
      isEditable: Boolean($nativeSelect.attr('editable'))
    };
    this.options = this._copyOptions(options);
    this.$nativeSelect = $nativeSelect;
    this.$selectWrapper = $('<div class="select-wrapper"></div>');
    this.$materialOptionsList = $("<ul id=\"select-options-" + this.properties.id + "\" class=\"dropdown-content select-dropdown w-100 " + (this.properties.isMultiple ? 'multiple-select-dropdown' : '') + "\"></ul>");
    this.$materialSelectInitialOption = $nativeSelect.find('option:selected').text() || $nativeSelect.find('option:first').text() || '';
    this.$nativeSelectChildren = this.$nativeSelect.children('option, optgroup');
    this.$materialSelect = $("<input type=\"text\" class=\"" + (this.options.defaultMaterialInput ? 'browser-default custom-select multi-bs-select select-dropdown form-control' : 'select-dropdown form-control') + "\" " + (!this.options.validate && 'readonly="true"') + " required=\"" + (this.options.validate ? 'true' : 'false') + "\" " + (this.$nativeSelect.is(' :disabled') ? 'disabled' : '') + " data-activates=\"select-options-" + this.properties.id + "\" value=\"\"/>");
    this.$dropdownIcon = this.options.defaultMaterialInput ? '' : $('<span class="caret">&#9660;</span>');
    this.$searchInput = null;
    this.$noSearchResultsInfo = $("<li><span><i>" + this.options.labels.noSearchResults + "</i></span></li>");
    this.$toggleAll = $("<li class=\"select-toggle-all\"><span><input type=\"checkbox\" class=\"form-check-input\"><label>" + this.options.labels.selectAll + "</label></span></li>");
    this.$addOptionBtn = $('<i class="select-add-option fas fa-plus"></i>');
    this.$mainLabel = this._jQueryFallback(this.$nativeSelect.next('label.mdb-main-label'), $("label[for='" + this.properties.id + "']"));
    this.$customTemplateParts = this._jQueryFallback(this.$nativeSelect.nextUntil('select', '.mdb-select-template-part'), $("[data-mdb-select-template-part-for='" + this.properties.id + "']"));
    this.$btnSave = this.$nativeSelect.nextUntil('select', '.btn-save'); // @Depreciated

    this.$btnReset = $('<span class="reset-select-btn">&times;</span>');
    this.$validFeedback = $("<div class=\"valid-feedback\">" + this.options.labels.validFeedback + "</div>");
    this.$invalidFeedback = $("<div class=\"invalid-feedback\">" + this.options.labels.invalidFeedback + "</div>");
    this.keyCodes = {
      tab: 9,
      enter: 13,
      shift: 16,
      alt: 18,
      esc: 27,
      space: 32,
      end: 35,
      home: 36,
      arrowUp: 38,
      arrowDown: 40
    }; // eslint-disable-next-line no-undef

    this.renderer = new MaterialSelectViewRenderer(this);
    this.dropdown = null;
  }

  var _proto = MaterialSelectView.prototype;

  _proto.destroy = function destroy() {
    this.renderer.destroy();
  };

  _proto.render = function render() {
    this.renderer.render();
  };

  _proto.selectPreselectedOptions = function selectPreselectedOptions(handler) {
    var _this = this;

    if (this.isMultiple) {
      this.$nativeSelect.find('option:selected:not(:disabled)').each(function (i, element) {
        var index = element.index;

        _this.$materialOptionsList.find('li:not(.optgroup):not(.select-toggle-all)').eq(index).addClass('selected active').find(':checkbox').prop('checked', true);

        handler(index);
      });
    } else {
      var $preselectedOption = this.$nativeSelect.find('option:selected').first();
      var indexOfPreselectedOption = this.$nativeSelect.find('option').index($preselectedOption.get(0));

      if ($preselectedOption.get(0) && $preselectedOption.attr('disabled') !== 'disabled') {
        handler(indexOfPreselectedOption);
      }
    }
  };

  _proto.bindResetButtonClick = function bindResetButtonClick(handler) {
    var _this2 = this;

    this.$btnReset.on('click', function (e) {
      e.preventDefault();

      if (!_this2.$nativeSelect.find('option[value=""][selected][disabled][data-mdb-novalue]').length) {
        _this2._toggleResetButton(true);

        _this2.$materialSelect.val(_this2.isMultiple ? [] : '');

        _this2.$materialSelect.trigger('close');

        _this2.$mainLabel.removeClass('active');

        _this2.$materialOptionsList.find('li.active, li.selected').removeClass('active').removeClass('selected');

        _this2.$materialOptionsList.find('li[aria-selected="true"]').attr('aria-selected', 'false');

        _this2.$materialOptionsList.find('input[type="checkbox"]').prop('checked', false);

        handler();
      }
    });
  };

  _proto.bindAddNewOptionClick = function bindAddNewOptionClick() {
    this.$addOptionBtn.on('click', this.renderer.addNewOption.bind(this.renderer));
  };

  _proto.bindMaterialSelectFocus = function bindMaterialSelectFocus() {
    var _this3 = this;

    this.$materialSelect.on('focus', function (e) {
      var $this = $(e.target);
      $this.parent().addClass('active');

      if ($('ul.select-dropdown').not(_this3.$materialOptionsList.get(0)).is(':visible')) {
        $('input.select-dropdown').trigger('close');
      }

      _this3.$mainLabel.addClass('active');

      if (!_this3.$materialOptionsList.is(':visible')) {
        var label = $this.val();

        var $selectedOption = _this3.$materialOptionsList.find('li').filter(function () {
          return $(this).text().toLowerCase() === label.toLowerCase();
        }).get(0);

        _this3._selectSingleOption($selectedOption);
      }

      if (!_this3.isMultiple) {
        _this3.$mainLabel.addClass('active');
      }
    });
  };

  _proto.bindMaterialSelectClick = function bindMaterialSelectClick() {
    var _this4 = this;

    this.$materialSelect.on('mousedown', function (e) {
      if (e.which === 3) {
        e.preventDefault();
      }
    });
    this.$materialSelect.on('click', function (e) {
      e.stopPropagation();

      _this4.$mainLabel.addClass('active');

      _this4._updateDropdownScrollTop();
    });
  };

  _proto.bindMaterialSelectBlur = function bindMaterialSelectBlur() {
    var _this5 = this;

    this.$materialSelect.on('blur', function (e) {
      var $this = $(e.target);
      $this.parent().removeClass('active');

      if (!_this5.isMultiple && !_this5.isSearchable) {
        $this.trigger('close');
      }

      _this5.$materialOptionsList.find('li.selected').removeClass('selected');
    });
  };

  _proto.bindMaterialOptionsListTouchstart = function bindMaterialOptionsListTouchstart() {
    this.$materialOptionsList.on('touchstart', function (e) {
      return e.stopPropagation();
    });
  };

  _proto.bindMaterialSelectKeydown = function bindMaterialSelectKeydown() {
    var _this6 = this;

    // eslint-disable-next-line complexity
    this.$materialSelect.on('keydown', function (e) {
      var $this = $(e.target);
      var isTab = e.which === _this6.keyCodes.tab;
      var isArrowUp = e.which === _this6.keyCodes.arrowUp;
      var isArrowDown = e.which === _this6.keyCodes.arrowDown;
      var isEnter = e.which === _this6.keyCodes.enter;
      var isEsc = e.which === _this6.keyCodes.esc;
      var isAltWithArrowDown = isArrowDown && e.altKey;
      var isAltWithArrowUp = isArrowUp && e.altKey;
      var isHome = e.which === _this6.keyCodes.home;
      var isEnd = e.which === _this6.keyCodes.end;
      var isSpace = e.which === _this6.keyCodes.space;

      var isDropdownExpanded = _this6.$materialOptionsList.is(':visible');

      switch (true) {
        case isTab:
          return _this6._handleTabKey($this);

        case !isDropdownExpanded && (isEnter || isAltWithArrowDown):
        case _this6.isMultiple && !isDropdownExpanded && (isArrowDown || isArrowUp):
          $this.trigger('open');
          return _this6._updateDropdownScrollTop();

        case isDropdownExpanded && (isEsc || isAltWithArrowUp):
          return $this.trigger('close');

        case !isDropdownExpanded && (isArrowDown || isArrowUp):
          return _this6._handleClosedArrowUpDownKey(e.which);

        case isDropdownExpanded && (isArrowDown || isArrowUp):
          return _this6._handleArrowUpDownKey(e.which);

        case isDropdownExpanded && isHome:
          return _this6._handleHomeKey();

        case isDropdownExpanded && isEnd:
          return _this6._handleEndKey();

        case isDropdownExpanded && (isEnter || isSpace):
          return _this6._handleEnterKey($this);

        default:
          return _this6._handleLetterKey(e);
      }
    });
  };

  _proto.bindMaterialSelectDropdownToggle = function bindMaterialSelectDropdownToggle() {
    var _this7 = this;

    this.$materialSelect.on('open', function () {
      return _this7.$materialSelect.attr('aria-expanded', 'true');
    });
    this.$materialSelect.on('close', function () {
      return _this7.$materialSelect.attr('aria-expanded', 'false');
    });
  };

  _proto.bindToggleAllClick = function bindToggleAllClick(handler) {
    var _this8 = this;

    this.$toggleAll.on('click', function (e) {
      var checkbox = $(_this8.$toggleAll).find('input[type="checkbox"]').first();
      var currentState = Boolean($(checkbox).prop('checked'));
      var isToggleChecked = !currentState;
      $(checkbox).prop('checked', !currentState);

      _this8.$materialOptionsList.find('li:not(.optgroup):not(.select-toggle-all)').each(function (materialOptionIndex, materialOption) {
        var $materialOption = $(materialOption);
        var $optionCheckbox = $materialOption.find('input[type="checkbox"]');
        $materialOption.attr('aria-selected', isToggleChecked);

        if (isToggleChecked && $optionCheckbox.is(':checked') || !isToggleChecked && !$optionCheckbox.is(':checked') || $(materialOption).is(':hidden') || $(materialOption).is('.disabled')) {
          return;
        }

        $optionCheckbox.prop('checked', isToggleChecked);

        _this8.$nativeSelect.find('option').eq(materialOptionIndex).prop('selected', isToggleChecked);

        $materialOption.toggleClass('active');

        _this8._selectOption(materialOption);

        handler(materialOptionIndex);
      });

      _this8.$nativeSelect.data('stop-refresh', true);

      _this8._triggerChangeOnNativeSelect();

      _this8.$nativeSelect.removeData('stop-refresh');

      e.stopPropagation();
    });
  };

  _proto.bindMaterialOptionMousedown = function bindMaterialOptionMousedown() {
    var _this9 = this;

    this.$materialOptionsList.on('mousedown', function (e) {
      var option = e.target;
      var inModal = $('.modal-content').find(_this9.$materialOptionsList).length;

      if (inModal && option.scrollHeight > option.offsetHeight) {
        e.preventDefault();
      }
    });
  };

  _proto.bindMaterialOptionClick = function bindMaterialOptionClick(handler) {
    var _this10 = this;

    this.$materialOptionsList.find('li:not(.optgroup)').not(this.$toggleAll).each(function (materialOptionIndex, materialOption) {
      $(materialOption).on('click', function (e) {
        e.stopPropagation();

        _this10._toggleResetButton(false);

        var $this = $(materialOption);

        if ($this.hasClass('disabled') || $this.hasClass('optgroup')) {
          return;
        }

        var selected = true;

        if (_this10.isMultiple) {
          $this.find('input[type="checkbox"]').prop('checked', function (index, oldPropertyValue) {
            return !oldPropertyValue;
          });
          var hasOptgroup = Boolean(_this10.$nativeSelect.find('optgroup').length);
          var thisIndex = _this10._isToggleAllPresent() ? $this.index() - 1 : $this.index();
          /* eslint-disable max-statements-per-line */

          switch (true) {
            case _this10.isSearchable && hasOptgroup:
              selected = handler(thisIndex - $this.prevAll('.optgroup').length - 1);
              break;

            case _this10.isSearchable:
              selected = handler(thisIndex - 1);
              break;

            case hasOptgroup:
              selected = handler(thisIndex - $this.prevAll('.optgroup').length);
              break;

            default:
              selected = handler(thisIndex);
              break;
          }
          /* eslint-enable max-statements-per-line */


          if (_this10._isToggleAllPresent()) {
            _this10._updateToggleAllOption();
          }

          _this10.$materialSelect.trigger('focus');
        } else {
          _this10.$materialOptionsList.find('li').removeClass('active').attr('aria-selected', 'false');

          var $selectedOption = $this.children().last()[0].childNodes[0];

          _this10.$materialSelect.val($($selectedOption).text().replace(/  +/g, ' ').trim());

          _this10.$materialSelect.trigger('close');
        }

        $this.toggleClass('active');
        var ariaSelected = $this.attr('aria-selected');
        $this.attr('aria-selected', ariaSelected === 'true' ? 'false' : 'true');

        _this10._selectSingleOption($this);

        _this10.$nativeSelect.data('stop-refresh', true);

        var selectedOptionIndex = _this10.$nativeSelect.attr('data-placeholder') ? materialOptionIndex + 1 : materialOptionIndex;

        _this10.$nativeSelect.find('option').eq(selectedOptionIndex).prop('selected', selected);

        _this10.$nativeSelect.removeData('stop-refresh');

        _this10._triggerChangeOnNativeSelect();

        if (_this10.$materialSelect.val()) {
          _this10.$mainLabel.addClass('active');
        }

        if ($this.hasClass('li-added')) {
          _this10.renderer.buildSingleOption($this, '');
        }
      });
    });
  };

  _proto.bindSingleMaterialOptionClick = function bindSingleMaterialOptionClick() {
    var _this11 = this;

    this.$materialOptionsList.find('li').on('click', function () {
      _this11.$materialSelect.trigger('close');
    });
  };

  _proto.bindSearchInputKeyup = function bindSearchInputKeyup() {
    var _this12 = this;

    this.$searchInput.find('.search').on('keyup', function (e) {
      var $this = $(e.target);
      var isTab = e.which === _this12.keyCodes.tab;
      var isEsc = e.which === _this12.keyCodes.esc;
      var isEnter = e.which === _this12.keyCodes.enter;
      var isEnterWithShift = isEnter && e.shiftKey;
      var isArrowUp = e.which === _this12.keyCodes.arrowUp;
      var isArrowDown = e.which === _this12.keyCodes.arrowDown;

      if (isArrowDown || isTab || isEsc || isArrowUp) {
        _this12.$materialSelect.focus();

        _this12._handleArrowUpDownKey(e.which);

        return;
      }

      var $ul = $this.closest('ul');
      var searchValue = $this.val();
      var $options = $ul.find('li span.filtrable');
      var isOptionInList = false;
      $options.each(function () {
        var $option = $(this);

        if (typeof this.outerHTML === 'string') {
          var liValue = this.textContent.toLowerCase();

          if (liValue.includes(searchValue.toLowerCase())) {
            $option.show().parent().show();
          } else {
            $option.hide().parent().hide();
          }

          if (liValue.trim() === searchValue.toLowerCase()) {
            isOptionInList = true;
          }
        }
      });

      if (isEnter) {
        if (_this12.isEditable && !isOptionInList) {
          _this12.renderer.addNewOption();

          return;
        }

        if (isEnterWithShift) {
          _this12._handleEnterWithShiftKey($this);
        }

        _this12.$materialSelect.trigger('open');

        return;
      }

      _this12.$addOptionBtn[searchValue && _this12.isEditable && !isOptionInList ? 'show' : 'hide']();

      var anyOptionMatch = $options.filter(function (_, e) {
        return $(e).is(':visible') && !$(e).parent().hasClass('disabled');
      }).length !== 0;

      if (!anyOptionMatch) {
        _this12.$toggleAll.hide();

        _this12.$materialOptionsList.append(_this12.$noSearchResultsInfo);
      } else {
        _this12.$toggleAll.show();

        _this12.$materialOptionsList.find(_this12.$noSearchResultsInfo).remove();

        _this12._updateToggleAllOption();
      }

      _this12.dropdown.updatePosition(_this12.$materialSelect, _this12.$materialOptionsList);
    });
  };

  _proto.bindHtmlClick = function bindHtmlClick() {
    var _this13 = this;

    $('html').on('click', function (e) {
      if (!$(e.target).closest("#select-options-" + _this13.properties.id).length && !$(e.target).hasClass('mdb-select') && $("#select-options-" + _this13.properties.id).hasClass('active')) {
        _this13.$materialSelect.trigger('close');

        if (!_this13.$materialSelect.val() && !_this13.options.placeholder) {
          _this13.$mainLabel.removeClass('active');
        }
      }

      if (_this13.isSearchable && _this13.$searchInput !== null && _this13.$materialOptionsList.hasClass('active')) {
        _this13.$materialOptionsList.find('.search-wrap input.search').focus();
      }
    });
  };

  _proto.bindMobileDevicesMousedown = function bindMobileDevicesMousedown() {
    $('select').siblings('input.select-dropdown', 'input.multi-bs-select').on('mousedown', function (e) {
      if (MaterialSelectView.isMobileDevice && (e.clientX >= e.target.clientWidth || e.clientY >= e.target.clientHeight)) {
        e.preventDefault();
      }
    });
  };

  _proto.bindSaveBtnClick = function bindSaveBtnClick() {
    var _this14 = this;

    // @Depreciated
    this.$btnSave.on('click', function () {
      _this14.$materialSelect.trigger('close');
    });
  };

  _proto._toggleResetButton = function _toggleResetButton(hide) {
    var previousValue = this.$nativeSelect.data('stop-refresh');
    this.$nativeSelect.attr('data-stop-refresh', 'true');

    if (hide) {
      this.$nativeSelect.prepend('<option value="" selected disabled data-mdb-novalue></option>');
    } else {
      this.$nativeSelect.find('option[data-mdb-novalue]').remove();
    }

    this.$nativeSelect.attr('data-stop-refresh', previousValue);
    this.$btnReset[hide ? 'hide' : 'show']();
  };

  _proto._isToggleAllPresent = function _isToggleAllPresent() {
    return this.$materialOptionsList.find(this.$toggleAll).length;
  };

  _proto._updateToggleAllOption = function _updateToggleAllOption() {
    var $allOptionsButToggleAll = this.$materialOptionsList.find('li').not('.select-toggle-all, .disabled, :hidden').find('[type=checkbox]');
    var $checkedOptionsButToggleAll = $allOptionsButToggleAll.filter(':checked');
    var isToggleAllChecked = this.$toggleAll.find('[type=checkbox]').is(':checked');

    if ($checkedOptionsButToggleAll.length === $allOptionsButToggleAll.length && !isToggleAllChecked) {
      this.$toggleAll.find('[type=checkbox]').prop('checked', true);
    } else if ($checkedOptionsButToggleAll.length < $allOptionsButToggleAll.length && isToggleAllChecked) {
      this.$toggleAll.find('[type=checkbox]').prop('checked', false);
    }
  };

  _proto._handleTabKey = function _handleTabKey($materialSelect) {
    this._handleEscKey($materialSelect);
  };

  _proto._handleEnterWithShiftKey = function _handleEnterWithShiftKey($materialSelect) {
    if (!this.isMultiple) {
      this._handleEnterKey($materialSelect);
    } else {
      this.$toggleAll.trigger('click');
    }
  };

  _proto._handleEnterKey = function _handleEnterKey($materialSelect) {
    var $activeOption = this.$materialOptionsList.find('li.selected:not(.disabled)');
    $activeOption.trigger('click').addClass('active');

    this._removeKeyboardActiveClass();

    if (!this.isMultiple) {
      $materialSelect.trigger('close');
    }
  };

  _proto._handleArrowUpDownKey = function _handleArrowUpDownKey(keyCode) {
    // eslint-disable-next-line object-curly-newline
    var _this$_getArrowMatche = this._getArrowMatchedActiveOptions(keyCode, false),
        $matchedMaterialOption = _this$_getArrowMatche.$matchedMaterialOption,
        $activeOption = _this$_getArrowMatche.$activeOption;

    this._selectSingleOption($matchedMaterialOption);

    this._removeKeyboardActiveClass();

    if (!$matchedMaterialOption.find('input').is(':checked')) {
      $matchedMaterialOption.removeClass(this.options.keyboardActiveClass);
    }

    if (!$activeOption.hasClass('selected') && !$activeOption.find('input').is(':checked') && this.isMultiple) {
      $activeOption.removeClass('active', this.options.keyboardActiveClass);
    }

    $matchedMaterialOption.addClass(this.options.keyboardActiveClass);

    if ($matchedMaterialOption.position()) {
      this.$materialOptionsList.scrollTop(this.$materialOptionsList.scrollTop() + $matchedMaterialOption.position().top);
    }
  };

  _proto._handleClosedArrowUpDownKey = function _handleClosedArrowUpDownKey(keyCode) {
    // eslint-disable-next-line object-curly-newline
    var _this$_getArrowMatche2 = this._getArrowMatchedActiveOptions(keyCode, true),
        $matchedMaterialOption = _this$_getArrowMatche2.$matchedMaterialOption;

    $matchedMaterialOption.trigger('click').addClass('active');

    this._updateDropdownScrollTop();

    this._selectSingleOption($matchedMaterialOption);
  };

  _proto._getArrowMatchedActiveOptions = function _getArrowMatchedActiveOptions(keyCode, closedDropdown) {
    var _this15 = this;

    var visible = closedDropdown ? '' : ':visible';
    var $availableOptions = this.$materialOptionsList.find("li" + visible).not('.disabled, .select-toggle-all');
    var $firstOption = $availableOptions.first();
    var $lastOption = $availableOptions.last();
    var anySelected = this.$materialOptionsList.find('li.selected').length > 0;
    var $matchedMaterialOption = null;
    var $activeOption = null;
    var isArrowUp = keyCode === this.keyCodes.arrowUp;

    if (isArrowUp) {
      var $currentOption = anySelected ? this.$materialOptionsList.find('li.selected').first() : $lastOption;
      var $prevOption = $currentOption.prev("li" + visible + ":not(.disabled, .select-toggle-all)");
      $activeOption = $prevOption;
      $availableOptions.each(function (key, el) {
        if ($(el).hasClass(_this15.options.keyboardActiveClass)) {
          $prevOption = $availableOptions.eq(key - 1);
          $activeOption = $availableOptions.eq(key);
        }
      });
      $matchedMaterialOption = $currentOption.is($firstOption) || !anySelected ? $currentOption : $prevOption;
    } else {
      var _$currentOption = anySelected ? this.$materialOptionsList.find('li.selected').first() : $firstOption;

      var $nextOption = _$currentOption.next("li" + visible + ":not(.disabled, .select-toggle-all)");

      $activeOption = $nextOption;
      $availableOptions.each(function (key, el) {
        if ($(el).hasClass(_this15.options.keyboardActiveClass)) {
          $nextOption = $availableOptions.eq(key + 1);
          $activeOption = $availableOptions.eq(key);
        }
      });
      $matchedMaterialOption = _$currentOption.is($lastOption) || !anySelected ? _$currentOption : $nextOption;
    }

    return {
      $matchedMaterialOption: $matchedMaterialOption,
      $activeOption: $activeOption
    };
  };

  _proto._handleHomeKey = function _handleHomeKey() {
    this._selectBoundaryOption('first');
  };

  _proto._handleEndKey = function _handleEndKey() {
    this._selectBoundaryOption('last');
  };

  _proto._selectBoundaryOption = function _selectBoundaryOption(firstOrLast) {
    if (firstOrLast === void 0) {
      firstOrLast = '';
    }

    var $boundaryOption = this.$materialOptionsList.find('li:visible').not('.disabled, .select-toggle-all')[firstOrLast]();

    this._selectSingleOption($boundaryOption);

    this._removeKeyboardActiveClass();

    if (!$boundaryOption.find('input').is(':checked')) {
      $boundaryOption.removeClass(this.options.keyboardActiveClass);
    }

    $boundaryOption.addClass(this.options.keyboardActiveClass);

    if ($boundaryOption.position()) {
      this.$materialOptionsList.scrollTop(this.$materialOptionsList.scrollTop() + $boundaryOption.position().top);
    }
  };

  _proto._handleEscKey = function _handleEscKey($materialSelect) {
    this._removeKeyboardActiveClass();

    $materialSelect.trigger('close');
  };

  _proto._handleLetterKey = function _handleLetterKey(e) {
    var _this16 = this;

    this._removeKeyboardActiveClass();

    if (this.isSearchable) {
      var isLetter = e.which > 46 && e.which < 91;
      var isNumber = e.which > 93 && e.which < 106;
      var isBackspace = e.which === 8;

      if (isLetter || isNumber) {
        this.$searchInput.find('input').val(e.key).focus();
      }

      if (isBackspace) {
        this.$searchInput.find('input').val('').focus();
      }
    } else {
      var filterQueryString = '';
      var letter = String.fromCharCode(e.which).toLowerCase();
      var nonLetters = Object.keys(this.keyCodes).map(function (key) {
        return _this16.keyCodes[key];
      });
      var isLetterSearchable = letter && nonLetters.indexOf(e.which) === -1;

      if (isLetterSearchable) {
        filterQueryString += letter;
        var $matchedMaterialOption = this.$materialOptionsList.find('li').filter(function (index, element) {
          return $(element).text().toLowerCase().includes(filterQueryString);
        }).first();

        if (!this.isMultiple) {
          this.$materialOptionsList.find('li').removeClass('active');
        }

        $matchedMaterialOption.addClass('active');

        this._selectSingleOption($matchedMaterialOption);

        this._updateDropdownScrollTop();
      }
    }
  };

  _proto._removeKeyboardActiveClass = function _removeKeyboardActiveClass() {
    this.$materialOptionsList.find('li').removeClass(this.options.keyboardActiveClass);
  };

  _proto._triggerChangeOnNativeSelect = function _triggerChangeOnNativeSelect() {
    var keyboardEvt = new KeyboardEvent('change', {
      bubbles: true,
      cancelable: true
    });
    this.$nativeSelect.get(0).dispatchEvent(keyboardEvt);
  };

  _proto._selectSingleOption = function _selectSingleOption(newOption) {
    this.$materialOptionsList.find('li.selected').removeClass('selected');

    this._selectOption(newOption);
  };

  _proto._updateDropdownScrollTop = function _updateDropdownScrollTop() {
    var $preselected = this.$materialOptionsList.find('li.active').not('.disabled').first();

    if ($preselected.length) {
      this.$materialOptionsList.scrollTo($preselected);
    } else {
      this.$materialOptionsList.scrollTop(0);
    }
  };

  _proto._selectOption = function _selectOption(newOption) {
    var option = $(newOption);
    option.addClass('selected');
  };

  _proto._copyOptions = function _copyOptions(options) {
    return $.extend({}, options);
  };

  _proto._jQueryFallback = function _jQueryFallback() {
    var $lastElem = null;

    for (var i = 0; i < arguments.length; i++) {
      $lastElem = i < 0 || arguments.length <= i ? undefined : arguments[i];

      if ($lastElem.length) {
        return $lastElem;
      }
    }

    return $lastElem;
  };

  _createClass(MaterialSelectView, [{
    key: "isMultiple",
    get: function get() {
      return this.properties.isMultiple;
    }
  }, {
    key: "isSearchable",
    get: function get() {
      return this.properties.isSearchable;
    }
  }, {
    key: "isRequired",
    get: function get() {
      return this.properties.isRequired;
    }
  }, {
    key: "isEditable",
    get: function get() {
      return this.properties.isEditable;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.$nativeSelect.is(':disabled');
    }
  }], [{
    key: "isMobileDevice",
    get: function get() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }]);

  return MaterialSelectView;
}();
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

jQuery(function ($) {
  var MaterialSelect =
  /*#__PURE__*/
  function () {
    function MaterialSelect($nativeSelect, options) {
      if (options === void 0) {
        options = {};
      }

      this.options = {
        destroy: this.fallback().or(options.destroy).or(false).value(),
        validate: this.fallback().or($nativeSelect.attr('data-validate')).or(options.validate).or(false).value(),
        selectId: this.fallback().or($nativeSelect.attr('data-select-id')).or(options.selectId).or(null).value(),
        defaultMaterialInput: this.fallback().or($nativeSelect.attr('data-default-material-input')).or(options.defaultMaterialInput).or(false).value(),
        fasClasses: this.fallback().or($nativeSelect.attr('data-fas-classes')).or(options.fasClasses).or('').value(),
        farClasses: this.fallback().or($nativeSelect.attr('data-far-classes')).or(options.farClasses).or('').value(),
        fabClasses: this.fallback().or($nativeSelect.attr('data-fab-classes')).or(options.fabClasses).or('').value(),
        copyClassesOption: this.fallback().or($nativeSelect.attr('data-copy-classes-option')).or(options.copyClassesOption).or(false).value(),
        labels: {
          selectAll: this.fallback().or($nativeSelect.attr('data-label-select-all')).or((options.labels || {}).selectAll).or('Select all').value(),
          optionsSelected: this.fallback().or($nativeSelect.attr('data-label-options-selected')).or((options.labels || {}).optionsSelected).or('options selected').value(),
          validFeedback: this.fallback().or($nativeSelect.attr('data-label-valid-feedback')).or((options.labels || {}).validFeedback).or('Ok').value(),
          invalidFeedback: this.fallback().or($nativeSelect.attr('data-label-invalid-feedback')).or((options.labels || {}).invalidFeedback).or('Incorrect value').value(),
          noSearchResults: this.fallback().or($nativeSelect.attr('data-label-no-search-results')).or((options.labels || {}).noSearchResults).or('No results').value()
        },
        keyboardActiveClass: this.fallback().or($nativeSelect.attr('data-keyboard-active-class')).or(options.keyboardActiveClass).or('heavy-rain-gradient').value(),
        placeholder: this.fallback().or($nativeSelect.attr('data-placeholder')).or(options.placeholder).or(null).value(),
        visibleOptions: this.fallback().or($nativeSelect.attr('data-visible-options')).or(options.visibleOptions).or(5).value(),
        maxSelectedOptions: this.fallback().or($nativeSelect.attr('data-max-selected-options')).or(options.maxSelectedOptions).or(5).value(),
        showResetButton: this.fallback().or($nativeSelect.attr('data-show-reset-button')).or(options.showResetButton).or(false).value()
      };
      this.uuid = $nativeSelect.attr('id') || this.options.selectId || this._randomUUID(); // eslint-disable-next-line no-undef

      this.view = new MaterialSelectView($nativeSelect, {
        options: this.options,
        properties: {
          id: this.uuid
        }
      });
      this.selectedOptionsIndexes = []; // jQuery indexes; `.eq()` is operating on these

      MaterialSelect.mutationObservers = [];
    }

    MaterialSelect.clearMutationObservers = function clearMutationObservers() {
      MaterialSelect.mutationObservers.forEach(function (observer) {
        observer.disconnect();
        observer.customStatus = 'stopped';
      });
    };

    MaterialSelect.mdbSelectAutoInit = function mdbSelectAutoInit() {
      $('.mdb-select.mdb-select-autoinit').materialSelect();
    };

    var _proto = MaterialSelect.prototype;

    _proto.init = function init() {
      var _this = this;

      if (this.options.destroy) {
        this.view.destroy();
        return;
      }

      if (this.isInitialized) {
        this.view.destroy();
      }

      this.view.render();
      this.view.selectPreselectedOptions(function (optionIndex) {
        return _this._toggleSelectedValue(optionIndex);
      });
      this.bindEvents();
    };

    _proto.bindEvents = function bindEvents() {
      var _this2 = this;

      this.bindMutationObserverChange();

      if (this.view.isEditable && this.view.isSearchable) {
        this.view.bindResetButtonClick(function () {
          return _this2._resetSelection();
        });
      }

      this.view.bindAddNewOptionClick();
      this.view.bindMaterialSelectFocus();
      this.view.bindMaterialSelectClick();
      this.view.bindMaterialSelectBlur();
      this.view.bindMaterialOptionsListTouchstart();
      this.view.bindMaterialSelectKeydown();
      this.view.bindMaterialSelectDropdownToggle();
      this.view.bindToggleAllClick(function (materialOptionIndex) {
        return _this2._toggleSelectedValue(materialOptionIndex);
      });
      this.view.bindMaterialOptionMousedown();
      this.view.bindMaterialOptionClick(function (optionIndex) {
        return _this2._toggleSelectedValue(optionIndex);
      });

      if (!this.view.isMultiple && this.view.isSearchable) {
        this.view.bindSingleMaterialOptionClick();
      }

      if (this.view.isSearchable) {
        this.view.bindSearchInputKeyup();
      }

      this.view.bindHtmlClick();
      this.view.bindMobileDevicesMousedown();
      this.view.bindSaveBtnClick(); // @Depreciated
    };

    _proto.bindMutationObserverChange = function bindMutationObserverChange() {
      var config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      };
      var observer = new MutationObserver(this._onMutationObserverChange.bind(this));
      observer.observe(this.view.$nativeSelect.get(0), config);
      observer.customId = this.uuid;
      observer.customStatus = 'observing';
      MaterialSelect.clearMutationObservers();
      MaterialSelect.mutationObservers.push(observer);
    };

    _proto._onMutationObserverChange = function _onMutationObserverChange(mutationsList) {
      mutationsList.forEach(function (mutation) {
        var $select = $(mutation.target).closest('select');

        if ($select.data('stop-refresh') !== true && (mutation.type === 'childList' || mutation.type === 'attributes' && $(mutation.target).is('option'))) {
          MaterialSelect.clearMutationObservers(); // eslint-disable-next-line object-curly-newline

          $select.materialSelect({
            destroy: true
          });
          $select.materialSelect();
        }
      });
    };

    _proto._resetSelection = function _resetSelection() {
      this.selectedOptionsIndexes = [];
      this.view.$nativeSelect.find('option').prop('selected', false);
    };

    _proto._toggleSelectedValue = function _toggleSelectedValue(optionIndex) {
      var selectedValueIndex = this.selectedOptionsIndexes.indexOf(optionIndex);
      var isSelected = selectedValueIndex !== -1;

      if (!isSelected) {
        this.selectedOptionsIndexes.push(optionIndex);
      } else {
        this.selectedOptionsIndexes.splice(selectedValueIndex, 1);
      }

      this.view.$nativeSelect.find('option').eq(optionIndex).prop('selected', !isSelected);

      this._setValueToMaterialSelect();

      return !isSelected;
    };

    _proto._setValueToMaterialSelect = function _setValueToMaterialSelect() {
      var _this3 = this;

      var value = '';
      var selectedValuesCount = this.selectedOptionsIndexes.length;
      this.selectedOptionsIndexes.forEach(function (index) {
        return value += ", " + _this3.view.$nativeSelect.find('option').eq(index).text().replace(/  +/g, ' ').trim();
      });

      if (this.options.maxSelectedOptions >= 0 && selectedValuesCount > this.options.maxSelectedOptions) {
        value = selectedValuesCount + " " + this.options.labels.optionsSelected;
      } else {
        value = value.substring(2);
      }

      if (value.length === 0) {
        value = this.view.$nativeSelect.find('option:disabled').eq(0).text();
      }

      this.view.$nativeSelect.siblings("" + (this.options.defaultMaterialInput ? 'input.multi-bs-select' : 'input.select-dropdown')).val(value);
    };

    _proto._randomUUID = function _randomUUID() {
      var d = new Date().getTime();
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line no-bitwise
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16); // eslint-disable-next-line no-bitwise

        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
    };

    _proto.fallback = function fallback() {
      return {
        _value: undefined,
        or: function or(value) {
          if (typeof value !== 'undefined' && typeof this._value === 'undefined') {
            this._value = value;
          }

          return this;
        },
        value: function value() {
          return this._value;
        }
      };
    };

    _createClass(MaterialSelect, [{
      key: "isInitialized",
      get: function get() {
        return Boolean(this.view.$nativeSelect.data('select-id')) && this.view.$nativeSelect.hasClass('initialized');
      }
    }]);

    return MaterialSelect;
  }();

  $.fn.materialSelect = function (options) {
    $(this).not('.browser-default').not('.custom-select').each(function () {
      var materialSelect = new MaterialSelect($(this), options);
      materialSelect.init();
    });
  };

  (function (originalVal) {
    $.fn.val = function (value) {
      if (!arguments.length) {
        return originalVal.call(this);
      }

      if (this.data('stop-refresh') !== true && this.hasClass('mdb-select') && this.hasClass('initialized')) {
        MaterialSelect.clearMutationObservers();
        this.materialSelect({
          destroy: true
        });
        var ret = originalVal.call(this, value);
        this.materialSelect();
        return ret;
      }

      return originalVal.call(this, value);
    };
  })($.fn.val);

  MaterialSelect.mdbSelectAutoInit();
});
jQuery(function ($) {
  var Sticky =
  /*#__PURE__*/
  function () {
    function Sticky(element, options) {
      this.defaults = {
        topSpacing: 0,
        zIndex: false,
        stopper: '#footer',
        stickyClass: false,
        startScrolling: 'top',
        minWidth: false
      };
      this.$element = element;
      this.options = this.assignOptions(options);
      this.$window = $(window);
      this.stopper = this.options.stopper;
      this.elementWidth = this.$element.outerWidth();
      this.elementHeight = this.$element.outerHeight(true);
      this.initialScrollTop = this.$element.offset().top;
      this.$placeholder = $('<div class="sticky-placeholder"></div>');
      this.scrollTop = 0;
      this.setPushPoint();
      this.setStopperPosition();
      this.bindEvents();
    }

    var _proto = Sticky.prototype;

    _proto.hasZIndex = function hasZIndex() {
      return typeof this.options.zIndex === 'number';
    };

    _proto.hasStopper = function hasStopper() {
      return $(this.options.stopper).length || typeof this.options.stopper === 'number';
    };

    _proto.isScreenHeightEnough = function isScreenHeightEnough() {
      return this.$element.outerHeight() + this.options.topSpacing < this.$window.height();
    };

    _proto.assignOptions = function assignOptions(options) {
      return $.extend({}, this.defaults, options);
    };

    _proto.setPushPoint = function setPushPoint() {
      if (this.options.startScrolling === 'bottom' && !this.isScreenHeightEnough()) {
        this.$pushPoint = this.initialScrollTop + this.$element.outerHeight(true) - this.$window.height();
      } else {
        this.$pushPoint = this.initialScrollTop - this.options.topSpacing;
      }
    };

    _proto.setStopperPosition = function setStopperPosition() {
      if (typeof this.options.stopper === 'string') {
        this.stopPoint = $(this.stopper).offset().top - this.options.topSpacing;
      } else if (typeof this.options.stopper === 'number') {
        this.stopPoint = this.options.stopper;
      }
    };

    _proto.bindEvents = function bindEvents() {
      this.$window.on('resize', this.handleResize.bind(this));
      this.$window.on('scroll', this.init.bind(this));
    };

    _proto.handleResize = function handleResize() {
      var $parent = this.$element.parent();
      this.elementWidth = $parent.width();
      this.elementHeight = this.$element.outerHeight(true);
      this.setPushPoint();
      this.setStopperPosition();
      this.init();
    } // eslint-disable-next-line consistent-return
    ;

    _proto.init = function init() {
      if (this.options.minWidth && this.options.minWidth > this.$window.innerWidth()) {
        return false;
      }

      if (this.options.startScrolling === 'bottom' && !this.isScreenHeightEnough()) {
        this.scrollTop = this.$window.scrollTop() + this.$window.height();
      } else {
        this.scrollTop = this.$window.scrollTop();
      }

      if (this.$pushPoint < this.scrollTop) {
        this.appendPlaceholder();
        this.stickyStart();
      } else {
        this.stickyEnd();
      }

      if (this.$window.scrollTop() > this.$pushPoint) {
        this.stop();
      } else {
        this.stickyEnd();
      }
    };

    _proto.appendPlaceholder = function appendPlaceholder() {
      this.$element.after(this.$placeholder);
      this.$placeholder.css({
        width: this.elementWidth,
        height: this.elementHeight
      });
    };

    _proto.stickyStart = function stickyStart() {
      if (this.options.stickyClass) {
        this.$element.addClass(this.options.stickyClass);
      } // @see: https://stackoverflow.com/a/4370047


      this.$element.get(0).style.overflow = 'scroll';
      var scrollHeight = this.$element.get(0).scrollHeight;
      this.$element.get(0).style.overflow = '';
      this.$element.css({
        position: 'fixed',
        width: this.elementWidth,
        height: scrollHeight
      });

      if (this.options.startScrolling === 'bottom' && !this.isScreenHeightEnough()) {
        this.$element.css({
          bottom: 0,
          top: ''
        });
      } else {
        this.$element.css({
          top: this.options.topSpacing
        });
      }

      if (this.hasZIndex()) {
        this.$element.css({
          zIndex: this.options.zIndex
        });
      }
    };

    _proto.stickyEnd = function stickyEnd() {
      if (this.options.stickyClass) {
        this.$element.removeClass(this.options.stickyClass);
      }

      this.$placeholder.remove();
      this.$element.css({
        position: 'static',
        top: this.options.topSpacing,
        width: '',
        height: ''
      });
    };

    _proto.stop = function stop() {
      if (this.stopPoint < $(this.$element).offset().top + this.$element.outerHeight(true)) {
        this.$element.css({
          position: 'absolute',
          bottom: 0,
          top: ''
        });
      }
    };

    return Sticky;
  }();

  $.fn.sticky = function (options) {
    $(this).each(function () {
      var sticky = new Sticky($(this), options);
      sticky.init();
    });
  };
});
/*!
 * perfect-scrollbar v1.4.0
 * (c) 2018 Hyunje Jun
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(window.PerfectScrollbar = factory());
}(this, (function () { 'use strict';

function get(element) {
  return getComputedStyle(element);
}

function set(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val + "px";
    }
    element.style[key] = val;
  }
  return element;
}

function div(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector);

function matches(element, query) {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

function remove(element) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
  );
}

var cls = {
  main: 'ps',
  element: {
    thumb: function (x) { return ("ps__thumb-" + x); },
    rail: function (x) { return ("ps__rail-" + x); },
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    clicking: 'ps--clicking',
    active: function (x) { return ("ps--active-" + x); },
    scrolling: function (x) { return ("ps--scrolling-" + x); },
  },
};

/*
 * Helper methods
 */
var scrollingClassTimeout = { x: null, y: null };

function addScrollingClass(i, x) {
  var classList = i.element.classList;
  var className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
  } else {
    classList.add(className);
  }
}

function removeScrollingClass(i, x) {
  scrollingClassTimeout[x] = setTimeout(
    function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
    i.settings.scrollingThreshold
  );
}

function setScrollingClassInstantly(i, x) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

var EventElement = function EventElement(element) {
  this.element = element;
  this.handlers = {};
};

var prototypeAccessors = { isEmpty: { configurable: true } };

EventElement.prototype.bind = function bind (eventName, handler) {
  if (typeof this.handlers[eventName] === 'undefined') {
    this.handlers[eventName] = [];
  }
  this.handlers[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function unbind (eventName, target) {
    var this$1 = this;

  this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
    if (target && handler !== target) {
      return true;
    }
    this$1.element.removeEventListener(eventName, handler, false);
    return false;
  });
};

EventElement.prototype.unbindAll = function unbindAll () {
    var this$1 = this;

  for (var name in this$1.handlers) {
    this$1.unbind(name);
  }
};

prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

  return Object.keys(this.handlers).every(
    function (key) { return this$1.handlers[key].length === 0; }
  );
};

Object.defineProperties( EventElement.prototype, prototypeAccessors );

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function eventElement (element) {
  var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
  if (!ee) {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function bind (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function unbind (element, eventName, handler) {
  var ee = this.eventElement(element);
  ee.unbind(eventName, handler);

  if (ee.isEmpty) {
    // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
  }
};

EventManager.prototype.unbindAll = function unbindAll () {
  this.eventElements.forEach(function (e) { return e.unbindAll(); });
  this.eventElements = [];
};

EventManager.prototype.once = function once (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (evt) {
    ee.unbind(eventName, onceHandler);
    handler(evt);
  };
  ee.bind(eventName, onceHandler);
};

function createEvent(name) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name);
  } else {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, undefined);
    return evt;
  }
}

var processScrollDiff = function(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent
) {
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var fields;
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down' ];
  } else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right' ];
  } else {
    throw new Error('A proper axis should be provided');
  }

  processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
};

function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start';
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end';
  }

  if (diff) {
    element.dispatchEvent(createEvent(("ps-scroll-" + y)));

    if (diff < 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + up)));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + down)));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
  }
}

function toInt(x) {
  return parseInt(x, 10) || 0;
}

function isEditable(el) {
  return (
    matches(el, 'input,[contenteditable]') ||
    matches(el, 'select,[contenteditable]') ||
    matches(el, 'textarea,[contenteditable]') ||
    matches(el, 'button,[contenteditable]')
  );
}

function outerWidth(element) {
  var styles = get(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

var env = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator !== 'undefined' &&
    /Chrome/i.test(navigator && navigator.userAgent),
};

var updateGeometry = function(i) {
  var element = i.element;
  var roundedScrollTop = Math.floor(element.scrollTop);
  var rect = element.getBoundingClientRect();

  i.containerWidth = Math.ceil(rect.width);
  i.containerHeight = Math.ceil(rect.height);
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt(i.railXWidth * i.containerWidth / i.contentWidth)
    );
    i.scrollbarXLeft = toInt(
      (i.negativeScrollAdjustment + element.scrollLeft) *
        (i.railXWidth - i.scrollbarXWidth) /
        (i.contentWidth - i.containerWidth)
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt(i.railYHeight * i.containerHeight / i.contentHeight)
    );
    i.scrollbarYTop = toInt(
      roundedScrollTop *
        (i.railYHeight - i.scrollbarYHeight) /
        (i.contentHeight - i.containerHeight)
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active('x'));
  } else {
    element.classList.remove(cls.state.active('x'));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active('y'));
  } else {
    element.classList.remove(cls.state.active('y'));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
};

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  var roundedScrollTop = Math.floor(element.scrollTop);

  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
  }
  set(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  set(i.scrollbarYRail, yRailOffset);

  set(i.scrollbarX, {
    left: i.scrollbarXLeft,
    width: i.scrollbarXWidth - i.railBorderXWidth,
  });
  set(i.scrollbarY, {
    top: i.scrollbarYTop,
    height: i.scrollbarYHeight - i.railBorderYWidth,
  });
}

var clickRail = function(i) {
  i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
};

var dragThumb = function(i) {
  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x',
    'scrollbarXRail' ]);
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y',
    'scrollbarYRail' ]);
};

function bindMouseScrollHandler(
  i,
  ref
) {
  var containerHeight = ref[0];
  var contentHeight = ref[1];
  var pageY = ref[2];
  var railYHeight = ref[3];
  var scrollbarY = ref[4];
  var scrollbarYHeight = ref[5];
  var scrollTop = ref[6];
  var y = ref[7];
  var scrollbarYRail = ref[8];

  var element = i.element;

  var startingScrollTop = null;
  var startingMousePageY = null;
  var scrollBy = null;

  function mouseMoveHandler(e) {
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
    addScrollingClass(i, y);
    updateGeometry(i);

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    removeScrollingClass(i, y);
    i[scrollbarYRail].classList.remove(cls.state.clicking);
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  }

  i.event.bind(i[scrollbarY], 'mousedown', function (e) {
    startingScrollTop = element[scrollTop];
    startingMousePageY = e[pageY];
    scrollBy =
      (i[contentHeight] - i[containerHeight]) /
      (i[railYHeight] - i[scrollbarYHeight]);

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    i[scrollbarYRail].classList.add(cls.state.clicking);

    e.stopPropagation();
    e.preventDefault();
  });
}

var keyboard = function(i) {
  var element = i.element;

  var elementHovered = function () { return matches(element, ':hover'); };
  var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (
        (scrollTop === 0 && deltaY > 0) ||
        (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (
        (scrollLeft === 0 && deltaX < 0) ||
        (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (
      (e.isDefaultPrevented && e.isDefaultPrevented()) ||
      e.defaultPrevented
    ) {
      return;
    }

    if (!elementHovered() && !scrollbarFocused()) {
      return;
    }

    var activeElement = document.activeElement
      ? document.activeElement
      : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37: // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38: // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39: // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40: // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 32: // space bar
        if (e.shiftKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 33: // page up
        deltaY = i.containerHeight;
        break;
      case 34: // page down
        deltaY = -i.containerHeight;
        break;
      case 36: // home
        deltaY = i.contentHeight;
        break;
      case 35: // end
        deltaY = -i.contentHeight;
        break;
      default:
        return;
    }

    if (i.settings.suppressScrollX && deltaX !== 0) {
      return;
    }
    if (i.settings.suppressScrollY && deltaY !== 0) {
      return;
    }

    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    updateGeometry(i);

    if (shouldPreventDefault(deltaX, deltaY)) {
      e.preventDefault();
    }
  });
};

var wheel = function(i) {
  var element = i.element;

  function shouldPreventDefault(deltaX, deltaY) {
    var roundedScrollTop = Math.floor(element.scrollTop);
    var isTop = element.scrollTop === 0;
    var isBottom =
      roundedScrollTop + element.offsetHeight === element.scrollHeight;
    var isLeft = element.scrollLeft === 0;
    var isRight =
      element.scrollLeft + element.offsetWidth === element.scrollWidth;

    var hitsBound;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector('select:focus')) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e) {
    var ref = getDeltaFromEvent(e);
    var deltaX = ref[0];
    var deltaY = ref[1];

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    var shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== 'undefined') {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== 'undefined') {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
};

var touch = function(i) {
  if (!env.supportsTouch && !env.supportsIePointer) {
    return;
  }

  var element = i.element;

  function shouldPrevent(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (
        (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
        (deltaY > 0 && scrollTop === 0)
      ) {
        // set prevent for mobile Chrome refresh
        return window.scrollY === 0 && deltaY > 0 && env.isChrome;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (
        (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
        (deltaX > 0 && scrollLeft === 0)
      ) {
        return true;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;
    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }

  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (
      e.pointerType &&
      e.pointerType !== 'mouse' &&
      e.pointerType !== e.MSPOINTER_TYPE_MOUSE
    ) {
      return true;
    }
    return false;
  }

  function touchStart(e) {
    if (!shouldHandle(e)) {
      return;
    }

    var touch = getTouch(e);

    startOffset.pageX = touch.pageX;
    startOffset.pageY = touch.pageY;

    startTime = new Date().getTime();

    if (easingLoop !== null) {
      clearInterval(easingLoop);
    }
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function touchMove(e) {
    if (shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
        return;
      }

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPrevent(differenceX, differenceY)) {
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (i.settings.swipeEasing) {
      clearInterval(easingLoop);
      easingLoop = setInterval(function() {
        if (i.isInitialized) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (env.supportsTouch) {
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (env.supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
};

var defaultSettings = function () { return ({
  handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: true,
  wheelSpeed: 1,
}); };

var handlers = {
  'click-rail': clickRail,
  'drag-thumb': dragThumb,
  keyboard: keyboard,
  wheel: wheel,
  touch: touch,
};

var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
  var this$1 = this;
  if ( userSettings === void 0 ) userSettings = {};

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!element || !element.nodeName) {
    throw new Error('no element is specified to initialize PerfectScrollbar');
  }

  this.element = element;

  element.classList.add(cls.main);

  this.settings = defaultSettings();
  for (var key in userSettings) {
    this$1.settings[key] = userSettings[key];
  }

  this.containerWidth = null;
  this.containerHeight = null;
  this.contentWidth = null;
  this.contentHeight = null;

  var focus = function () { return element.classList.add(cls.state.focus); };
  var blur = function () { return element.classList.remove(cls.state.focus); };

  this.isRtl = get(element).direction === 'rtl';
  this.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? element.scrollWidth - element.clientWidth
    : 0;
  this.event = new EventManager();
  this.ownerDocument = element.ownerDocument || document;

  this.scrollbarXRail = div(cls.element.rail('x'));
  element.appendChild(this.scrollbarXRail);
  this.scrollbarX = div(cls.element.thumb('x'));
  this.scrollbarXRail.appendChild(this.scrollbarX);
  this.scrollbarX.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarX, 'focus', focus);
  this.event.bind(this.scrollbarX, 'blur', blur);
  this.scrollbarXActive = null;
  this.scrollbarXWidth = null;
  this.scrollbarXLeft = null;
  var railXStyle = get(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
  if (isNaN(this.scrollbarXBottom)) {
    this.isScrollbarXUsingBottom = false;
    this.scrollbarXTop = toInt(railXStyle.top);
  } else {
    this.isScrollbarXUsingBottom = true;
  }
  this.railBorderXWidth =
    toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
  // Set rail to display:block to calculate margins
  set(this.scrollbarXRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
  set(this.scrollbarXRail, { display: '' });
  this.railXWidth = null;
  this.railXRatio = null;

  this.scrollbarYRail = div(cls.element.rail('y'));
  element.appendChild(this.scrollbarYRail);
  this.scrollbarY = div(cls.element.thumb('y'));
  this.scrollbarYRail.appendChild(this.scrollbarY);
  this.scrollbarY.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarY, 'focus', focus);
  this.event.bind(this.scrollbarY, 'blur', blur);
  this.scrollbarYActive = null;
  this.scrollbarYHeight = null;
  this.scrollbarYTop = null;
  var railYStyle = get(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(railYStyle.right, 10);
  if (isNaN(this.scrollbarYRight)) {
    this.isScrollbarYUsingRight = false;
    this.scrollbarYLeft = toInt(railYStyle.left);
  } else {
    this.isScrollbarYUsingRight = true;
  }
  this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
  this.railBorderYWidth =
    toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
  set(this.scrollbarYRail, { display: 'block' });
  this.railYMarginHeight =
    toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
  set(this.scrollbarYRail, { display: '' });
  this.railYHeight = null;
  this.railYRatio = null;

  this.reach = {
    x:
      element.scrollLeft <= 0
        ? 'start'
        : element.scrollLeft >= this.contentWidth - this.containerWidth
          ? 'end'
          : null,
    y:
      element.scrollTop <= 0
        ? 'start'
        : element.scrollTop >= this.contentHeight - this.containerHeight
          ? 'end'
          : null,
  };

  this.isAlive = true;

  this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

  this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
  this.lastScrollLeft = element.scrollLeft; // for onScroll only
  this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
  updateGeometry(this);
};

PerfectScrollbar.prototype.update = function update () {
  if (!this.isAlive) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? this.element.scrollWidth - this.element.clientWidth
    : 0;

  // Recalculate rail margins
  set(this.scrollbarXRail, { display: 'block' });
  set(this.scrollbarYRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(get(this.scrollbarXRail).marginLeft) +
    toInt(get(this.scrollbarXRail).marginRight);
  this.railYMarginHeight =
    toInt(get(this.scrollbarYRail).marginTop) +
    toInt(get(this.scrollbarYRail).marginBottom);

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  set(this.scrollbarXRail, { display: 'none' });
  set(this.scrollbarYRail, { display: 'none' });

  updateGeometry(this);

  processScrollDiff(this, 'top', 0, false, true);
  processScrollDiff(this, 'left', 0, false, true);

  set(this.scrollbarXRail, { display: '' });
  set(this.scrollbarYRail, { display: '' });
};

PerfectScrollbar.prototype.onScroll = function onScroll (e) {
  if (!this.isAlive) {
    return;
  }

  updateGeometry(this);
  processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
  processScrollDiff(
    this,
    'left',
    this.element.scrollLeft - this.lastScrollLeft
  );

  this.lastScrollTop = Math.floor(this.element.scrollTop);
  this.lastScrollLeft = this.element.scrollLeft;
};

PerfectScrollbar.prototype.destroy = function destroy () {
  if (!this.isAlive) {
    return;
  }

  this.event.unbindAll();
  remove(this.scrollbarX);
  remove(this.scrollbarY);
  remove(this.scrollbarXRail);
  remove(this.scrollbarYRail);
  this.removePsClasses();

  // unset elements
  this.element = null;
  this.scrollbarX = null;
  this.scrollbarY = null;
  this.scrollbarXRail = null;
  this.scrollbarYRail = null;

  this.isAlive = false;
};

PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
  this.element.className = this.element.className
    .split(' ')
    .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
    .join(' ');
};

return PerfectScrollbar;

})));
(function ($) {
  var inputData = {};
  var dataColor = '';
  var buttonCloseColor = '';
  var buttonCloseBlurColor = '#ced4da';
  var inputFocus = '1px solid #4285f4';
  var inputBlur = '1px solid #ced4da';
  var inputFocusShadow = '0 1px 0 0 #4285f4';
  var inputBlurShadow = '';
  var enterCharCode = 13;
  var arrowUpCharCode = 38;
  var arrowDownCharCode = 40;
  var count = -1;
  var nextScrollHeight = -45;

  var mdbAutocomplete =
  /*#__PURE__*/
  function () {
    function mdbAutocomplete(input, options) {
      this.defaults = {
        data: inputData,
        dataColor: dataColor,
        closeColor: buttonCloseColor,
        closeBlurColor: buttonCloseBlurColor,
        inputFocus: inputFocus,
        inputBlur: inputBlur,
        inputFocusShadow: inputFocusShadow,
        inputBlurShadow: inputBlurShadow
      };
      this.$input = input;
      this.options = this.assignOptions(options);
      this.$clearButton = $('.mdb-autocomplete-clear');
      this.$autocompleteWrap = $('<ul class="mdb-autocomplete-wrap"></ul>');
      this.init();
    }

    var _proto = mdbAutocomplete.prototype;

    _proto.init = function init() {
      this.setData();
      this.inputFocus();
      this.inputBlur();
      this.inputKeyupData();
      this.inputLiClick();
      this.clearAutocomplete();
    };

    _proto.assignOptions = function assignOptions(options) {
      return $.extend({}, this.defaults, options);
    };

    _proto.setData = function setData() {
      if (Object.keys(this.options.data).length) {
        this.$autocompleteWrap.insertAfter(this.$input);
      }
    };

    _proto.inputFocus = function inputFocus() {
      var _this = this;

      this.$input.on('focus', function () {
        _this.$input.css('border-bottom', _this.options.inputFocus);

        _this.$input.css('box-shadow', _this.options.inputFocusShadow);
      });
    };

    _proto.inputBlur = function inputBlur() {
      var _this2 = this;

      this.$input.on('blur', function () {
        _this2.$input.css('border-bottom', _this2.options.inputBlur);

        _this2.$input.css('box-shadow', _this2.options.inputBlurShadow);
      });
    };

    _proto.inputKeyupData = function inputKeyupData() {
      var _this3 = this;

      this.$input.on('keyup', function (e) {
        if (e.which === enterCharCode) {
          if (!_this3.options.data.includes(_this3.$input.val())) {
            _this3.options.data.push(_this3.$input.val());
          }

          _this3.$autocompleteWrap.find('.selected').trigger('click');

          _this3.$autocompleteWrap.empty();

          _this3.inputBlur();

          count = -1;
          nextScrollHeight = -45;
          return count;
        }

        var $inputValue = _this3.$input.val();

        _this3.$autocompleteWrap.empty();

        if ($inputValue.length) {
          for (var item in _this3.options.data) {
            if (_this3.options.data[item].toLowerCase().indexOf($inputValue.toLowerCase()) !== -1) {
              var option = $("<li>" + _this3.options.data[item] + "</li>");

              _this3.$autocompleteWrap.append(option);
            }
          }

          var $ulList = _this3.$autocompleteWrap;

          var $ulItems = _this3.$autocompleteWrap.find('li');

          var nextItemHeight = $ulItems.eq(count).outerHeight();
          var previousItemHeight = $ulItems.eq(count - 1).outerHeight();

          if (e.which === arrowDownCharCode) {
            if (count > $ulItems.length - 2) {
              count = -1;
              $ulItems.scrollTop(0);
              nextScrollHeight = -45;
              return;
            } else {
              count++;
            }

            nextScrollHeight += nextItemHeight;
            $ulList.scrollTop(nextScrollHeight);
            $ulItems.eq(count).addClass('selected');
          } else if (e.which === arrowUpCharCode) {
            if (count < 1) {
              count = $ulItems.length;
              $ulList.scrollTop($ulList.prop('scrollHeight'));
              nextScrollHeight = $ulList.prop('scrollHeight') - nextItemHeight;
            } else {
              count--;
            }

            nextScrollHeight -= previousItemHeight;
            $ulList.scrollTop(nextScrollHeight);
            $ulItems.eq(count).addClass('selected');
          }

          if ($inputValue.length === 0) {
            _this3.$clearButton.css('visibility', 'hidden');
          } else {
            _this3.$clearButton.css('visibility', 'visible');
          }

          _this3.$autocompleteWrap.children().css('color', _this3.options.dataColor);
        } else {
          _this3.$clearButton.css('visibility', 'hidden');
        }
      });
    };

    _proto.inputLiClick = function inputLiClick() {
      var _this4 = this;

      this.$autocompleteWrap.on('click', 'li', function (e) {
        e.preventDefault();

        _this4.$input.val($(e.target).text());

        _this4.$autocompleteWrap.empty();
      });
    };

    _proto.clearAutocomplete = function clearAutocomplete() {
      var _this5 = this;

      this.$clearButton.on('click', function (e) {
        count = -1;
        nextScrollHeight = -45;
        e.preventDefault();
        var $this = $(e.currentTarget);
        $this.parent().find('.mdb-autocomplete').val('');
        $this.css('visibility', 'hidden');

        _this5.$autocompleteWrap.empty();

        $this.parent().find('label').removeClass('active');
      });
    };

    _proto.changeSVGcolors = function changeSVGcolors() {
      var _this6 = this;

      if (this.$input.hasClass('mdb-autocomplete')) {
        this.$input.on('click keyup', function (e) {
          e.preventDefault();
          $(e.target).parent().find('.mdb-autocomplete-clear').find('svg').css('fill', _this6.options.closeColor);
        });
        this.$input.on('blur', function (e) {
          e.preventDefault();
          $(e.target).parent().find('.mdb-autocomplete-clear').find('svg').css('fill', _this6.options.closeBlurColor);
        });
      }
    };

    return mdbAutocomplete;
  }();

  $.fn.mdbAutocomplete = function (options) {
    return this.each(function () {
      new mdbAutocomplete($(this), options);
    });
  };
})(jQuery);
/*
    Enhanced Bootstrap Modals
    https://mdbootstrap.com
    office@mdbootstrap.com
*/

(function($){
  $('body').on('shown.bs.modal', '.modal', function() {
    if(!$('.modal-backdrop').length) {

      $modal_dialog = $(this).children('.modal-dialog')

      if($modal_dialog.hasClass('modal-side')) {
        $(this).addClass('modal-scrolling');
        $('body').addClass('scrollable');
      }

      if($modal_dialog.hasClass('modal-frame')) {
        $(this).addClass('modal-content-clickable');
        $('body').addClass('scrollable');
      }
    }
  });
  $('body').on('hidden.bs.modal', '.modal', function() {
    $('body').removeClass('scrollable');
  });
})(jQuery);

(function ($) {
  $.fn.mdbTreeview = function () {
    var $this = $(this);

    if ($this.hasClass('treeview')) {
      var $toggler = $this.find('.rotate');
      $.each($toggler, function (e) {
        $($toggler[e]).off('click');
        $($toggler[e]).on('click', function () {
          var $this = $(this);
          $this.siblings('.nested').toggleClass('active');
          $this.toggleClass('down');
        });
      });
    }

    if ($this.hasClass('treeview-animated')) {
      var $elements = $this.find('.treeview-animated-element');
      var $closed = $this.find('.closed');
      $this.find('.nested').hide();
      $closed.off('click');
      $closed.on('click', function () {
        var $this = $(this);
        var $target = $this.siblings('.nested');
        var $pointer = $this.children('.fa-angle-right');
        $this.toggleClass('open');
        $pointer.toggleClass('down');
        !$target.hasClass('active') ? $target.addClass('active').slideDown() : $target.removeClass('active').slideUp();
        return false;
      });
      $elements.off('click');
      $elements.on('click', function () {
        var $this = $(this);
        $this.hasClass('opened') ? $this.removeClass('opened') : ($elements.removeClass('opened'), $this.addClass('opened'));
      });
    }

    if ($this.hasClass('treeview-colorful')) {
      var _$elements = $this.find('.treeview-colorful-element');

      var $header = $this.find('.treeview-colorful-items-header');
      $this.find('.nested').hide();
      $header.off('click');
      $header.on('click', function () {
        var $this = $(this);
        var $target = $this.siblings('.nested');
        var $pointerPlus = $this.children('.fa-plus-circle');
        var $pointerMinus = $this.children('.fa-minus-circle');
        $this.toggleClass('open');
        $pointerPlus.removeClass('fa-plus-circle');
        $pointerPlus.addClass('fa-minus-circle');
        $pointerMinus.removeClass('fa-minus-circle');
        $pointerMinus.addClass('fa-plus-circle');
        !$target.hasClass('active') ? $target.addClass('active').slideDown() : $target.removeClass('active').slideUp();
      });

      _$elements.off('click');

      _$elements.on('click', function () {
        var $this = $(this);
        $this.hasClass('opened') ? _$elements.removeClass('opened') : (_$elements.removeClass('opened'), $this.addClass('opened'));
      });
    }
  };
})(jQuery);