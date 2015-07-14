(function () {
	var canvas = document.getElementById("rects-canvas"),
		ctx = canvas.getContext("2d"),
		x = 200,
		y = 150,
		width = 200,
		height = 200,
		i,
		count = 5,
		change = 20;

	ctx.fillStyle = "#ccc";
	ctx.strokeStyle = "#444";
	ctx.lineWidth = 10;

	function getRandomValue(min, max) {
		if (!max) {
			max = min;
			min = 0;
		}
		return (Math.random() * (max - min) + min) | 0;
	}

	function getRandomColor() {
		var red = getRandomValue(255),
			green = getRandomValue(255),
			blue = getRandomValue(255);
		return "rgb(" + red + "," + green + "," + blue + ")";
	}
	for (i = 0; i < count; i++) {
		ctx.fillStyle = getRandomColor();
		ctx.strokeStyle = getRandomColor();
		ctx.fillRect(x, y, width, height);
		ctx.strokeRect(x, y, width, height);
		x += change;
		y += change;
		width -= 2 * change;
		height -= 2 * change;
	}

}());