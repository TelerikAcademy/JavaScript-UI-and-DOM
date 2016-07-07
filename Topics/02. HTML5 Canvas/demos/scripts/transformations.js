(function () {
	var context = document.getElementById("transformations-canvas"),
		ctx = context.getContext("2d");

	ctx.lineWidth = 5;

	ctx.strokeStyle = "green";
	ctx.fillStyle = "blue";
	ctx.save();
	ctx.scale(1, 0.5);
	ctx.fillRect(50, 50, 75, 75);
	ctx.restore();
	ctx.strokeRect(50, 50, 75, 75);

	ctx.strokeStyle = "blue";
	ctx.fillStyle = "green";
	ctx.save();
	ctx.rotate(Math.PI / 5);
	ctx.fillRect(250, 10, 75, 75);
	ctx.restore();
	ctx.strokeRect(250, 10, 75, 75);


	ctx.save();
	ctx.translate(100, 250);

	ctx.strokeStyle = "purple";
	ctx.fillStyle = "orange";
	ctx.save();
	ctx.scale(1, 0.5);
	ctx.fillRect(50, 50, 75, 75);
	ctx.restore();
	ctx.strokeRect(50, 50, 75, 75);

	ctx.strokeStyle = "purple";
	ctx.fillStyle = "orange";
	ctx.save();
	ctx.rotate(Math.PI / 5);
	ctx.fillRect(250, 10, 75, 75);
	ctx.restore();
	ctx.strokeRect(250, 10, 75, 75);
	ctx.restore();
}());