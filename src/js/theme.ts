if (!isnode()) {
  if (typeof jQuery != "undefined") {
    const target = $(location).attr("hash");
    const offset: number = $(this).attr("data-offset") ? Number($(this).attr("data-offset")) : 0;
    if ($(target).length) {
      $("body,html").animate(
        {
          scrollTop: $(target).offset().top - offset,
        },
        700
      );
    }
  }
}
