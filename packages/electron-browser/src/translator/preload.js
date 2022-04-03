const ipcRenderer = require("electron").ipcRenderer;
document.addEventListener("DOMContentLoaded", function () {
  ipcRenderer.sendToHost("html-content", document.body.innerHTML);
  ipcRenderer.send("html-content", document.body.innerHTML);
  //console.log(document.body.innerHTML);
});
