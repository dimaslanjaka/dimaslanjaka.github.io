/**
 * @param {createElementOpt} options
 */
function createElement(options) {
    var el, a, i;
    if (!options.tagName) {
        el = document.createDocumentFragment();
    } else {
        el = document.createElement(options.tagName);
        if (options.className) {
            el.className = options.className;
        }

        if (options.attributes) {
            for (a in options.attributes) {
                el.setAttribute(a, options.attributes[a]);
            }
        }

        if (options.html !== undefined) {
            el.innerHTML = options.html;
        }
    }

    if (options.text) {
        el.appendChild(document.createTextNode(options.text));
    }

    // IE 8 doesn"t have HTMLElement
    if (window.HTMLElement === undefined) {
        // @ts-ignore
        window.HTMLElement = Element;
    }

    if (options.childs && options.childs.length) {
        for (i = 0; i < options.childs.length; i++) {
            el.appendChild(
                options.childs[i] instanceof window.HTMLElement
                    ? options.childs[i]
                    : createElement(options.childs[i])
            );
        }
    }

    return el;
}

class html {
    static create(options) {
        /**
         * @param {createElementOpt}
         * @returns {createElement}
         */
        return createElement(options);
    }
}
