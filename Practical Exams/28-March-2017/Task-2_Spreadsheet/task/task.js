function solve() {
	const A_CHAR_CODE = 'A'.charCodeAt(0);

	const SPREADSHEET_ITEM_CLASS = 'spreadsheet-item';
	const SPREADSHEET_CELL_CLASS = 'spreadsheet-cell';
	const SPREADSHEET_HEADER_CLASS = 'spreadsheet-header';
	const SPREADSHEET_TABLE_CLASS = 'spreadsheet-table';
	const SELECTED_CLASS = 'selected';
	const EDITING_CLASS = 'editing';

	function buildTable(rows, cols) {
		const $headerCell = $('<th>')
			.addClass(SPREADSHEET_HEADER_CLASS)
			.addClass(SPREADSHEET_ITEM_CLASS);
		const $dataCell = $('<td>')
			.addClass(SPREADSHEET_CELL_CLASS)
			.addClass(SPREADSHEET_ITEM_CLASS);
		$('<input>').appendTo($dataCell);
		$('<span>').appendTo($dataCell);

		const $headerRow = $('<tr>');
		$headerCell.clone().appendTo($headerRow);
		const $dataRow = $headerRow.clone();

		for(let i = 0; i < cols; i += 1) {
			$headerCell.clone()
				.text(String.fromCharCode(A_CHAR_CODE + i))
				.appendTo($headerRow);
		}

		const $table = $('<table>').addClass(SPREADSHEET_TABLE_CLASS);
		$table.append($headerRow);

		for(let i = 0; i < cols; i += 1) {
			$dataCell.clone()
				.appendTo($dataRow);
		}

		for(let i = 1; i <= rows; i += 1) {
			const $row = $dataRow.clone();
			$row.find('th').text(i);
			$row.appendTo($table);
		}

		$table.children().each((row, tr) => {
			$(tr).children().each((col, tc) => {
				$(tc)
					.data('row', row)
					.data('col', col);
			});
		});

		return $table;
	}

	return function(selector, rows, cols) {
		cols = cols || rows; // Just in case ;P

		const $table = buildTable(rows, cols);

		const selection = (function() {
			let startRow, startCol,
				stopRow, stopCol,
				isClicked = false;

			const $cellMatrix = Array.from($table.children())
				.map(tr => Array.from(tr.children).map($));

			function selectRectangle(startRow, startCol, stopRow, stopCol) {
				$table.find('.' + SELECTED_CLASS).removeClass(SELECTED_CLASS);

				if(startRow === 0) {
					stopRow = rows;
				}
				if(startCol === 0) {
					stopCol = cols;
				}
				if(stopRow === 0) {
					stopRow = 1;
				}
				if(stopCol === 0) {
					stopCol = 1;
				}

				if(startRow > stopRow) {
					[startRow, stopRow] = [stopRow, startRow];
				}
				if(startCol > stopCol) {
					[startCol, stopCol] = [stopCol, startCol];
				}

				if(startRow > 0) {
					for(let col = startCol || 1; col <= stopCol; col += 1) {
						$cellMatrix[0][col].addClass(SELECTED_CLASS);
					}
				}
				if(startCol > 0) {
					for(let row = startRow || 1; row <= stopRow; row += 1) {
						$cellMatrix[row][0].addClass(SELECTED_CLASS);
					}
				}

				for(let row = startRow; row <= stopRow; row += 1) {
					for(let col = startCol; col <= stopCol; col += 1) {
						$cellMatrix[row][col].addClass(SELECTED_CLASS);
					}
				}
			}

			function start(e) {
				isClicked = true;

				let $target = $(e.target);
				if(!$target.hasClass(SPREADSHEET_ITEM_CLASS)) {
					$target = $target.parent();
				}

				const { row, col } = $target.data();
				[startRow, startCol] = [row, col];
				[stopRow, stopCol] = [row, col];

				selectRectangle(startRow, startCol, startRow, startCol);
			}

			function stop(e) {
				isClicked = false;
			}

			function move(e) {
				if(!isClicked) {
					return;
				}

				let $target = $(e.target);
				if(!$target.hasClass(SPREADSHEET_ITEM_CLASS)) {
					$target = $target.parent();
				}

				const { row, col } = $target.data();
				if(row === stopRow && col === stopCol) {
					return;
				}
				[stopRow, stopCol] = [row, col];
				selectRectangle(startRow, startCol, stopRow, stopCol);
			}

			function edit(e) {
				let $target = $(e.target);
				if(!$target.hasClass(SPREADSHEET_CELL_CLASS)) {
					$target = $target.parent();
				}

				$target.addClass(EDITING_CLASS);
				const $input = $target.find('input');
				const $span = $target.find('span');
				$input.val($span.text());
				$input.focus();

				$input.one('blur', () => {
					$span.text($input.val());
					$target.removeClass(EDITING_CLASS);
				});
			}

			return { start, stop, move, edit };
		}());

		$table.on('mousedown', selection.start);
		$table.on('mouseup', selection.stop);
		$table.on('mousemove', selection.move);
		$table.on('dblclick', selection.edit);

		// Not required, just for convenience
		$table.on('keypress', function(e) {
			if(e.key === 'Enter') {
				e.target.blur();
			}
		});

		$(selector).append($table);
	};
}

// SUBMIT THE CODE ABOVE THIS LINE

if(typeof module !== 'undefined') {
	module.exports = solve;
}
