import { ipcMain, BrowserWindow } from "electron";

export default function (mainWindow: BrowserWindow, callback: (htm: string) => any) {
  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.webContents
      .executeJavaScript(
        `
    require('electron').ipcRenderer.send('gpu', document.body.innerHTML);
  `
      )
      .then((r) => {
        //console.log(r)
        callback(r);
      });
  });

  ipcMain.on("gpu", (_, gpu) => {
    console.log(gpu);
  });

  //mainWindow.loadURL("chrome://gpu");
}
