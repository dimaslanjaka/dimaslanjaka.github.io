// noinspection DuplicatedCode

import { app, globalShortcut } from "electron";
import contextMenu from "./menu";
import process from "process";
import { kill } from "./kill";
import path from "path";

require("dotenv").config({ debug: true });

let mainWindow: Electron.BrowserWindow;

interface PrepareConfig extends Object {
  windowClosed?: (app: Electron.App) => any;
  customMenu?: () => any;
}

const prepare = (config: PrepareConfig) => {
  /**
   * Custom menu
   */
  if (config.hasOwnProperty("customMenu")) {
    if (typeof config.customMenu == "function") {
      config.customMenu();
    } else {
      // initialize default context menu
      contextMenu();
    }
  }

  // bind process killer
  kill.bind(app);

  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit();
    }
    if (config.hasOwnProperty("windowClosed")) {
      if (typeof config.windowClosed == "function") {
        config.windowClosed(app);
      }
    }
  });
};

interface HelperConfig extends Object {
  /**
   * App data path
   */
  appdata?: null | string;
  /**
   * App cache path
   */
  appcache?: null | string;
  /**
   * Browser name
   */
  name?: null | string;
  /**
   * Custom shortcut
   * @param globalShortcut
   */
  shortcuts?: (globalShortcut: Electron.GlobalShortcut) => any;
}

// eslint-disable-next-line no-unused-vars
// noinspection JSUnusedGlobalSymbols
export class helper {
  configPrepare: PrepareConfig = {
    windowClosed: null,
    customMenu: null,
  };
  config: HelperConfig = {
    shortcuts: null,
    name: "Electron Browser",
    appcache: path.join(app.getPath("cache"), app.getName()),
    appdata: path.join(app.getPath("appData"), app.getName()),
  };

  constructor() {}

  on(event: "window-all-closed", callback: (app: Electron.App) => any) {
    if (event == "window-all-closed") {
      this.configPrepare.windowClosed = callback(app);
    }
  }

  async start() {
    prepare(this.configPrepare);
    await app.whenReady();
    app.setName(typeof this.config.name == "string" ? this.config.name : "Electron Browser");
    app.setPath("userData", this.config.appdata);
    app.setPath("userCache", this.config.appdata);

    app.whenReady().then(() => {
      globalShortcut.register("Alt+CommandOrControl+L", () => {
        //mainWindow.webContents.send("show-server-log");
      });
      globalShortcut.register("f5", function () {
        //console.log("f5 is pressed");
        mainWindow.reload();
      });
      globalShortcut.register("CommandOrControl+R", function () {
        //console.log("CommandOrControl+R is pressed");
        mainWindow.reload();
      });

      if (typeof this.config.shortcuts == "function") {
        this.config.shortcuts(globalShortcut);
      }
    });
    return [mainWindow, app];
  }
}

// noinspection JSUnusedGlobalSymbols
export default helper;