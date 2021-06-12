/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Disabling button
 * @param t element of button
 */
function disable_button(t: JQuery<HTMLButtonElement> | HTMLButtonElement): void {
  let el: HTMLButtonElement;
  if (t instanceof jQuery) {
    el = t.get();
  } else if (t instanceof HTMLButtonElement) {
    el = t;
  }
  if (typeof el != "undefined") {
    el.setAttribute("disabled", "true");
  }
}

/**
 * Enabling button
 * @param t element of button
 */
function enable_button(t: JQuery<HTMLButtonElement> | HTMLButtonElement): void {
  let el: HTMLButtonElement;
  if (t instanceof jQuery) {
    el = t.get();
  } else if (t instanceof HTMLButtonElement) {
    el = t;
  }
  if (typeof el != "undefined") {
    el.removeAttribute("disabled");
  }
}
