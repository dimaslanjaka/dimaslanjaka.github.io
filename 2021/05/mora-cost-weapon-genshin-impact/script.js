const h3 = document.querySelectorAll('h3');
for (const key in h3) {
  if (Object.hasOwnProperty.call(h3, key)) {
	const el = h3[key].querySelector('em');
	console.log(el.innerText)
  }
}
