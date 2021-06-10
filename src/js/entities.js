// A map of the entities we want to handle.
// The numbers on the left are the Unicode code point values; their
// matching named entity strings are on the right.
var entityMap = {
    "160": "&nbsp;",
    "161": "&iexcl;",
    "162": "&#cent;",
    "163": "&#pound;",
    "164": "&#curren;",
    "165": "&#yen;",
    "166": "&#brvbar;",
    "167": "&#sect;",
    "168": "&#uml;",
    "169": "&copy;",
    // ...and lots and lots more, see http://www.w3.org/TR/REC-html40/sgml/entities.html
    "8364": "&euro;", // Last one must not have a comma after it, IE doesn't like trailing commas
};

// The function to do the work.
// Accepts a string, returns a string with replacements made.
/**
 * Encode HTML string to HTML entities
 * @param {String} str
 */
function prepEntities(str) {
    // The regular expression below uses an alternation to look for a surrogate pair _or_
    // a single character that we might want to make an entity out of. The first part of the
    // alternation (the [\uD800-\uDBFF][\uDC00-\uDFFF] before the |), you want to leave
    // alone, it searches for the surrogates. The second part of the alternation you can
    // adjust as you see fit, depending on how conservative you want to be. The example
    // below uses [\u0000-\u001f\u0080-\uFFFF], meaning that it will match and convert any
    // character with a value from 0 to 31 ("control characters") or above 127 -- e.g., if
    // it's not "printable ASCII" (in the old parlance), convert it. That's probably
    // overkill, but you said you wanted to make entities out of things, so... :-);
    return str.replace(
        /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0000-\u001f\u0080-\uFFFF]/g,
        function (match) {
            var high, low, charValue, rep;

            // Get the character value, handling surrogate pairs
            if (match.length == 2) {
                // It's a surrogate pair, calculate the Unicode code point
                high = match.charCodeAt(0) - 0xd800;
                low = match.charCodeAt(1) - 0xdc00;
                charValue = high * 0x400 + low + 0x10000;
            } else {
                // Not a surrogate pair, the value *is* the Unicode code point
                charValue = match.charCodeAt(0);
            }

            // See if we have a mapping for it
            rep = entityMap[charValue];
            if (!rep) {
                // No, use a numeric entity. Here we brazenly (and possibly mistakenly);
                rep = "&#" + charValue + ";";
            }

            // Return replacement
            return rep;
        }
    );
}
