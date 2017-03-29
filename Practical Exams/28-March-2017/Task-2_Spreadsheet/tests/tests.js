const {expect} = require('chai');

const {jsdom} = require('jsdom'),
	document = jsdom('<html></html>', {}),
	window = document.defaultView;
const $ = require('jquery')(window);

global.document = document;
global.window = window;
global.$ = $;

const solve = require('../task/task');

describe('Test', () => {
	let result;

	beforeEach(() => result = solve());

	describe('Zero tests', () => {
		it('Expect correct table structure', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 3, cols = 5;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDE"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}
		});
	});

	describe('Regular tests', () => {
		it('Expect a cell to be selected when clicking on it', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 4, cols = 6;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEF"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			const $targetCell = cellMatrix[2][3],
				$rowCell = cellMatrix[2][0],
				$colCell = cellMatrix[0][3];

			expect($targetCell.hasClass('selected')).to.be.false;
			expect($rowCell.hasClass('selected')).to.be.false;
			expect($colCell.hasClass('selected')).to.be.false;

			$targetCell.mousedown();
			$targetCell.mouseup();

			expect($targetCell.hasClass('selected')).to.be.true;
			expect($rowCell.hasClass('selected')).to.be.true;
			expect($colCell.hasClass('selected')).to.be.true;

			const $targetCell2 = cellMatrix[3][1],
				$rowCell2 = cellMatrix[3][0],
				$colCell2 = cellMatrix[0][1];

			expect($targetCell2.hasClass('selected')).to.be.false;
			expect($rowCell2.hasClass('selected')).to.be.false;
			expect($colCell2.hasClass('selected')).to.be.false;

			$targetCell2.mousedown();
			$targetCell2.mouseup();

			expect($targetCell.hasClass('selected')).to.be.false;
			expect($rowCell.hasClass('selected')).to.be.false;
			expect($colCell.hasClass('selected')).to.be.false;

			expect($targetCell2.hasClass('selected')).to.be.true;
			expect($rowCell2.hasClass('selected')).to.be.true;
			expect($colCell2.hasClass('selected')).to.be.true;
		});

		it('Expect a row to be selected when clicking on it', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 4, cols = 6;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEF"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			const $targetCell = cellMatrix[2][0];

			expect($targetCell.hasClass('selected')).to.be.false;
			for(let j = 1; j <= cols; j += 1) {
				expect(cellMatrix[0][j].hasClass('selected')).to.be.false;
				expect(cellMatrix[2][j].hasClass('selected')).to.be.false;
			}

			$targetCell.mousedown();
			$targetCell.mouseup();

			expect($targetCell.hasClass('selected')).to.be.true;
			for(let j = 1; j <= cols; j += 1) {
				expect(cellMatrix[0][j].hasClass('selected')).to.be.true;
				expect(cellMatrix[2][j].hasClass('selected')).to.be.true;
			}
		});

		it('Expect a column to be selected when clicking on it', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 4, cols = 6;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEF"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			const $targetCell = cellMatrix[0][4];

			expect($targetCell.hasClass('selected')).to.be.false;
			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('selected')).to.be.false;
				expect(cellMatrix[i][4].hasClass('selected')).to.be.false;
			}

			$targetCell.mousedown();
			$targetCell.mouseup();

			expect($targetCell.hasClass('selected')).to.be.true;
			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('selected')).to.be.true;
				expect(cellMatrix[i][4].hasClass('selected')).to.be.true;
			}
		});

		it('Expect everything to be selected when clicking in the up-left corner', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 5, cols = 6;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEF"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			const $targetCell = cellMatrix[0][0];

			for(let i = 1; i <= rows; i += 1) {
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('selected')).to.be.false;
				}
			}

			$targetCell.mousedown();
			$targetCell.mouseup();

			for(let i = 1; i <= rows; i += 1) {
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('selected')).to.be.true;
				}
			}
		});

		it('Expect multiple cells to be selected when swiping over them', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 5, cols = 6;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEF"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			cellMatrix[3][3].mousedown();
			cellMatrix[1][4].mousemove();
			cellMatrix[1][4].mouseup();

			[0, 1, 2, 3].forEach(i => {
				[0, 3, 4].forEach(j => {
					if(i > 0 || j > 0) {
						expect(cellMatrix[i][j].hasClass('selected')).to.be.true;
					}
				});
			});
		});

		it('Expect multiple rows to be selected when swiping over them', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 5, cols = 6;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEF"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			cellMatrix[2][0].mousedown();
			cellMatrix[3][0].mousemove();
			cellMatrix[3][0].mouseup();

			[0, 2, 3].forEach(i => {
				for(let j = 0; j <= cols; j += 1) {
					if(i > 0 || j > 0) {
						expect(cellMatrix[i][j].hasClass('selected')).to.be.true;
					}
				}
			});
		});

		it('Expect multiple columns to be selected when swiping over them', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 5, cols = 6;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEF"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			cellMatrix[0][2].mousedown();
			cellMatrix[0][3].mousemove();
			cellMatrix[0][3].mouseup();

			for(let i = 0; i <= rows; i += 1) {
				[0, 2, 3].forEach(j => {
					if(i > 0 || j > 0) {
						expect(cellMatrix[i][j].hasClass('selected')).to.be.true;
					}
				});
			}
		});

		it('Expect cell to have the editing class when double clicked', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 8, cols = 7;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEFG"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			const $targetCell = cellMatrix[6][3];

			expect($targetCell.hasClass('editing')).to.be.false;

			$targetCell.dblclick();

			expect($targetCell.hasClass('editing')).to.be.true;

			$targetCell.find('input').blur();

			expect($targetCell.hasClass('editing')).to.be.false;
		});

		it('Expect cell to be edited successfully', () => {
			document.body.innerHTML = '<div id="root"></div>';

			const rows = 8, cols = 7;
			result('#root', rows, cols);

			const $root = $('#root');
			const $table = $root.find('.spreadsheet-table');

			expect($table).to.have.length(1);

			const $cells = $table.find('.spreadsheet-item');
			expect($cells).to.have.length((rows + 1) * (cols + 1));

			const cellMatrix = [];
			(function() {
				const cellArray = Array.from($cells);

				for(let i = 0; i <= rows; i += 1) {
					const row = cellArray.slice(i * (cols + 1), (i + 1) * (cols + 1)).map($);
					cellMatrix.push(row);
				}
			}()); // build 2d array of jquery elements

			expect(cellMatrix[0][0].hasClass('spreadsheet-header')).to.be.true;
			expect(cellMatrix[0][0].hasClass('spreadsheet-cell')).to.be.false;
			expect(cellMatrix[0][0].html()).to.equal('');

			(function() {
				const LETTERS = "@ABCDEFG"; // offset with @ on purpose
				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[0][j].hasClass('spreadsheet-header')).to.be.true;
					expect(cellMatrix[0][j].hasClass('spreadsheet-cell')).to.be.false;
					expect(cellMatrix[0][j].html()).to.equal(LETTERS[j]);
				}
			}());

			for(let i = 1; i <= rows; i += 1) {
				expect(cellMatrix[i][0].hasClass('spreadsheet-header')).to.be.true;
				expect(cellMatrix[i][0].hasClass('spreadsheet-cell')).to.be.false;
				expect(cellMatrix[i][0].html()).to.equal(i + '');

				for(let j = 1; j <= cols; j += 1) {
					expect(cellMatrix[i][j].hasClass('spreadsheet-header')).to.be.false;
					expect(cellMatrix[i][j].hasClass('spreadsheet-cell')).to.be.true;
					const $span = cellMatrix[i][j].find('span');
					const $input = cellMatrix[i][j].find('input');

					expect($span).to.have.length(1);
					expect($span.html()).to.equal('');
					expect($input).to.have.length(1);
				}
			}

			const $targetCell = cellMatrix[6][3],
				$input = $targetCell.find('input'),
				$span = $targetCell.find('span');

			$span.html('I was here');

			$targetCell.dblclick();

			expect($input.val()).to.equal('I was here');

			$input.val('and I wrote code');
			$input.blur();

			expect($span.html()).to.equal('and I wrote code');
		});
	});
});
