(function () {
    'use strict';
    var list;

    function printElementInfo(element) {
        var i,
            len;

        console.log("-".repeat(100));
        console.log("Type of the node: " + element.nodeName);
        console.log("Number of child nodes:" + element.childNodes.length);
        console.log("child nodes: ");
        for (i = 0, len = element.childNodes.length; i < len; i++) {
            console.log("childNode at (" + i + ") position: " + element.childNodes[i].nodeName);
        }
        console.log("-".repeat(100));
    }

    list = document.getElementById("trainers-list");

    printElementInfo(list);

    printElementInfo(document.body);
}());
