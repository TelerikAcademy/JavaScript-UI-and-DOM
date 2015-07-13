(function () {
	if (!String.prototype.repeat) {
		String.prototype.repeat = function (times) {
			var repeatedString;
			if (!times) {
				times = 1;
			}
			repeatedString = "";

			for (var i = 0; i < times; i += 1) {
				repeatedString += String(this);
			}
			return repeatedString;
		};
	}
}());