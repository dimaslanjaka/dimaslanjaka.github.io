//http://translate.google.com/translate?hl=&sl=en&tl=id&u=https%3A%2F%2Fd1221a086c67.ngrok.io%2F2020%2F6%2F7%2Fupdate-genshin-impact-1.5.1-1.6.0.html
//https://translate.googleusercontent.com/translate_p?hl=en&sl=id&tl=en&u=https://27f5494720ed.ngrok.io/2020/6/10/update-genshin-impact-1.6.0-1.6.1.html&depth=1&rurl=translate.google.com&nv=1&sp=nmt4&pto=aue,ajax,boq&usg=ALkJrhgAAAAAYMQOKGM4S-JILFfc9xbdqOesOtUAwuqL
// https://4fca314b6878-ngrok-io.translate.goog/2020/6/7/update-genshin-impact-1.5.1-1.6.0.html?_x_tr_sl=id&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=ajax,nv

import { makeid } from "../js/utility";

class TranslateUrl {
  base = new URL(
    `https://translate.google.com/translate?depth=1&rurl=translate.google.com&nv=1&sp=nmt4&pto=aue,ajax,boq&usg=${makeid(
      21
    )}-${makeid(22)}`
  );

  static main(args?: string[]) {
    console.log(args);
    const clazz = new TranslateUrl();
    clazz.from("id").to("en");
    console.log("direct class", clazz);
    console.log("toString", clazz.toString());
  }

  url(url: string) {
    this.base.searchParams.append("u", encodeURIComponent(url));
    return this;
  }

  /**
   * append source lang
   * @param sl
   */
  from(sl: string) {
    this.base.searchParams.append("sl", sl);
    return this;
  }

  /**
   * Append target lang
   * @param tl
   */
  to(tl: string) {
    this.base.searchParams.append("tl", tl);
    this.base.searchParams.append("hl", tl);
    return this;
  }

  toString() {
    return this.base.href;
  }
}

export default TranslateUrl;
