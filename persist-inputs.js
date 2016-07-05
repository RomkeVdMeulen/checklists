var prefix = "romkes-checklists-";
Array.prototype.forEach.call(document.querySelectorAll("input[type='checkbox']"), function(check) {
	if (!check.name) {
		return;
	}
	check.checked = localStorage.getItem(prefix + check.name) === "checked";
	check.addEventListener("change", function(ev) {
		localStorage.setItem(prefix + check.name, check.checked ? "checked" : "");
	});
});
Array.prototype.forEach.call(document.querySelectorAll("input[type='text'], textarea"), function(input) {
	if (!input.name) {
		return;
	}
	input.value = localStorage.getItem(prefix + input.name);
	input.addEventListener("input", function(ev) {
		localStorage.setItem(prefix + this.name, this.value);
	});
});
Array.prototype.forEach.call(document.querySelectorAll("button[type='reset']"), function(reset) {
	form = reset.closest("form");
	if (!form) {
		return;
	}
	reset.addEventListener("click", function(ev) {
		Array.prototype.forEach.call(form.querySelectorAll("input[type='checkbox']"), function(check) {
			check.checked = false;
			if (check.name) {
				localStorage.setItem(prefix + check.name, "");
			}
		});
		Array.prototype.forEach.call(document.querySelectorAll("input[type='text'], textarea"), function(input) {
			localStorage.setItem(prefix + input.name, "");
		});
	});
});
