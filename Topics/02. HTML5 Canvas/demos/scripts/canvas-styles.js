(function () {
	var canvas = document.getElementById('the-canvas'),
		ctx = canvas.getContext('2d');

	var img = new Image();

	img.onload = function () {
		var pattern = ctx.createPattern(img, 'repeat');
		ctx.fillStyle = pattern;
		ctx.fillRect(0, 0, 1000, 1000);
	};

	img.src = 'media/pattern.png';
}());