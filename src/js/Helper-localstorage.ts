class STORAGE {
  /**
   * Reflection class constructor
   * @see https://stackoverflow.com/questions/43431550/async-await-class-constructor
   * @param callback
   * @example
   * var myObj = new myClass();
   * myObj.init(function() {
   *    // inside here you can use myObj
   * });
   */
  init(callback: Function) {
    // do something async and call the callback:
    callback.bind(this)();
  }

  /**
   * get localstorage by key
   * @param key
   */
  get(key: string) {
    if (!this.has(key)) {
      return false;
    }
    const data = localStorage[key];
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  /**
   * Set localstorage key value
   * @param key
   * @param value
   */
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Check localstorage key exists
   * @param key
   */
  has(key: string) {
    return !!localStorage[key] && !!localStorage[key].length;
  }

  /**
   * Extend or set localstorage key
   * @param key
   * @param value
   */
  extend(key: string, value: string) {
    if (this.has(key)) {
      const _value = this.get(key);
      jQuery.extend(_value, JSON.parse(JSON.stringify(value)));
      this.set(key, _value);
    } else {
      this.set(key, value);
    }
  }

  /**
   * Remove localstorage key
   * @param key
   */
  remove(key: string) {
    localStorage.removeItem(key);
  }
}

/**
 * localStorage helper
 */
function storage() {
  return new STORAGE();
}
