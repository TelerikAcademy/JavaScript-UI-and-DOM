(function () {
	var initListButton = document.getElementById("btn-init-list");
	var valuesTb = document.getElementById("tb-values");

	function onInitListButtonClick() {
		var values = valuesTb.value.split(",");
	}

	initListButton.addEventListener("click", onInitListButtonClick);
}());