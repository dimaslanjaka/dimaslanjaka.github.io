const distance_already_calculated: string[] = [];

/**
 * find distance
 * @param target
 * @param callback
 */
function calculateDistance(target: string, callback: (arg0: number) => any) {
  if (distance_already_calculated.includes(target)) {
    return null;
  }
  distance_already_calculated.push(target);
  let mX: number,
    mY: number,
    distance: number,
    $element = $(`#${target}`);
  return $(document).on("mousemove click", function (e) {
    mX = e.pageX;
    mY = e.pageY;
    distance = calculatorDistance($element, mX, mY);
    return callback(distance);
  });
}

/**
 * calculate distance mouse x element
 * @param elem
 * @param mouseX
 * @param mouseY
 */
function calculatorDistance(elem: JQuery, mouseX: number, mouseY: number) {
  return Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
        Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2)
    )
  );
}
