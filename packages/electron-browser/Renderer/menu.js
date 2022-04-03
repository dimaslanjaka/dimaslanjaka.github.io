const { remote } = require("electron");
const { Menu, MenuItem } = remote;

window.addEventListener(
  "contextmenu",
  (e) => {
    e.preventDefault();
    const menu = new Menu();
    menu.append(new MenuItem(new MenuItem({ label: "This menu item is always shown" })));
    if (e.target.id === "p1" || e.target.id === "p3") {
      menu.append(
        new MenuItem({
          label: "This menu is not always shown",
          click: function () {
            alert(`you clicked on ${e.target.id}`);
          },
        })
      );
    }
    menu.popup({ window: remote.getCurrentWindow() });
  },
  false
);
