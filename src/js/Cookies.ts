/**
 * Cookie Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @see http://localhost/src/Cookie/helper.php
 */
class Cookies {
  private static logged = [];

  /**
   * Get cookie value by cookie name
   * @param c_name
   * @returns null if cookie not exists
   */
  static get(c_name: string): string | Object | null {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        let c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length;
        }
        const cookie = unescape(document.cookie.substring(c_start, c_end));
        try {
          return this.decompress(cookie);
        } catch (e) {
          if (!in_array(c_name, this.logged)) {
            this.logged.push(c_name);
            console.error(`fail to decode cookie ${c_name}`);
          }
          return cookie;
        }
      }
    }
    return null;
  }

  /**
   * Check cookie exists
   * @param c_name cookie name
   */
  static has(c_name: string): boolean {
    return this.get(c_name) != null;
  }

  /**
   * Create cookie expiring in days
   * @param name cookie name
   * @param value cookie value
   * @param expire
   * @param expire_type d = days, m = minutes, s = seconds, default seconds
   * @param path
   * @param callback
   */
  static set(
    name: string,
    value: any,
    expire: number | string,
    expire_type: string | null = null,
    path: string | any | null = "/",
    callback: any | Function | null = null
  ) {
    let expires: string;
    const date = new Date();
    if (expire_type != null && typeof expire == "number") {
      //console.log("expire instance of number");
      if (/^d$|day/s.test(expire_type)) {
        date.setTime(date.getTime() + expire * 24 * 60 * 60 * 1000);
      } else if (/^m$|minute/s.test(expire_type)) {
        date.setTime(date.getTime() + expire * 60 * 1000);
      } else if (/^s$|second/s.test(expire_type)) {
        date.setTime(date.getTime() + expire * 1000);
      } else {
        date.setTime(date.getTime() + expire * 1000);
      }
      expires = "; expires=" + date.toUTCString();
    } else if (typeof expire == "string") {
      //console.log(`expire instance of string`);
      if (/d$|day/s.test(expire)) {
        date.setTime(date.getTime() + parseNumber(expire) * 24 * 60 * 60 * 1000);
      } else if (/m$|minute/s.test(expire)) {
        date.setTime(date.getTime() + parseNumber(expire) * 60 * 1000);
      } else if (/s$|second/s.test(expire)) {
        date.setTime(date.getTime() + parseNumber(expire) * 1000);
      } else {
        date.setTime(date.getTime() + parseNumber(expire) * 1000);
      }
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    let cookie_path = "/";
    if (typeof path == "string") {
      if (path.length > 0) {
        cookie_path = path;
      }
    }
    /*value = JSON.stringify(value);
         value = base64_encode(JSON.stringify(value));*/
    value = this.compress(value);
    const formatted = name + "=" + value + expires + "; path=" + cookie_path;
    console.info(`cookie formatted: ` + formatted);
    document.cookie = formatted;
    if (typeof callback == "function") {
      // eslint-disable-next-line prefer-rest-params
      return callback(arguments);
    }
    return this.get(name);
  }

  /**
   * Delete Cookie
   * @param name cookie name
   */
  static del(name: string) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  /**
   * Get all cookies
   */
  static all() {
    const pairs = document.cookie.split(";");
    const cookies = {};
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      cookies[(pair[0] + "").trim()] = Cookies.get((pair[0] + "").trim());
      /*
             try {
             cookies[(pair[0] + "").trim()] = Cookies.get((pair[0] + "").trim());
             } catch (e) {
             cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
             }
             */
    }
    //console.log(cookies.length, cookies);
    return cookies;
  }

  /**
   * Call function if cookie name not set
   * @param name
   * @param value
   * @param expire Expires number (minutes)
   * @param callback Function callback to be executed one time
   */
  static one(name: string, value: any, expire: number, callback: Function) {
    if (this.get(name) == null) {
      this.set(name, value, expire, "m", "/", callback);
    }
  }

  private static logging() {
    if (empty(this.logged)) {
      Cookies.set("cl", JSON.stringify(this.logged), "1d");
    }
  }

  /**
   * decompress cookie
   * @param str
   */
  private static decompress(str: string) {
    return aesDecrypt(str, md5(location.host));
  }

  /**
   * compress cookie
   * @param str
   */
  private static compress(str: string) {
    return aesEncrypt(str, md5(location.host));
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports.Cookies = Cookies;
}
