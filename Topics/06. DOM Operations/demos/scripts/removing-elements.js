(function () {
	var box = getBoxTemplate(),
		contentDiv = document.getElementById("content"),
		generateBoxesBtn = document.getElementById("generate-boxes-btn"),
		countTextBox = document.getElementById("tb-box-count"),
		closeButtonsList = document.getElementsByClassName("btn-close");

	generateBoxesBtn
		.addEventListener("click", onGenerateBoxesButtonClick, false);

	function getBoxTemplate() {
		return "<div class='colored'>" +
			"<a href='#' class='btn-close'>X</a>" +
			"</div>";
	}

	function onRemoveBoxButtonClick() {
		this.parentNode.parentNode.removeChild(this.parentNode);
	}

	function clearNodeContent(node) {
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}

	function onGenerateBoxesButtonClick() {
		var count,
			i,
			closeButton;

		clearNodeContent(contentDiv);

		count = (countTextBox.value | 0) || 5;

		for (i = 0; i < count; i++) {
			contentDiv.innerHTML += box;
		}

		for (i = 0, len = closeButtonsList.length; i < len; i += 1) {
			closeButton = closeButtonsList[i];
			closeButton.addEventListener("click", onRemoveBoxButtonClick, false);
		}
	}
}());