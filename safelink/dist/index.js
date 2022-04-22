import { default as _parseQuery } from './parseQuery';
import { default as _resolveQueryUrl } from './resolveQueryUrl';
import { default as _safelink } from './safelink';
var _global_safelinkify = (window /* browser */ || global) /* node */;
var safelinkify;
(function (safelinkify) {
    safelinkify.resolveQueryUrl = _resolveQueryUrl;
    safelinkify.parseQuery = _parseQuery;
    safelinkify.safelink = _safelink;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = safelinkify;
    }
    _global_safelinkify.safelinkify = safelinkify;
})(safelinkify || (safelinkify = {}));
export default safelinkify;
