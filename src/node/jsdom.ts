import { JSDOM } from 'jsdom';

class jdom {
  instances: { [key: string]: JSDOM } = {};
  instance: JSDOM;
  current: string;
  close() {
    this.instance.window.close();
  }
  parse = (str: string) => {
    this.instance = new JSDOM(str);
    const document: Document = this.instance.window.document;
    return document;
  };
  serialize(): string {
    const result = this.instance.serialize();
    this.close();
    return result;
  }
  body() {
    const doc: Document = this.instance.window.document;
    return doc.body;
  }
  toString() {
    const result = this.instance.window.document.documentElement.outerHTML;
    this.close();
    return result;
  }
}

export default jdom;
