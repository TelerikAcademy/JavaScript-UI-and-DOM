(function () {
	var students = [],
		studentsList = document.getElementById("students-list"),
		addStudentButton = document.getElementById("btn-add-student"),
		sortStudentsButton = document.getElementById("btn-sort-students"),
		studentTextBox = document.getElementById("tb-student");

	addStudentButton.addEventListener("click", onAddStudentButtonClick, false);
	sortStudentsButton.addEventListener("click", onSortButtonClick, false);

	function onAddStudentButtonClick() {
		var name = studentTextBox.value;
		var studentItem = document.createElement("li");
		studentItem.innerHTML = name;
		studentsList.appendChild(studentItem);
		students.push({
			index: students.length,
			value: name,
			item: studentItem
		});
	}

	function onSortButtonClick(e) {
		var isSorted = studentsList.getAttribute("data-sort");
		if (isSorted == "true") {
			students = students.sort(function (x, y) {
				return x.index > y.index ? 1 : x.index < y.index ? -1 : 0;
			});
			sortStudentsButton.innerHTML = "sort";
			studentsList.setAttribute("data-sort", "false");
		} else {
			students = students.sort(function (x, y) {
				return x.value > y.value ? 1 : x.value < y.value ? -1 : 0;
			});
			sortStudentsButton.innerHTML = "unsort";
			studentsList.setAttribute("data-sort", "true");
		}
		reArrangeStudents();
	}

	function reArrangeStudents() {
		var i;
		for (i = 0; i < students.length; i++) {
			studentsList.appendChild(students[i].item);
		}
	}
}());