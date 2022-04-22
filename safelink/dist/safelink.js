import encryptionURL from './encryptionURL';
import toURL from './toURL';
var _global_safelink = (window /* browser */ || global) /* node */;
var safelink = /** @class */ (function () {
    function safelink(opt) {
        this.options = {
            exclude: [],
            redirect: 'https://dimaslanjaka.github.io/page/safelink.html?url=',
            password: 'root',
            verbose: false,
            type: 'base64',
        };
        this.options = Object.assign(this.options, opt);
    }
    safelink.prototype.isExcluded = function (url) {
        var excludes = this.options.exclude;
        var value = String(url);
        var parsed = url instanceof URL ? url : toURL(value);
        for (var i = 0; i < excludes.length; i++) {
            var pattern = excludes[i];
            if (typeof pattern == 'string') {
                if (value.match(/^https?:\/\//)) {
                    // only validate full url
                    if (parsed.host.includes(pattern))
                        return true;
                }
            }
            else if (pattern instanceof RegExp) {
                if (value.match(pattern))
                    return true;
            }
        }
        return false;
    };
    safelink.prototype.parse = function (str) {
        var _this = this;
        return new Promise(function (resolve) {
            var content = str;
            var self = _this;
            var result = [];
            if (typeof content == 'string') {
                var regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gm;
            }
            else if (content instanceof HTMLElement) {
                var tagname = content.tagName.toLowerCase();
                if (tagname != 'a') {
                    var links = Array.from(content.querySelectorAll('a'));
                    for (var i = 0; i < links.length; i++) {
                        var a = links[i];
                        var href = toURL(a.href);
                        var encryption = encryptionURL(href, self.options.password, self.options.verbose);
                        var excluded = self.isExcluded(href);
                        result.push(Object.assign(encryption, {
                            href: href.href,
                            isExcluded: excluded,
                        }));
                        if (!excluded) {
                            var enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
                            a.href = self.options.redirect + enc;
                            a.target = '_blank';
                            a.rel = 'nofollow noopener noreferer';
                        }
                    }
                }
            }
            return resolve(result);
        });
    };
    return safelink;
}());
export default safelink;
_global_safelink.safelink = safelink;
