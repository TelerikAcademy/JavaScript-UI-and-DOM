(function () {
    var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
	ctx.fillStyle = "#fff";
	ctx.fillRect(0,0, ctx.canvas.width,ctx.canvas.height)
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    //drawing the gallow
    ctx.moveTo(10, 400);
    ctx.lineTo(100, 400);
    ctx.moveTo(55, 400);
    ctx.lineTo(55, 50);
    ctx.lineTo(250, 50);
    ctx.lineTo(250, 100);
    ctx.stroke();

    //drawing the hangman
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.fillStyle = "#FF96B9";
    //head
    ctx.arc(250, 125, 25, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    //eyes
    ctx.beginPath();
    ctx.arc(250 - 10, 125 - 10, 2, 0, 2 * Math.PI, false);
    ctx.moveTo(250 + 10, 125 - 10);
    ctx.arc(250 + 10, 125 - 10, 2, 0, 2 * Math.PI, false);
    ctx.stroke();

    //nose
    ctx.moveTo(250, 115);
    ctx.lineTo(245, 130);
    ctx.lineTo(255, 130);
    ctx.stroke();

    //mouth
    ctx.beginPath();
    ctx.arc(250, 140, 5, 0, 2 * Math.PI, false);
    ctx.stroke();

    //neck
    ctx.moveTo(250, 150);
    ctx.lineTo(250, 170);
    ctx.stroke();
    ctx.beginPath();

    //body
    ctx.arc(250, 215, 55, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    //hands
    ctx.moveTo(250 - 47, 215 - 30);
    ctx.lineTo(150, 170);
    ctx.moveTo(250 + 47, 215 - 30);
    ctx.lineTo(350, 170);

    //legs
    ctx.moveTo(250 - 25, 215 + 50);
    ctx.lineTo(250 - 40, 320);

    ctx.moveTo(250 + 25, 215 + 50);
    ctx.lineTo(250 + 40, 320);
    ctx.stroke();
}());
