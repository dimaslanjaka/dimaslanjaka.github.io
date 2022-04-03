// noinspection JSIgnoredPromiseFromCall

const fs = require("fs");
const path = require("path");
require("./menu");

onload = () => {
  /**
   * @typedef {Element|import('electron').webviewTag}
   * @type {Element|import('electron').webviewTag}
   */
  const webview = document.querySelector("webview");
  const indicator = document.querySelector(".indicator");
  /**
   * @type {HTMLInputElement}
   */
  const addrBar = document.getElementById("addr-bar");

  webview.addEventListener("ipc-message", function (e) {
    if (e.channel === "html-content") {
      const html_contents = e.args[0];
      console.log(html_contents);
    }
  });

  let firstLoad = true;
  webview.addEventListener("dom-ready", () => {
    // clear log every page
    console.clear();

    // load webview default from url bar
    if (firstLoad) {
      firstLoad = false;
      setTimeout(function () {
        webview.loadURL(addrBar.value);
      }, 1500);
    } else {
      addrBar.value = webview.getURL();
    }

    // we can get its URL and display it in the console
    const currentURL = new URL(webview.getURL());
    console.log("currentURL is : " + currentURL);

    // same thing about the title of the page
    const titlePage = webview.getTitle();
    console.log("titlePage is : " + titlePage);

    // executing Javascript into the webview to get the full HTML
    webview
      .executeJavaScript(
        `function gethtml () {
    return new Promise((resolve, reject) => { resolve(document.documentElement.innerHTML); });
    }
    gethtml();`
      )
      .then(
        /**
         * @param {string} html
         */
        (html) => {
          // save HTML
          const savePath = path.join(
            process.cwd(),
            "build/html",
            currentURL.host,
            currentURL.pathname,
            `${titlePage}.html`
          );
          fs.mkdirSync(path.dirname(savePath), { recursive: true });
          fs.writeFileSync(savePath, html);
        }
      );
  });

  // listen url address enter
  addrBar.addEventListener("keydown", function (event) {
    const val = this.value;
    if (event.key === "Enter") {
      console.log(val);
    }
  });

  if (indicator) {
    const loadstart = () => {
      indicator.innerText = "loading...";
    };

    const loadstop = () => {
      indicator.innerText = "";
    };

    webview.addEventListener("did-start-loading", loadstart);
    webview.addEventListener("did-stop-loading", loadstop);
  }
};
