import { default as _parseQuery } from './parseQuery';
import { default as _resolveQueryUrl } from './resolveQueryUrl';
import { default as _safelink } from './safelink';

const _global_safelinkify = (typeof window !== 'undefined' ? window : global) as any;
namespace safelinkify {
  export const resolveQueryUrl = _resolveQueryUrl;
  export const parseQuery = _parseQuery;
  export const safelink = _safelink;
  declare var module: any;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = safelinkify;
  }
  _global_safelinkify.safelinkify = safelinkify;
  _global_safelinkify.safelink = safelink;
}
_global_safelinkify.safelinkify = safelinkify;
_global_safelinkify.safelink = _safelink;

export default safelinkify;
export { encryptionURLResult, Nullable, resolveQueryResult, SafelinkOptions } from './globals';
