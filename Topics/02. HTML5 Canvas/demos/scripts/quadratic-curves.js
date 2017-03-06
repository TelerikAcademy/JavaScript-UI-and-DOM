(function () {
	var canvas = document.getElementById("curves-canvas"),
		ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.moveTo(50, 100);
	ctx.quadraticCurveTo(150, 400, 350, 150);
	ctx.stroke();


	if (ctx.setLineDash !== undefined) {
		ctx.setLineDash([5, 10]);
	}

	if (ctx.mozDash !== undefined) {
		ctx.mozDash = [5, 10];
	}
	ctx.beginPath();
	ctx.moveTo(17, 1);
	ctx.lineTo(150, 400);
	ctx.lineTo(470, 0);

	ctx.moveTo(100, 250);
	ctx.lineTo(250, 275);
	ctx.stroke();
}());