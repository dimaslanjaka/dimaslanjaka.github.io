//http://translate.google.com/translate?hl=&sl=en&tl=id&u=https%3A%2F%2Fd1221a086c67.ngrok.io%2F2020%2F6%2F7%2Fupdate-genshin-impact-1.5.1-1.6.0.html

class TranslateUrl {
  base = new URL("https://translate.google.com/translate");

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
    return this;
  }

  toString() {
    return this.base.href;
  }
}

export default TranslateUrl;
