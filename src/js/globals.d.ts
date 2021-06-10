/// <reference types="jquery" />
/// <reference types="datatables.net"/>
/// <reference types="datatables.net-buttons"/>
/// <reference types="select2"/>
/// <reference lib="dom" />
/// <reference path="./lib.dom.d.ts" />

declare const $: JQuery;

type jQuery = JQuery;

interface smartformConfig {
  /**
   * Show console log debug
   */
  console_log: boolean;
}

interface JQuery extends jQuery {
  smartform_config: smartformConfig;

  //select2: Select2Plugin<TElement>;

  // noinspection TypeScriptRedundantGenericType
  /**
   * Select2 jQuery
   * @param options
   * @see https://select2.org/
   */
  select2(options: Select2.Options<Select2.DataFormat | Select2.GroupedDataFormat, Select2.LoadingData>): any;

  /**
   * Material bootstrap select. (only works on MDB template)
   */
  materialSelect(): any;

  /**
   * Hyperlink open new tab with custom window name
   * ```html
   * <a href="http://example.net" target="nameWindow" id="test">Test</a>
   * <script>
   *     $("a#test").newTab();
   * </script>
   * ```
   */
  newTab(): void;

  /**
   * Tooltip
   * @param action show hide
   */
  tooltip(action: "show" | "hide" | any): void;

  /**
   * Get current ID(*) or NAME attribute
   */
  get_unique_identifier(): String;

  /**
   * Auto height textarea based on input
   * @example $('textarea').autoHeight();
   * @see https://mdbootstrap.com/support/general/text-area-auto-grow/
   */
  autoHeight(): void;

  /**
   * @see https://github.com/imalliar/jquery.progressBarTimer
   * @param arg0
   */
  progressBarTimer(arg0: {
    warningThreshold: number;
    timeLimit: string | number;
    baseStyle: any;
    warningStyle: any;
    completeStyle: any;
    smooth: boolean;
    striped: boolean;
    animated: boolean;
    height: number;
    onFinish: () => void;
    label: {
      show: boolean;
      type: "percent"; // percent or 'seconds' => 23/60
    };
    autoStart: boolean;
  });

  /**
   * Check if element has attribute
   */
  hasAttr(name: string): boolean;

  linkify(opt: linkifyConfig): any;
}

interface linkifyConfig {
  hashtagUrlBuilder: any;
  includeW3: boolean;
  target: string;
  noFollow: boolean;
}

declare namespace JQuery {
  type TypeOrArray<T> = T | T[];
  type Node = Element | Text | Comment | Document | DocumentFragment;

  /**
   * The PlainObject type is a JavaScript object containing zero or more key-value pairs. The plain object is, in
   * other words, an Object object. It is designated "plain" in jQuery documentation to distinguish it from other
   * kinds of JavaScript objects: for example, null, user-defined arrays, and host objects such as document, all of
   * which have a typeof value of "object."
   *
   * **Note**: The type declaration of PlainObject is imprecise. It includes host objects and user-defined arrays
   * which do not match jQuery's definition.
   */
  interface PlainObject<T = any> {
    [key: string]: T;
  }

  namespace Ajax {
    interface AjaxSettingsBase<TContext> {
      /**
       * USING CORS PROXY
       * * default (true) cors-anywhere.herokuapp.com
       */
      proxy?: boolean | string;
      /**
       * Dump ajax request using toastr
       */
      dump?: boolean;
      /**
       * Show loading Icon ajax
       * * default false
       */
      indicator?: boolean;
      /**
       * Silent from toastr after ajax success
       */
      silent?: boolean;
    }
  }
}

interface JQueryStatic {
  /**
   * User framework
   * @copyright Universal PHPJS Framework
   */
  user: user;

  /**
   * ```js
   * // listen on specific wrapper
   * $.arrive('#container', function(){
   * console.log($(this));
   * });
   * // listen on all elements wrapper
   * $.arrive(function(){
   * console.log($(this));
   * });
   * ```
   * Add event to added element on dom
   * @todo listen new dom element added
   * @param target pseudo selector
   * @param callback callback function
   */
  arrive(target?: string | any, callback: any): any;

  /**
   * Generates a GUID string.
   * @returns The generated GUID.
   * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
   * @author Slavik Meltser.
   * @link http://slavik.meltser.info/?p=142
   * @copyright Universal PHPJS Framework
   */
  guid(): String;
}

interface JQueryAjaxSettings extends JQueryAjaxSettings {
  silent?: boolean;
  indicator?: boolean;
  /**
   * Set proxy CORS, default cors-anywhere
   */
  proxy?: boolean | string;
  dump?: boolean;
}

interface XMLHttpRequest extends XMLHttpRequestEventTarget {
  responseJSON: Array<any> | Object | null;
}

interface EventTarget {
  matches(pattern: string): boolean;
}

/**
 * Progressbar timer
 */

/**
 * Arrays
 */
interface Array<T> {
  /**
   * Array unique
   * @example
   * var duplicate = [1,2,1,2,3,4,5,6];
   * var unique = duplicate.unique(); // [1,2,3,4,5,6]
   */
  unique: () => Array<T>;
  /**
   * Pick random array element
   */
  random: () => any;

  /**
   * Add Element
   * @param element
   * @example
   * var a = [1,2];
   * a.add(3);
   * console.log(a); // [1,2,3]
   *
   * var b = [0,9];
   * console.log(b.add(2)); // [0,9,2]
   */
  add(element: any): Array<T>;

  /**
   * Add other array
   * @param otherArray
   * @example
   * var a = [0,1];
   * var b = ['a','b'];
   * console.log(b.addAll(a)); //['a','b',0,1]
   * var c = ['z',10];
   * c.add(b);
   * console.log(c); // ['z',10,'a','b',0,1]
   */
  addAll(otherArray: Array): Array<T>;

  /**
   * Get element in range from array
   * @param start start number index
   * @param end end number index
   * @example
   * const arr = [1, 2, 3, 4, 5];
   * console.log(arr.range(1, 3));
   */
  range(start: number, end: number): Array<T>;

  /**
   * Returns true  if self contains no elements.
   */
  isEmpty(): boolean;

  /**
   * Returns the first element, or the first n elements, of the array.
   * If the array is empty, requesting one element returns undefined ,
   * and requesting multiple elements returns an empty array.
   * @example
   *   var a = [ "q", "r", "s", "t" ]
   *   a.first()   // => "q"
   *   a.first(2)  // => ["q", "r"]
   */
  first(n: number): Array<T>;

  /**
   * Returns the last element(s) of self.
   * If the array is empty, returns undefined  if only one element requested.
   * @example
   *   var a = [ "w", "x", "y", "z" ]
   *   a.last()     // => "z"
   *   a.last(2)    // => ["y", "z"]
   */
  last(n: number): Array<T>;

  /**
   * Unset element value from array
   * @param n value element
   * @example
   * var arr = ['a','b','c'];
   * arr.unset('c');
   * console.log(arr); // ['a','b']
   */
  unset(n: any): void;

  /**
   * Deletes the element at the specified index, returning that element, or undefined  if the index is out of range.
   * A negative index is counted from the end of the array, where -1 corresponds to the last element. Returns self
   * for chaining purposes.
   * @example
   *   var a = ["ant", "bat", "cat", "dog"]
   *   a.deleteAt(2)    // => "cat"
   *   a                // => ["ant", "bat", "dog"]
   *   a.deleteAt(99)   // => undefined
   */
  deleteAt(n: number): Array<T>;

  /**
   * Removes null  and undefined  elements from the array, turning it into a dense array.
   * Returns self for chaining purposes
   */
  compact(): Array<T>;

  /**
   * Check element index exists
   * @example
   * ['a','b'].exists(1); //true
   * ['a','b'].exists(4); //false
   */
  exists(n: number): boolean;

  /**
   * Check array contains string/any
   * @param obj
   * @example
   * alert([1, 2, 3].contains(2)); // => true
   * alert([1, 2, 3].contains('2')); // => false
   */
  contains(obj: any): boolean;

  /**
   * Shuffle arrays.
   * @description Randomize array elements
   * @example
   * alert([1,2,3,4,5].shuffle())
   */
  shuffle(): Array<T>;
}

/**
 * Strings
 */
interface String {
  /**
   * Truncate string
   * @param n sequence number to cut the next sentence
   * @param useWordBoundary true ? subString.substr(0, subString.lastIndexOf(" "))
   * @see https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
   */
  truncate: (n: number, useWordBoundary: boolean | null) => string;

  /**
   * Matches a string an object that supports being matched against, and returns an array containing the results of
   * that search.
   * @param matcher An object that supports being matched against.
   */
  match(matcher: { [Symbol.match](string: string): RegExpMatchArray | null }): RegExpMatchArray | null;

  /**
   * Replaces text in a string, using an object that supports replacement within a string.
   * @param searchValue A object can search for and replace matches within a string.
   * @param replaceValue A string containing the text to replace for every successful match of searchValue in this
   *     string.
   */
  replace(
    searchValue: {
      [Symbol.replace](string: string, replaceValue: string): string;
    },
    replaceValue: string
  ): string;

  /**
   * Replaces text in a string, using an object that supports replacement within a string.
   * @param searchValue A object can search for and replace matches within a string.
   * @param replacer A function that returns the replacement text.
   */
  replace(
    searchValue: {
      [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
    },
    replacer: (substring: string, ...args: any[]) => string
  ): string;

  /**
   * Finds the first substring match in a regular expression search.
   * @param searcher An object which supports searching within a string.
   */
  search(searcher: { [Symbol.search](string: string): number }): number;

  /**
   * Split a string into substrings using the specified separator and return them as an array.
   * @param splitter An object that can split a string.
   * @param limit A value used to limit the number of elements returned in the array.
   */
  split(splitter: { [Symbol.split](string: string, limit?: number): string[] }, limit?: number): string[];

  /**
   * Parse url into part object
   */
  parse_url(): {
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    searchObject: {};
    hash: string;
    protohost: string;
  };

  /**
   * Call css from url/path
   */
  CSS(): void;

  /**
   * Hex encrypt
   */
  hexE(): string;

  /**
   * Hex Decrypt
   */
  hexD(): string;

  /**
   * Capitalize all first character string
   * @example [PHP] ucwords($string)
   */
  capitalize(): string;

  /**
   * PHP str_rot13 equivalent
   */
  rot13(): string;

  /**
   * Check if string empty or blank
   */
  isEmpty(): boolean;
}

/**
 * Datatables
 */
declare namespace DataTables {
  interface ExtButtonsSettings {
    //refresh: ExtButtonsCollectionSettings;
    refresh: {
      extend: "collection";
      text: '<i class="fas fa-sync"></i>';
      className: "btn btn-info";
      action: Function;
    };
  }
}

/**
 * HTML element
 */
interface HTMLScriptElement extends HTMLElement {
  async: boolean;

  onreadystatechange(): void;
}

interface HTMLElement
  extends Element,
    DocumentAndElementEventHandlers,
    ElementCSSInlineStyle,
    ElementContentEditable,
    GlobalEventHandlers,
    HTMLOrSVGElement {
  mozMatchesSelector: (selectors: string) => boolean;
  msMatchesSelector: (selectors: string) => boolean;

  [attachEvent: string]: any;
}

/**
 * Create element options
 */
interface createElementOpt {
  childs: any[];
  /**
   * Tag name to be created
   */
  tagName: string;
  /**
   * Add classname
   */
  className: string;
  /**
   * Some attributes ?
   */
  attributes: { attributes: { [str: string]: any } };
  /**
   * InnerText ?
   */
  text: string;
  /**
   * InnerHTML ?
   */
  html: string;
  /**
   * Some options
   */
  options: { attributes: any[]; childs: [] };
}

/**
 * Create element helper
 * * if you use without tagName you will get a document fragment
 * @example
 * document.body.appendChild(createElement({
  tagName: "div",
  className: "my-class",
  text: "Blah blah",
  attributes: {
    "id": "element id",
    "data-truc": "value"
  },
  childs: [{ `recursif call` }]
}))
 */
declare function createElement(params: createElementOpt);

/**
 * String start
 */

/**
 * Window Start
 */
// Add IE-specific interfaces to Window
interface Window {
  HTMLElement: HTMLElement;
  user: user;
  /**
   * Opera navigator
   */
  readonly opera: string;
  dataLayer: [];
  mozRTCPeerConnection: any;

  attachEvent(event: string, listener: EventListener): boolean;

  detachEvent(event: string, listener: EventListener): void;

  [func: string]: any;

  gtag(message?: any, ...optionalParams: any[]): void;
}

interface Document
  extends Node,
    DocumentAndElementEventHandlers,
    DocumentOrShadowRoot,
    GlobalEventHandlers,
    NonElementParentNode,
    ParentNode,
    XPathEvaluatorBase {
  /**
   * window.addEventListener
   *
   * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback
   * that will be invoked when the event is dispatched.
   *
   * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the
   * method behaves exactly as if the value was specified as options's capture.
   */
  attachEvent: any;

  /**
   * See {@see Document.addEventListener}
   */
  listen<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  listen(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeListener<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}
