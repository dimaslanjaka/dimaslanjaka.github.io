#!/usr/bin/env node
import { remote } from "electron";

export class kill {
  static pids: number[] = [];
  static browserWindows: Electron.BrowserWindow[] = [];
  static bind(app: Electron.App) {
    // Add each created BrowserWindow to list of maintained items
    app.on("browser-window-created", (e, bw) => {
      kill.browserWindows.push(bw);

      // Remove closed windows from list of maintained items
      bw.on("closed", function () {
        const i = kill.browserWindows.indexOf(bw); // Must use current index
        kill.browserWindows.splice(i, 1);
      });
    });
  }
  static exec() {
    //remote.getCurrentWindow().close();
    kill.browserWindows.forEach((bw) => {
      bw.close();
    });
  }
}

if (require.main === module) {
  // Called From CLI
  // console.log("called directly");
  kill.exec();
}
