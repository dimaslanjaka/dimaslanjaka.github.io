const td = document.querySelectorAll("article table#recipes td");
Array.from(td).forEach((el) => {
  let text = el.innerHTML;
  text = text.replace(
    "fullness",
    '<img src="Recipes/fullness.jpg" class="img-inline-text" alt="fullness" title="fullness" />'
  );
  text = text.replace(
    "atk",
    '<img src="Recipes/attack.png" class="img-inline-text atk" alt="attack" title="attack" />'
  );
  el.innerHTML = text;
});