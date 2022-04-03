import { helper } from "./index";
import createWindow from "./window";
import getHtml from "./getHtml";
import fs from "fs";
import path from "path";

let mainWindow: Electron.BrowserWindow;

(async function () {
  const index = new helper();
  index.start().then((app) => {
    mainWindow = createWindow();
    //mainWindow.maximize();
    /*getHtml(mainWindow, function (html) {
      fs.writeFileSync(path.join(__dirname, "/../build/generatedHTML/index.html"), html);
    });*/
  });
})();
