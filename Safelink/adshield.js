/** Script By Dimas Lanjaka (L3n4r0x) **/
function ASSetCookie(a, b, c) {
    var d = new Date;
    d.setDate(d.getDate() + c);
    var e = escape(b) + (0 == c ? ";path=/" : "; expires=" + d.toUTCString()) + ";path=/";
    document.cookie = a + "=" + e
}

function ASGetCookie(a) {
    var b, c, d, e = document.cookie.split(";");
    for (b = 0; b < e.length; b++)
        if (c = e[b].substr(0, e[b].indexOf("=")), d = e[b].substr(e[b].indexOf("=") + 1), c = c.replace(/^\s+|\s+$/g, ""), c == a) return unescape(d)
}

function ASSetCookieAds(a, b) {
    var c = ASGetCookie(a);
    void 0 != c && "" != c ? (ASTheCookieInt = parseInt(c) + 1, ASSetCookie(a, ASTheCookieInt.toString(), 0)) : ASSetCookie(a, "1", b)
}

function ASMaxClick(a, b) {
    var c = ASGetCookie(a);
    return void 0 != c && parseInt(c) >= b ? !0 : !1
}
jQuery(document).ready(function(a) {
    var b = "adsShield",
        c = 7,
        d = 3,
        e = ".adsShield",
        f = !1;
    ASMaxClick(b, d) && a(e).hide("fast"), a(e).bind("mouseover", function() {
        f = !0
    }).bind("mouseout", function() {
        f = !1
    }), a(window).on("beforeunload", function() {
        f && (ASMaxClick(b, d) ? a(e).hide("fast") : ASSetCookieAds(b, c))
    })
});