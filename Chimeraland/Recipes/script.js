const td = document.querySelectorAll("article table#recipes td");
Array.from(td).forEach((el) => {
  let text = el.innerHTML;
  text = text.replace(
    /\sfullness/gmi,
    ' <img src="Recipes/fullness.jpg" class="img-inline-text" title="fullness" />'
  );
  text = text.replace(
    /\satk/gmi,
    ' <img src="Recipes/attack.png" class="img-inline-text atk" title="attack" />'
  );
  text = text.replace(
    /\sdef/gmi,
    ' <img src="Recipes/defense.png" class="img-inline-text def" title="defense" />'
  );
  el.innerHTML = text;
});