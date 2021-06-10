/**
 * Automatically expand a textarea as the user types
 * (c) 2021 Chris Ferdinandi, MIT License, [https://gomakethings.com]{@link https://gomakethings.com}
 * @param field The textarea
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function autoExpand(field: HTMLFormElement) {
  // Reset field height
  field.style.height = "inherit";

  // Get the computed styles for the element
  const computed = window.getComputedStyle(field);

  // Calculate the height
  const height = parseFloat(computed.paddingTop) + field.scrollHeight + parseFloat(computed.paddingBottom);

  field.style.height = height + "px";
}
