console.clear();

CalculateTR(document.getElementById("char-dish"));
CalculateTR(document.getElementById("fairy-dish"));

/**
 * Calculate TR
 * @param {HTMLTableElement} table
 */
function CalculateTR(table) {
  let identifier = table.hasAttribute("id") ? table.id : "-";
  console.log(`Start Calculating Table ${identifier}`);
  let tr = table.getElementsByTagName("tr");
  if (tr.length > 0)
    for (i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td"),
        str,
        thirdTD = typeof td[3] != "undefined";

      if (thirdTD) {
        str = td[3].innerText;
        console.log(str);
        if (/[+\(\)]/gm.test(str)) {
          str = str.trim().replaceAll(/x/gm, "*");
          td[3].innerText = eval(str);
        }
      }
    }
}

// Compare 100x boiled corns 
/* Ham */
  writeTo("[i='hamprice']", 14900 * 100, "brown");
  writeTo("[i='hamexp']", 2200 * 100, "brown");
  /* Boiled Corn */
  writeTo("[i='bcprice']", 350 * 100, "yellow");
  writeTo("[i='bcexp']", 100 * 100, "yellow");
  writeTo("[i='ham-bc']", (14900 * 100) / (350 * 100), "blue", function(total) {
    return total.toFixed(2);
  });
  writeTo('[i="bctotal"]', ((14900 * 100) / (350 * 100)) * (100 * 100), function(total) {
    return total.toFixed(0);
  });

  function writeTo(priceid, totalprice, color, callback) {
    if (typeof callback == "function") {
      totalprice = callback(totalprice);
    } else if (typeof color == "function") {
      totalprice = color(totalprice);
    }
    if (!color || typeof color == "function") color = "red";
    let x = document.querySelectorAll(priceid);
    for (i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = color;
      if (color != "yellow") x[i].style.color = "white";
      x[i].innerHTML = totalprice.toLocaleString("en-US");
    }
  }
