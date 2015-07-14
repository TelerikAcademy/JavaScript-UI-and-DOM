(function() {
	var canvas = document.getElementById("paths-canvas"),
		ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.moveTo(50, 50);
	ctx.lineTo(50, 300);
	ctx.lineTo(200, 50);
	ctx.lineTo(50, 50);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(200, 50);
	ctx.lineTo(200,300);
	ctx.lineTo(50, 300);
	ctx.lineTo(200, 50);
	ctx.fill();
}());