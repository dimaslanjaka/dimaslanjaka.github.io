/**
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, [https://gomakethings.com]{@link https://gomakethings.com}
 * @param  {Object} obj The object
 * @return {String}     The object type
 * @see [Codepen]{@link https://codepen.io/cferdinandi/pen/aXzNze}
 * @see [Source]{@link https://vanillajstoolkit.com/helpers/truetypeof/}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function trueTypeOf(obj: object): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
