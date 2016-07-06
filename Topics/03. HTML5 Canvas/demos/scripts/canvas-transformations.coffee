window.onload = () ->
	canvas = null
	ctx = null
	x = 0
	y = 0
	width = 0
	height = 0
	radian = 0
	radianStep = 0
	xDir = +1
	yDir = +1
	fillColor = 0

	getRandomColor = ()->
		red = Math.floor Math.random() * 255
		green = Math.floor Math.random() * 255
		blue = Math.floor Math.random() * 255
		"rgb(#{red}, #{green}, #{blue})"		

	setup = () ->
		canvas = document.getElementById 'the-canvas'
		ctx = canvas.getContext '2d'
		x = 0
		y = 0
		width = 20
		height = 100
		radian = 0
		radianStep = 0.02		
		fillColor =
			red: 
				value: 127
				update: 0
			green: 
				value: 127
				update: 0
			blue: 
				value: 127
				update: 0
			colorUpdate: 1
			change: () ->
				@blue.update = (Math.floor Math.random() * 20) - 1
				@blue.value += @blue.update	unless @blue.value + @blue.update < 0 or @blue.value + @blue.update > 255
				@green.update = (Math.floor Math.random() * 20) - 1
				@green.value += @green.update unless @green.value + @green.update < 0 or @green.value + @green.update > 255
				@red.update = (Math.floor Math.random() * 20) - 1
				@red.value += @red.update unless @red.value + @red.update  < 0 or @red.value + @red.update > 255
			toRGBString: () ->
				"rgb(#{@red.value}, #{@green.value}, #{@blue.value})"
		ctx.lineWidth = '5'

		rotationFrame()

	rotationFrame = () ->
		# ctx.clearRect 0, 0, canvas.width, canvas.height
		ctx.save()
		ctx.translate x, y + height
		ctx.rotate radian * Math.PI
		newX = 0
		newY = -height		
		ctx.fillStyle = fillColor.toRGBString()
		ctx.beginPath()
		ctx.scale(1, 2)
		ctx.arc newX + width/2, newY + height/2, width, 0, 2*Math.PI, true
		ctx.stroke()
		ctx.fill()
		if x + width/2 > canvas.width
			xDir = -1
		else if x - width/2 < 0
			xDir = +1
		if y + height/2 > canvas.height
			yDir = -1
		else if y - height/2 < 0
			yDir = +1

		x += xDir
		y += yDir
		ctx.restore()
		radian += radianStep
		radian %= 2
		fillColor.change()

		# setTimeout rotationFrame, 10
		requestAnimationFrame rotationFrame

	setup()

