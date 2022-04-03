import { app, globalShortcut,BrowserWindow, ipcMain } from "electron";
import path from 'path';

//https://translate.google.com/translate?sl=auto&tl=en&u=https%3A%2F%2Fgamewith.net%2Fgenshin-impact%2Farticle%2Fshow%2F24530

function createWindow(){
  let mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 640,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      spellcheck: true,
      webviewTag: true,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
    //icon: options.icon,
    show: false,
    center: true,
    frame: false,
  });
  mainWindow.on("close", () => {
    mainWindow.webContents.send("stop-server");
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  return mainWindow
}

ipcMain.on('html-content', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
});

app.whenReady().then(() => {
  const mainWindow = createWindow();
  mainWindow.loadURL('https://translate.google.com/translate?sl=auto&tl=en&u=https%3A%2F%2Fgamewith.net%2Fgenshin-impact%2Farticle%2Fshow%2F24530');
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
});