(function () {
	var upButton = document.getElementById("up-button"),
		rightButton = document.getElementById("right-button"),
		downButton = document.getElementById("down-button"),
		leftButton = document.getElementById("left-button"),
		box = document.getElementById("moving-box"),
		directions = {
			"up": -1,
			"right": 1,
			"down": 1,
			"left": -1
		};

	upButton.addEventListener("click", onUpButtonClick, false);
	rightButton.addEventListener("click", onRightButtonClick, false);
	downButton.addEventListener("click", onDownButtonClick, false);
	leftButton.addEventListener("click", onLeftButtonClick, false);

	function changeVerticalPosition(node, direction) {
		var oldTop = parseInt(node.style.top, 10) || 0;
		node.style.top = (oldTop + directions[direction] * 5) + "px";
	}

	function changeHorizontalPosition(node, direction) {
		var oldLeft = parseInt(node.style.left, 10) || 0;
		node.style.left = (oldLeft + directions[direction] * 5) + "px";
	}

	function onUpButtonClick() {
		changeVerticalPosition(box, "up");
	}

	function onRightButtonClick() {
		changeHorizontalPosition(box, "right");
	}

	function onDownButtonClick() {
		changeVerticalPosition(box, "down");
	}

	function onLeftButtonClick() {
		changeHorizontalPosition(box, "left");
	}
}());