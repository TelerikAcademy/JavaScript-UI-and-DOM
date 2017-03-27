const TETRIS_ROWS = 18;
const TETRIS_COLS = 10;
const TETRIS_CELL_SIZE = 42;

const tetrisTable = Array.from({ length: TETRIS_ROWS })
	.map(() => Array.from({ length: TETRIS_COLS }).map(() => false));

tetrisTable.push(Array.from({ length: TETRIS_COLS }).map(() => true));

function getCellX(row) {
	return TETRIS_CELL_SIZE * row;
}

function getCellY(col) {
	return TETRIS_CELL_SIZE * col;
}

const currentFigure = {
	obj: {},
	row: 0,
	col: 0
};

const { getScore, getSpeed } = (function() {
	const figures = [
		{
			color: 'red',
			cells: [
				[1, 1],
				[1, 1],
			]
		},
		{
			color: 'yellow',
			cells: [
				[1],
				[1],
				[1],
				[1],
			]
		},
		{
			color: 'lightgreen',
			cells: [
				[1, 1, 0],
				[0, 1, 1],
			]
		},
		{
			color: 'lightblue',
			cells: [
				[0, 1, 1],
				[1, 1, 0],
			]
		},
		{
			color: 'blue',
			cells: [
				[1, 1, 1],
				[1, 0, 0],
			]
		},
		{
			color: 'purple',
			cells: [
				[1, 1, 1],
				[0, 0, 1],
			]
		},
		{
			color: 'green',
			cells: [
				[1, 1, 1],
				[0, 1, 0],
			]
		},
	];

	let gameSpeed = 4;
	let gameSpeedOverride = 0;
	let gameOn = true;

	function getFigure() {
		const index = Math.random() * figures.length | 0;
		currentFigure.obj = figures[index];
		currentFigure.row = -figures[index].cells.length;
		currentFigure.col = (TETRIS_COLS - figures[index].cells[0].length) / 2 | 0;
	}

	function checkForCollision(offsetRow, offsetCol, matrix) {
		for(let i = 0; i < matrix.length; i += 1) {
			const row = offsetRow + i;
			if(row < 0) {
				continue;
			}

			for(let j = 0; j < matrix[i].length; j += 1) {
				const col = offsetCol + j;

				if(matrix[i][j] && tetrisTable[row][col]) {
					return true;
				}
			}
		}

		return false;
	}

	let gameScore = 0;
	const scoreSystem = [0, 10, 15, 20, 25];

	const startTime = new Date();

	function update() {
		if(!gameOn) {
			return;
		}

		let canFall = !checkForCollision(currentFigure.row + 1, currentFigure.col, currentFigure.obj.cells);

		if(canFall) {
			currentFigure.row += 1;
		} else if(currentFigure.row < 0) {
			gameOn = false;
			const secondsPlayed = (new Date() - startTime) / 1000;
			alert(`Game over!
Your score is ${gameScore}.
You lasted ${secondsPlayed} seconds.`);
			return;
		} else {
			const filledRows = [];

			for(let i = 0; i < currentFigure.obj.cells.length; i += 1) {
				const row = currentFigure.row + i;
				for(let j = 0; j < currentFigure.obj.cells[i].length; j += 1) {
					const col = currentFigure.col + j;

					if(currentFigure.obj.cells[i][j]) {
						tetrisTable[row][col] = currentFigure.obj.color;
					}
				}

				const isRowFilled = tetrisTable[row].every(x => x);
				if(isRowFilled) {
					filledRows.push(row);
				}
			}

			for(const row of filledRows) {
				tetrisTable.splice(row, 1);
				const emptyRow = Array.from({ length: TETRIS_COLS });
				tetrisTable.unshift(emptyRow);
			}

			gameScore += scoreSystem[filledRows.length];

			getFigure();
		}

		const currentSpeed = gameSpeedOverride || gameSpeed;
		setTimeout(update, 1000 / currentSpeed);
	}

	getFigure();
	update();

	setInterval(function() {
		gameSpeed += 1;
	}, 60 * 1000);

	window.addEventListener('keydown', function(ev) {
		console.log(ev.key);

		if(ev.key === 'ArrowLeft') {
			const canMove = currentFigure.col > 0 && !checkForCollision(currentFigure.row, currentFigure.col - 1, currentFigure.obj.cells);
			if(canMove) {
				currentFigure.col -= 1;
			}
		} else if(ev.key === 'ArrowRight') {
			const canMove = currentFigure.col + currentFigure.obj.cells[0].length < TETRIS_COLS && !checkForCollision(currentFigure.row, currentFigure.col + 1, currentFigure.obj.cells);
			if(canMove) {
				currentFigure.col += 1;
			}
		}
		else if(ev.key === 'ArrowDown') {
			gameSpeedOverride = 50;
		}
		else if(ev.key === 'q' || ev.key === 'w') {
			const rotateFunc = (ev.key === 'q' ? getLeftRotation : getRightRotation);
			const matrix = rotateFunc(currentFigure.obj.cells);

			const canRotate = currentFigure.col >= 0 && currentFigure.col + matrix[0].length <= TETRIS_COLS && !checkForCollision(currentFigure.row, currentFigure.col, matrix);
			if(canRotate) {
				currentFigure.obj.cells = matrix;
			}
		}
	});

	window.addEventListener('keyup', function(ev) {
		if(ev.key === 'ArrowDown') {
			gameSpeedOverride = 0;
		}
	});

	return {
		getScore: () => gameScore,
		getSpeed: () => gameSpeed
	};
}());
