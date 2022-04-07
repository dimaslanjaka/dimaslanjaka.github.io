const td = document.querySelectorAll('table#recipes td');
Array.from(td).forEach((el) => {
  let text = el.innerHTML;
  text = text.replace(/\sfullness/gim, ' <img src="Recipes/fullness.jpg" class="img-inline-text" title="fullness" />');
  text = text.replace(/\satk/gim, ' <img src="Recipes/attack.png" class="img-inline-text atk" title="attack" />');
  text = text.replace(/\sdef/gim, ' <img src="Recipes/defense.png" class="img-inline-text def" title="defense" />');
  el.innerHTML = text;
});
