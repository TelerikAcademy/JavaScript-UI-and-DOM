(function () {
	var canvas = document.getElementById("ellipses-canvas"),
		ctx = canvas.getContext("2d"),

		position = {
			x: 50,
			y: 50
		}, radius = 45,
		ellipseFromTos = [{
			from: 0,
			to: 2 * Math.PI
		}, {
			from: Math.PI,
			to: 2 * Math.PI
		}, {
			from: 0,
			to: Math.PI / 2
		}, {
			from: Math.PI / 2,
			to: 3 * Math.PI / 2
		}, {
			from: Math.PI / 2,
			to: 2 * Math.PI
		}, {
			from: Math.PI / 2,
			to: 3 * Math.PI
		}];

	function drawSector(x, y, r, from, to, isCounterClockwise) {
		ctx.beginPath();
		ctx.arc(x, y, r, from, to, isCounterClockwise);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.stroke();
		//ctx.fill();
	}

	for (var i = 0; i < ellipseFromTos.length; i += 1) {
		var fromTo = ellipseFromTos[i];
		var y = position.y + i * 100;
		drawSector(position.x, y, radius, fromTo.from, fromTo.to, false);
		drawSector(position.x + 100, y, radius, fromTo.from, fromTo.to, true);
	}
}());