/*
*   bootstrap-hexo-theme
*   main.js - copies code to user's clipboards, and enables highlight.js
*
 */

// @TODO convert me to jquery based code
window.onload = function() {

    //var copyCodeBtnHtml;

    // Initialize hljs by grabbing all elements w/ class of highlight. Also insert a 'copy to clipboard' button after.
    $(".highlight").each(function (i, code) {
        hljs.highlightBlock(code);
        code.id = "code-block-" + i; // Assign each code block a unique id for copyCode()
        var btnOnClick = "copyCode(" + i + ")";
        code.innerHTML += "<button class='btn btn-primary btn-sm' onclick='" + btnOnClick + "'>Copy code</button><span class='text-muted' style='padding-left: 4px; ' id='copy-status-" + i + "'></span>";
        // Inject a copy-code textarea after each code block. We do this instead of having just one textarea because select() causes a page jump
        $("<textarea rows='1' cols='1' id='copy-code-" + i + "' style='opacity: 0;' class='copy-code-textarea'>").insertAfter($("#code-block-" + i));
    });

}

// Copies code to the user's clipboard
function copyCode(i) {
    $("#code-block-" + i + " .code").each(function (i, lineOfCode) {
        var codeString = lineOfCode.innerHTML;

        // replace each <br> w/ \n
        codeString = codeString.replace(/<br\s*\/?>/gi, "\n"); // gotta love regex
        // now use $.text() to strip out all the other tags
        codeString = $(codeString).text();

        document.getElementById("copy-code-" + i).value = ""; // clear initial value
        document.getElementById("copy-code-" + i).value += codeString; // append value to corresponding textarea
    });
    document.getElementById("copy-code-" + i).select();
    try {
        document.execCommand("Copy");
        $("#copy-status-" + i).html("Copied code to clipboard.");
    } catch (error) {
        $("#copy-status-" + i).html("Error copying. Try again or use a different browser.");
    }
}
