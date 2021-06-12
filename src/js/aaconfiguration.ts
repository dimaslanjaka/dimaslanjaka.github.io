/**
 * Begin global toastr options
 */
if (typeof toastr == "object") {
  toastr.options.closeMethod = "fadeOut";
  toastr.options.closeDuration = 300;
  toastr.options.closeEasing = "swing";
  toastr.options.showEasing = "swing";
  toastr.options.hideEasing = "linear";
  toastr.options.showMethod = "slideDown";
  toastr.options.hideMethod = "slideUp";
  toastr.options.positionClass = "toast-bottom-full-width";
  toastr.options.closeMethod = "slideUp";
  toastr.options.preventDuplicates = true;
  toastr.options.closeButton = true;
  toastr.options.closeHtml = '<button><i class="fas fa-times"></i></button>';
  toastr.options.timeOut = 3000; // How long the toast will display without user interaction
  toastr.options.extendedTimeOut = 6000; // How long the toast will display after a user hovers over it
  toastr.options.progressBar = true;
  toastr.options.escapeHtml = false;
}

function pageid(length: number) {
  if (!length) {
    length = 6;
  }

  return Math.random().toString(20).substr(2, length);
}

const randstr = (length = 6) => Math.random().toString(20).substr(2, length);
