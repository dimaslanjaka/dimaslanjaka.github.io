import contextMenu from "electron-context-menu";
import { BrowserWindow, shell } from "electron";

export default function () {
  //console.log("context menu show");
  return contextMenu({
    prepend: (_defaultActions, parameters, _browserWindow) => [
      {
        label: "Rainbow",
        // Only show it when right-clicking images
        visible: parameters.mediaType === "image",
      },
      {
        label: "Search Google", // "Search Google for “{selection}”",
        // Only show it when right-clicking text
        visible: parameters.selectionText.trim().length > 0,
        click: () => {
          shell
            .openExternal(`https://google.com/search?q=${encodeURIComponent(parameters.selectionText)}`)
            .then((r) => console.log(r));
        },
      },
      {
        label: "Open Settings",
        click: () => {
          const settings: Electron.BrowserWindowConstructorOptions = {
            height: 500,
            width: 400,
            titleBarStyle: "hidden",
            webPreferences: {
              nodeIntegration: true,
              enableRemoteModule: true,
            },
          };
          if (process.platform == "win32") {
            settings.frame = false;
          } else {
            settings.titleBarStyle = "hidden";
          }

          const win = new BrowserWindow(settings);
          win.loadFile("views/settings.html").then((r) => console.log(r));
        },
      },
    ],
  });
}
