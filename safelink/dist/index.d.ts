import { default as _parseQuery } from './parseQuery';
import { default as _resolveQueryUrl } from './resolveQueryUrl';
import { default as _safelink } from './safelink';
declare namespace safelinkify {
    const resolveQueryUrl: typeof _resolveQueryUrl;
    const parseQuery: typeof _parseQuery;
    const safelink: typeof _safelink;
}
export default safelinkify;
