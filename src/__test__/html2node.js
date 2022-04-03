const jsdom = require("jsdom");
const { JSDOM } = jsdom;

console.log(get_text_html("<html><body><div>this div</div><p>Hello</p><a href='http://w3c.org'>W3C</a></body></html>"));

/**
 * Html string to node
 * @param {string} data
 */
function get_text_html(data) {
  const dom = new JSDOM(data);
  /**
   * Extract Text
   * @param {string} s
   * @returns {string}
   */
  const extractContent = function (s) {
    var span = dom.window.document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  return extractContent(dom.window.document.documentElement.innerHTML);
}

/*
<!--"description": "{{ get_text_html(page.excerpt)|page.title }}",
            "articleBody": "{{ get_text_html(page.more) }}"-->
 */
