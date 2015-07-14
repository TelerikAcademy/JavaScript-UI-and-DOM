(function () {
	var canvas = document.getElementById("curves-canvas"),
		ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo(188, 130);
	ctx.bezierCurveTo(140, 10, 388, 10, 388, 170);
	ctx.bezierCurveTo(400, 300, 388, 270, 750, 350);
	ctx.stroke();
}());