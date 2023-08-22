/**
 * capitalize string first letter of each word which mixed with symbols
 * @param {string} str
 * @param {string[]} moreSymbols add more symbols
 * @returns
 */
function capitalizer(str, moreSymbols) {
  let symbols = ["-", " "];
  if (Array.isArray(moreSymbols)) {
	// concatenate more symbols and unique
	symbols = [...new Set(symbols.concat(moreSymbols))];
  }
  symbols.forEach((symbol) => {
	str = str
	  .split(symbol)
	  .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
	  .join(symbol);
  });
  return str;
}

if (location.host.match(/cdpn|codepen/)) console.clear();
Array.from(document.querySelectorAll("[data-str]")).forEach((el) => {
  const arg = el.getAttribute("data-arguments")
	? el.getAttribute("data-arguments").split(",")
	: [];
  console.log(arg);
  const str = el.getAttribute("data-str");
  el.innerHTML = `<span style='color:red'>${str}</span> => <span style='color:green'>${capitalizer(
	str,
	arg
  )}</span>`;
});
