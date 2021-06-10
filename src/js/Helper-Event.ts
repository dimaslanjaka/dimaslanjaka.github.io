/** Add one or more listeners to an element
 * @param element - DOM element to add listeners to
 * @param eventNames - space separated list of event names, e.g. 'click change'
 * @param listener - function to attach for each event as a listener
 */
function setEventListener(
  element: HTMLElement,
  eventNames: "click" | "mouseover" | "submit" | "change",
  listener: EventListenerOrEventListenerObject
) {
  eventNames.split(" ").forEach(function (e) {
    //element.addEventListener(e, listener, false);
    if (element.attachEvent) {
      if (e == "click") {
        e = "onclick";
      }
      element.attachEvent(e, listener);
    } else if (element.addEventListener) {
      element.addEventListener(e, listener, false);
    } else {
      console.error("cannot attach event to FAB wrapper");
    }
  });
}

if (typeof window != "undefined") {
  (function () {
    // I test for features at the beginning of the declaration instead of everytime that we have to add an event.
    if (document.addEventListener) {
      window.addEvent = function (elem, type, handler, useCapture) {
        elem.addEventListener(type, handler, !!useCapture);
        return handler; // for removal purposes
      };
      window.removeEvent = function (elem, type, handler, useCapture) {
        elem.removeEventListener(type, handler, !!useCapture);
        return true;
      };
    } else if (document.attachEvent) {
      window.addEvent = function (
        elem: { attachEvent: (arg0: any, arg1: () => any) => void },
        type: string,
        handler: { apply: (arg0: any, arg1: IArguments) => any }
      ) {
        type = "on" + type;
        // Bounded the element as the context
        // Because the attachEvent uses the window object to add the event and we don't want to polute it.
        const boundedHandler = function () {
          return handler.apply(elem, arguments);
        };
        elem.attachEvent(type, boundedHandler);
        return boundedHandler; // for removal purposes
      };
      window.removeEvent = function (elem, type, handler) {
        type = "on" + type;
        elem.detachEvent(type, handler);
        return true;
      };
    } else {
      // FALLBACK ( I did some test for both your code and mine, the tests are at the bottom. )
      // I removed wrapping from your implementation and added closures and memoization.
      // Browser don't support W3C or MSFT model, go on with traditional
      window.addEvent = function (elem, type, handler) {
        type = "on" + type;
        // Applying some memoization to save multiple handlers
        elem.memoize = elem.memoize || {};
        // Just in case we haven't memoize the event type yet.
        // This code will be runned just one time.
        if (!elem.memoize[type]) {
          elem.memoize[type] = { counter: 1 };
          elem[type] = function () {
            for (const key in nameSpace) {
              if (nameSpace.hasOwnProperty(key)) {
                if (typeof nameSpace[key] == "function") {
                  nameSpace[key].apply(this, arguments);
                }
              }
            }
          };
        }

        /**
         * Thanks to hoisting we can point to nameSpace variable above.
         * Thanks to closures we are going to be able to access its value when the event is triggered.
         * I used closures for the nameSpace because it improved 44% in performance in my laptop.
         */
        var nameSpace: Object = elem.memoize[type],
          id = nameSpace.counter++;
        nameSpace[id] = handler;
        // I return the id for us to be able to remove a specific function binded to the event.
        return id;
      };
      window.removeEvent = function (elem: any, type: string, handlerID: string | number) {
        type = "on" + type;
        // I remove the handler with the id
        if (elem.memoize && elem.memoize[type] && elem.memoize[type][handlerID])
          elem.memoize[type][handlerID] = undefined;
        return true;
      };
    }
  })();
}
