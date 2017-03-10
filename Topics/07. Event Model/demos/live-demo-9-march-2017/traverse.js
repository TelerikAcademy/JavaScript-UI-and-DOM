function traverseElement(el, indent) {
    console.log(indent + '<' + el.tagName.toLowerCase() + '>');

    var children = [].slice.apply(el.children);
    // children = Array.from(el.children);

    children.forEach(child => traverseElement(child, indent + '  '));

    console.log(indent + '</' + el.tagName.toLowerCase() + '>');
}

// traverseElement(document.body, '');


function traverseBody() {
    var el = document.body;
    var indent = '';

    while (el !== null) {
        console.log(indent + '<' + el.tagName.toLowerCase() + '>');

        if (el.firstElementChild !== null) {
            el = el.firstElementChild;
            indent += '  ';
        }
        else {
            while (el.nextElementSibling === null) {
                console.log(indent + '</' + el.tagName.toLowerCase() + '>');
                indent = indent.substr(2);
                el = el.parentElement;
                if (el === document.body) {
                    console.log('</body>');
                    break;
                }
            }
            el = el.nextElementSibling;
        }

    }
}

traverseBody();
