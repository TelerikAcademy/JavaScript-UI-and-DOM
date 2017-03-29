function solve() {
	const deleteClassName = 'delete';

	const appendEntry = (function() {
		const liEntry = document.createElement('li');
		liEntry.className = 'entry';

		const deleteIcon = document.createElement('img');
		deleteIcon.className = deleteClassName;
		deleteIcon.src = 'imgs/Remove-icon.png';

		liEntry.appendChild(deleteIcon);

		return function(el, text) {
			const entry = liEntry.cloneNode(true);
			entry.className = 'entry';

			const textEl = document.createTextNode(text);
			entry.appendChild(textEl);

			el.appendChild(entry);
		};
	}());

	return function(selector, defaultLeft, defaultRight) {
		defaultLeft = defaultLeft || [];
		defaultRight = defaultRight || [];

		const leftRadio = document.createElement('input');
		leftRadio.type = 'radio';
		leftRadio.name = 'column-select';

		// Not required, just for convenience
		const leftLabel = document.createElement('label');
		leftLabel.innerHTML = 'Add here';

		const leftList = document.createElement('ol');

		const leftColumn = document.createElement('div');
		leftColumn.className = 'column';

		const heading = document.createElement('div');
		heading.className = 'select';

		heading.appendChild(leftRadio);
		heading.appendChild(leftLabel);
		leftColumn.appendChild(heading);
		leftColumn.appendChild(leftList);

		const rightColumn = leftColumn.cloneNode(true);
		const rightList = rightColumn.querySelector('ol');
		const rightLabel = rightColumn.querySelector('label');
		const rightRadio = rightColumn.querySelector('input');

		leftRadio.checked = true;
		leftRadio.id = 'select-left-column';
		rightRadio.id = 'select-right-column';

		leftLabel.htmlFor = leftRadio.id;
		rightLabel.htmlFor = rightRadio.id;

		const columns = document.createElement('div');
		columns.className = 'column-container';
		columns.appendChild(leftColumn);
		columns.appendChild(rightColumn);

		const input = document.createElement('input');

		defaultLeft.forEach(x => appendEntry(leftList, x));
		defaultRight.forEach(x => appendEntry(rightList, x));

		input.size = 40;
		input.autofocus = true;

		const button = document.createElement('button');
		button.innerHTML = 'Add';

		const root = document.createDocumentFragment();
		root.appendChild(columns);
		root.appendChild(input);
		root.appendChild(button);

		// append to real root
		let realRoot = document.querySelector(selector);
		realRoot.innerHTML = '';
		realRoot.appendChild(root);

		function putEntry() {
			const text = input.value.trim();
			if(text !== '') {
				input.value = '';
				appendEntry((leftRadio.checked ? leftList : rightList), text);
			}
		}

		button.addEventListener('click', putEntry);
		input.addEventListener('keypress', function(ev) {
			// Not required, just for convenience
			if(ev.key === 'Enter') {
				putEntry();
			}
		});

		columns.addEventListener('click', function(ev) {
			if(ev.target.className.indexOf(deleteClassName) >= 0) {
				const entry = ev.target.parentNode;
				input.value = entry.childNodes[1].textContent;
				entry.parentNode.removeChild(entry);
			}
		});
	};
}

// SUBMIT THE CODE ABOVE THIS LINE

if(typeof module !== 'undefined') {
	module.exports = solve;
}
