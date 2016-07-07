(function () {
	var btn = document.getElementById("btn-add-item"),
		list = document.getElementById("list");

	function formatTime(date) {
		var hours,
			hoursString,
			minutes,
			minutesString,
			seconds,
			secondsString;
		if (!date) {
			date = new Date();
		}

		hours = date.getHours();
		hoursString = ((hours / 10 > 0) ? "" : "0") + hours;
		minutes = date.getMinutes();
		minutesString = ((minutes / 10 > 0) ? "" : "0") + minutes;
		seconds = date.getSeconds();
		secondsString = ((seconds / 10 > 0) ? "" : "0") + seconds;
		return hoursString + ":" + minutesString + ":" + secondsString;
	}

	btn.addEventListener("click", function (e) {
		var time = formatTime();
		console.log(time);
		list.innerHTML += "<li class='list-item'>" + time + "</li>";
	});
}());