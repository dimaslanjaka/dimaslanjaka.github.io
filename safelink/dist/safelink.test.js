import safelink from './safelink';
var sf = new safelink({
    exclude: ['webmanajemen.com'],
});
sf.parse("\n<a href=\"http://google.com\">google.com</a>\n<a href=\"http://webmanajemen.com\">webmanajemen.com</a>\n<a id=\"idx\" href=\"http://webmanajemen.com\">webmanajemen.com</a>\n<a id=\"idx\" class=\"\" data-x=\"\" href=\"http://webmanajemen.com\">webmanajemen.com</a>\n<a id=idx href=http://webmanajemen.com>webmanajemen.com</a>\n<a id=\"idx\" href=\"http://webmanajemen.com?sdsjdjsd#sasdhdshsfjfdj\">webmanajemen.com</a>\n");
