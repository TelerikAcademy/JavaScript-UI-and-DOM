(function () {
	var log = console.log;

	function traverseElement(element, indent) {
		var child = element.firstChild,
			content;
		if (element.nodeName == "#text") {
			content = element.textContent.trimChars("\n \t");
			if (content) {
				log(indent + content);
			}
		} else {
			log(indent + "start of : " + element.nodeName);
			while (child) {
				traverseElement(child, indent + "--");
				child = child.nextSibling;
			}
			log(indent + "end of : " + element.nodeName);
		}
	}
	traverseElement(document, "");
}());