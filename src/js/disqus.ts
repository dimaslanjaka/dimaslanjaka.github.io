/**
 * Disqus loader which verifies the existence of `#disqus_thread` on
 * the web page and then prepares the disqus embed script to hook in
 * the document
 * @param disqus_shortname disqus username/shortname
 */
function load_disqus(disqus_shortname: string) {
  // Prepare the trigger and target
  const disqus_trigger = $("#disqus_trigger"),
    disqus_target = $("#disqus_thread");

  // Load script asynchronously only when the trigger and target exist
  if (disqus_target.length) {
    LoadScript({
      url: "//" + disqus_shortname + ".disqus.com/embed.js",
      callback: function () {
        disqus_trigger.remove();
      },
    });
  } else {
    if (typeof toastr != "undefined") {
      toastr.error("disqus container not exists", "disqus comment");
    }
  }
}
