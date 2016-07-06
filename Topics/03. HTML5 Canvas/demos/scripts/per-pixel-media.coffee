window.onload = () ->
	canvas = document.getElementById 'the-canvas'
	ctx = canvas.getContext '2d'
	video = document.getElementById 'the-video'
	watchId = null

	onVideoPlay = () ->
		watchId = setInterval videoFrame, 100
	onVideoStop = () ->
	 	clearInterval watchId

	fixImageData = (imageData, color = null, colorOffset = 0) ->
		unless color
			return imageData;
		length = imageData.data.length / 4
		for i in [0..length-1]
			do(i) =>
				index = i * 4		
				r = imageData.data[index + 0]
				g = imageData.data[index + 1]
				b = imageData.data[index + 2]

				redInRange = color.red - colorOffset < r < color.red + colorOffset
				greenInRange = color.green - colorOffset < g < color.green + colorOffset
				blueInRange = color.blue - colorOffset < b < color.blue + colorOffset
				imageData.data[index + 3] = 0 if redInRange and greenInRange and blueInRange
		imageData
	videoFrame = () ->	
		ctx.drawImage video, 0, 0, video.width, video.height
		imageData = ctx.getImageData 0, 0, video.width, video.height

		topLeftPixel = (ctx.getImageData 0, 0, 1, 1)
		colorToChange = 
			red: topLeftPixel.data[0]
			green: topLeftPixel.data[1]
			blue: topLeftPixel.data[2]
		# console.log colorToChange
		fixedImageData = fixImageData imageData, colorToChange, 90

		ctx.putImageData fixedImageData, 0, 0
	video.addEventListener 'play', onVideoPlay, false
	video.addEventListener 'stop', onVideoStop, false