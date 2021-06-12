/**
 * get url parameter by name
 * @param name parameter name
 * @param url url target, null for current location.href
 * @see https://stackoverflow.com/a/901144
 * @returns
 * @example
 * ```js
 * // query string: ?foo=lorem&bar=&baz
 * var foo = getParameterByName('foo'); // "lorem"
 * var bar = getParameterByName('bar'); // "" (present with empty value)
 * var baz = getParameterByName('baz'); // "" (present with no value)
 * var qux = getParameterByName('qux'); // null (absent)
 * ```
 */
function getParameterByName(name: string, url: string | null = null) {
  if (typeof URLSearchParams !== "undefined") {
    if (!window.location.search) {
      url = window.location.href;
    } else {
      url = window.location.search;
    }
    const urlParams = new URLSearchParams(url);
    return urlParams.get(name);
  }
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
