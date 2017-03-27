function getLeftRotation(matrix) {
	const rotated = [];
	const rows = matrix[0].length;
	const cols = matrix.length;

	for(let i = 0; i < rows; i += 1) {
		const row = []

		for(j = 0; j < cols; j += 1) {
			row.push(matrix[j][rows - 1 - i]);
		}

		rotated.push(row);
	}

	return rotated;
}

function getRightRotation(matrix) {
	const rotated = [];
	const rows = matrix[0].length;
	const cols = matrix.length;

	for(let i = 0; i < rows; i += 1) {
		const row = []

		for(j = 0; j < cols; j += 1) {
			row.push(matrix[cols - 1 - j][i]);
		}

		rotated.push(row);
	}

	return rotated;
}
