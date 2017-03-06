(function () {
	var generateBoxesBtn;

	function onGenerateBoxesButtonClick() {
		var contentDiv = document.getElementById("content"),
			count,
			i,
			div;

		while (contentDiv.firstChild) {
			contentDiv.removeChild(contentDiv.firstChild);
		}

		count = (document.getElementById("tb-box-count").value || 5) | 0;

		for (i = 0; i < count; i++) {
			div = document.createElement("div");
			div.className = "colored";
			contentDiv.appendChild(div);
		}
	}
	generateBoxesBtn = document.getElementById("btn-generate-boxes");
	generateBoxesBtn.addEventListener("click", onGenerateBoxesButtonClick);
}());