if (!isnode()) {
  $.post = null;
  $.get = null;
  $.getJSON = null;
  $.getScript = null;
}
