const {expect} = require('chai');

const {jsdom} = require('jsdom');

global.document = jsdom('<html></html>', {});
global.window = document.defaultView;

const solve = require('../task/task');

describe('Test', () => {
	let result;

	beforeEach(() => result = solve());

	describe('Zero tests', () => {
		it('Expect correct structure when no default values are provided', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			result('#root');

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach(column => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');
				expect(elements[1].innerHTML).to.equal('');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');
			});
		});

		it('Expect correct structure when default values are provided', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[ 'Banana', 'Apple', 'Cactus' ],
				[ 'Cabbage', 'Cucumber' ]
			];
			result('#root', ...columns);

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach((column, i) => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');

				const lis = Array.from(elements[1].querySelectorAll('li'));
				expect(lis.length).to.equal(columns[i].length);
				
				lis.forEach((li, j) => {
					expect(li.querySelector('img').className).to.equal('delete');
					expect(li.innerHTML.replace(/<.*>/g, '').trim()).to.equal(columns[i][j]);
				});
			});
		});
	});

	describe('Regular tests', () => {
		it('Expect adding to the left column to work', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[ 'Item1', 'Item2', 'Item3' ],
				[  ]
			];
			result('#root');

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			columns[0].forEach(item => {
				elements[1].value = item;
				elements[2].click();
			});

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach((column, i) => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');

				const lis = Array.from(elements[1].querySelectorAll('li'));
				expect(lis.length).to.equal(columns[i].length);
				
				lis.forEach((li, j) => {
					expect(li.querySelector('img').className).to.equal('delete');
					expect(li.innerHTML.replace(/<.*>/g, '').trim()).to.equal(columns[i][j]);
				});
			});
		});

		it('Expect adding to the right column to work', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[  ],
				[ 'Item1', 'Item2', 'Item3' ]
			];
			result('#root');

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			const [leftRadio, rightRadio] = Array.from(radios);
			rightRadio.checked = true;

			columns[1].forEach(item => {
				elements[1].value = item;
				elements[2].click();
			});

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach((column, i) => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');

				const lis = Array.from(elements[1].querySelectorAll('li'));
				expect(lis.length).to.equal(columns[i].length);
				
				lis.forEach((li, j) => {
					expect(li.querySelector('img').className).to.equal('delete');
					expect(li.innerHTML.replace(/<.*>/g, '').trim()).to.equal(columns[i][j]);
				});
			});
		});

		it('Expect adding to both columns to work', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[ 'Item1', 'Item2', 'Item3' ],
				[ 'Item4', 'Item5', 'Item6' ]
			];
			result('#root');

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			const [leftRadio, rightRadio] = Array.from(radios);

			[0, 1, 2].forEach(i => {
				leftRadio.checked = true;
				elements[1].value = columns[0][i];
				elements[2].click();

				rightRadio.checked = true;
				elements[1].value = columns[1][i];
				elements[2].click();
			});

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach((column, i) => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');

				const lis = Array.from(elements[1].querySelectorAll('li'));
				expect(lis.length).to.equal(columns[i].length);
				
				lis.forEach((li, j) => {
					expect(li.querySelector('img').className).to.equal('delete');
					expect(li.innerHTML.replace(/<.*>/g, '').trim()).to.equal(columns[i][j]);
				});
			});
		});

		it('Expect empty items and whitespace only items to not be added', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[ 'To have' ],
				[  ]
			];
			result('#root');

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			elements[1].value = '';
			elements[2].click();
			elements[1].value = '  ';
			elements[2].click();

			columns[0].forEach(item => {
				elements[1].value = item;
				elements[2].click();
			});

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach((column, i) => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');

				const lis = Array.from(elements[1].querySelectorAll('li'));
				expect(lis.length).to.equal(columns[i].length);
				
				lis.forEach((li, j) => {
					expect(li.querySelector('img').className).to.equal('delete');
					expect(li.innerHTML.replace(/<.*>/g, '').trim()).to.equal(columns[i][j]);
				});
			});
		});

		it('Expect items to be trimmed when added', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[ 'Pesho', 'To have', 'Much cool' ],
				[  ]
			];
			result('#root');

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			columns[0].forEach(item => {
				elements[1].value = ' ' + item + ' ';
				elements[2].click();
			});

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach((column, i) => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');

				const lis = Array.from(elements[1].querySelectorAll('li'));
				expect(lis.length).to.equal(columns[i].length);
				
				lis.forEach((li, j) => {
					expect(li.querySelector('img').className).to.equal('delete');
					expect(li.innerHTML.replace(/<.*>/g, '').trim()).to.equal(columns[i][j]);
				});
			});
		});

		it('Expect input value to be cleared after adding', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[ 'Item1', 'Item2', 'Item3' ],
				[  ]
			];
			result('#root');

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			columns[0].forEach(item => {
				elements[1].value = item;
				elements[2].click();
				expect(elements[1].value).to.equal('');
			});
		});

		it('Expect removing from the left column to work', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[ 'Banana', 'Apple', 'Cactus' ],
				[ 'Cabbage', 'Cucumber' ]
			];
			result('#root', ...columns);

			const [appleText] = columns[0].splice(1, 1);
			const appleLi = Array.from(root.querySelectorAll('li'))
				.find(li => li.innerHTML.indexOf(appleText) >= 0);
			appleLi.querySelector('.delete').click();

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			expect(elements[1].value).to.equal(appleText);

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach((column, i) => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');

				const lis = Array.from(elements[1].querySelectorAll('li'));
				expect(lis.length).to.equal(columns[i].length);
				
				lis.forEach((li, j) => {
					expect(li.querySelector('img').className).to.equal('delete');
					expect(li.innerHTML.replace(/<.*>/g, '').trim()).to.equal(columns[i][j]);
				});
			});
		});

		it('Expect removing from the right column to work', () => {
			document.body.innerHTML = '<div id="root"></div>';
			const root = document.querySelector('#root');

			const columns = [
				[ 'Banana', 'Apple', 'Cactus' ],
				[ 'Tomato', 'Cabbage', 'Cucumber' ]
			];
			result('#root', ...columns);

			const [tomatoText] = columns[1].splice(0, 1);
			const tomatoLi = Array.from(root.querySelectorAll('li'))
				.find(li => li.innerHTML.indexOf(tomatoText) >= 0);
			tomatoLi.querySelector('.delete').click(); // YES, kill the tomatoes

			let elements = Array.from(root.children);
			expect(elements).to.have.length(3);
			expect(elements[0].className).to.equal('column-container');
			expect(elements[1].tagName).to.equal('INPUT');
			expect(elements[2].tagName).to.equal('BUTTON');

			expect(elements[1].value).to.equal(tomatoText);

			const radios = elements[0].querySelectorAll('input[type=radio]');
			expect(radios).to.have.length(2);
			expect(radios[0].name).to.equal(radios[1].name);

			elements = Array.from(elements[0].children);

			expect(elements).to.have.length(2);
			expect(elements[0].className).to.equal('column');
			expect(elements[1].className).to.equal('column');

			elements.forEach((column, i) => {
				const elements = Array.from(column.children);
				expect(elements).to.have.length(2);
				expect(elements[0].className).to.equal('select');

				const radio = elements[0].querySelector('input');
				expect(radio.type).to.equal('radio');

				const lis = Array.from(elements[1].querySelectorAll('li'));
				expect(lis.length).to.equal(columns[i].length);
				
				lis.forEach((li, j) => {
					expect(li.querySelector('img').className).to.equal('delete');
					expect(li.innerHTML.replace(/<.*>/g, '').trim()).to.equal(columns[i][j]);
				});
			});
		});
	});
});
