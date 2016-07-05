Array.prototype.forEach.call(document.querySelectorAll("textarea.autowrap"), function(textarea) {
	function wrap() {
		var cursorPos = textarea.selectionStart;
		var newValue = textarea.value.split("\n").map(function(line) {
			var wrapped = "";
			while (line.length > textarea.cols) {
				var wrapPos = line.lastIndexOf(" ", textarea.cols);
				if (wrapPos === -1) {
					wrapPos = textarea.cols;
				}
				var wrap = line.substr(0, wrapPos);
				wrapped += wrap + (wrap.length > 0 ? "\n" : "");
				line = line.substr(wrapPos);
				if (line[0] === " ") {
					line = line.substr(1);
				}
				if (line === "\n") {
					line = "";
				}
			}
			return wrapped + line;
		}).join("\n");
		if (newValue.length > textarea.value.length && cursorPos % textarea.cols === 0) {
			cursorPos++;
		}
		textarea.value = newValue;
		textarea.selectionStart = textarea.selectionEnd = cursorPos;
	}
	textarea.addEventListener("input", wrap);
	textarea.addEventListener("change", wrap);
});
