(function () {
	var canvas = document.getElementById('the-canvas'),
		ctx = canvas.getContext('2d'),
		video,
		watchId,
		btnPlay,
		btnPause;
	video = document.getElementById('the-video');
	btnPlay = document.getElementById('btn-play');
	btnPause = document.getElementById('btn-pause');
	video.style.display = 'none';

	btnPlay.addEventListener('click', function (ev) {
		video.play();
	}, false);

	btnPause.addEventListener('click', function (ev) {
		video.pause();
	}, false);

	video.addEventListener('stop', function () {
		clearInterval(watchId);
	}, false);
	video.addEventListener('pause', function () {
		clearInterval(watchId);
	}, false);

	video.addEventListener('play', function () {
		var videoFrame = function () {
			ctx.drawImage(video, 0, 0, video.width, video.height);
		};
		watchId = setInterval(videoFrame, 10);
	}, false);
}());