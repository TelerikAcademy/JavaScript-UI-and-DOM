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

	if (!String.prototype.trimLeftChars) {
		String.prototype.trimLeftChars = function (chars) {
			var regEx = new RegExp("^[" + chars + "]+");
			return this.replace(regEx, "");
		};
	}

	if (!String.prototype.trimRightChars) {
		String.prototype.trimRightChars = function (chars) {

			var regEx = new RegExp("[" + chars + "]+$");
			return this.replace(regEx, "");
		};
	}

	if (!String.prototype.trimChars) {
		String.prototype.trimChars = function (chars) {
			return this.trimLeftChars(chars).trimRightChars(chars);
		};
	}
}());