window.onload = function () {
	var theCanvas = document.getElementById("the-canvas");
	var canvasCtx = theCanvas.getContext("2d");

	canvasCtx.lineWidth = "5";
	canvasCtx.fillStyle = "#ccc";
	canvasCtx.strokeStyle = "#777";

	canvasCtx.fillRect(10, 10, 100, 75);
	canvasCtx.strokeRect(10, 10, 100, 75);

	canvasCtx.fillStyle = "#777";
	canvasCtx.strokeStyle = "#000";
	canvasCtx.beginPath();
	canvasCtx.arc(60, 47, 30, 0, 2 * Math.PI);
	canvasCtx.fill();
	canvasCtx.arc(60, 47, 30, 0, 2 * Math.PI);
	canvasCtx.stroke();
};