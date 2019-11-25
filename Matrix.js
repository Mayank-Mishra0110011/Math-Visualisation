class Matrix {
	constructor(rows, cols, array) {
		if (array) {
			if (typeof array[0] === 'number') {
				this.array = [ array ];
			} else {
				this.array = array;
			}
		} else {
			this.array = new Array(rows).fill().map(() => new Array(cols).fill(0));
		}
	}
	setIdentity() {
		for (let i = 0; i < this.array.length; i++) {
			for (let j = 0; j < this.array[i].length; j++) {
				this.array[i][j] = i == j ? 1 : 0;
			}
		}
		return this;
	}
	setRandom(min, max) {
		for (let i = 0; i < this.array.length; i++) {
			for (let j = 0; j < this.array[i].length; j++) {
				if (min && max) {
					this.array[i][j] = random(min, max);
				} else {
					this.array[i][j] = Math.random();
				}
			}
		}
		return this;
	}
	transpose() {
		this.array = this.array.map((row, i) => {
			return row.map((col, j) => {
				return this.array[j][i];
			});
		});
		return this;
	}
	add(matrix) {
		if (this.array.length != matrix.array.length || this.array[0].length != matrix.array[0].length) {
			return 'Invalid Operation! Matrices must have equal rows and columns';
		}
		return new Matrix(
			null,
			null,
			new Array(this.array.length).fill().map((a, i) =>
				new Array(this.array[0].length).fill().map((b, j) => {
					return this.array[i][j] + matrix.array[i][j];
				})
			)
		);
	}
	subtract(matrix) {
		if (this.array.length != matrix.array.length || this.array[0].length != matrix.array[0].length) {
			return 'Invalid Operation! Matrices must have equal rows and columns';
		}
		return new Matrix(
			null,
			null,
			new Array(this.array.length).fill().map((a, i) =>
				new Array(this.array[0].length).fill().map((b, j) => {
					return this.array[i][j] - matrix.array[i][j];
				})
			)
		);
	}
	multiply(matrix) {
		if (this.array.length != matrix.array[0].length) {
			return 'Invalid Operation! Rows of 1st matrix must equal column of 2nd matrix';
		}
		const productMatrix = new Array(this.array[0].length).fill().map(() => new Array(matrix.array.length).fill(0));
		for (let i = 0; i < this.array[0].length; i++) {
			for (let j = 0; j < matrix.array.length; j++) {
				for (let k = 0; k < this.array.length; k++) {
					productMatrix[j][i] += this.array[k][i] * matrix.array[j][k];
				}
				productMatrix[j][i] = Math.round(productMatrix[j][i] * 100) / 100;
				if (productMatrix[j][i] == -0) {
					productMatrix[j][i] = 0;
				}
			}
		}
		return new Matrix(null, null, productMatrix);
	}
	determinant() {
		if (this.array.length == 1) {
			return this.array[0][0];
		} else if (this.array.length == 2 && this.array[0].length == 2) {
			return this.array[0][0] * this.array[1][1] - this.array[0][1] * this.array[1][0];
		}
		let sum = 0;
		for (let i = 0; i < this.array[0].length; i++) {
			if (i % 2 == 0) {
				sum += this.array[0][i] * this.minorMatrix(0, i).determinant();
			} else {
				sum += -1 * this.array[0][i] * this.minorMatrix(0, i).determinant();
			}
		}
		return sum;
	}
	adjointMatrix() {
		return this.cofactorMatrix().transpose();
	}
	cofactorMatrix() {
		let cf = new Matrix(
			null,
			null,
			this.array.slice().map((rows, i) => {
				return rows.map((cols, j) => {
					return this.minorMatrix(i, j).determinant();
				});
			})
		);
		for (let i = 0; i < cf.array.length; i++) {
			for (let j = 0; j < cf.array[i].length; j++) {
				if (i % 2 == 0 && j % 2 == 0) {
					cf.array[i][j] *= -1;
				} else if (i % 2 != 0 && j % 2 != 0) {
					cf.array[i][j] *= -1;
				}
			}
		}
		return cf;
	}
	minorMatrix(_i, _j) {
		const minor = [];
		for (let i = 0; i < this.array.length; i++) {
			const array = [];
			for (let j = 0; j < this.array[i].length; j++) {
				if (i != _i && j != _j) {
					array.push(this.array[i][j]);
				}
			}
			if (array.length != 0) {
				minor.push(array);
			}
		}
		return new Matrix(null, null, minor);
	}
	invert() {
		if (this.array.length != this.array[0].length) {
			return 'Inversion is only possible for square matrices';
		} else if (this.determinant() === 0) {
			return 'Inverse Matrix does not exist';
		} else if (this.array.length == 2 && this.array[0].length == 2) {
			return new Matrix(null, null, [
				[ this.array[1][1], -this.array[0][1] ],
				[ -this.array[1][0], this.array[0][0] ]
			]).scale(1 / this.determinant());
		} else {
			return this.adjointMatrix().scale(-1 / this.determinant());
		}
	}
	scale(s) {
		return new Matrix(
			null,
			null,
			this.array.slice().map((row) => {
				return row.map((value) => value * s);
			})
		);
	}
}

function random(min, max) {
	return Math.random() * (max - min) + min;
}

x = new Matrix(3, 3, [ [ 3, 1, 2, -2 ], [ 2, 0, -2, 1 ], [ 0, 1, 1, 4 ], [ 1, 3, -3, -1 ] ]);
a = new Matrix(3, 3, [ [ 0, -2, 1 ], [ 1, 1, 4 ], [ 3, -3, -1 ] ]);
b = new Matrix(3, 3, [ [ 2, -2, 1 ], [ 0, 1, 4 ], [ 1, -3, -1 ] ]);
c = new Matrix(3, 3, [ [ 2, 0, 1 ], [ 0, 1, 4 ], [ 1, -3, -1 ] ]);
d = new Matrix(3, 3, [ [ 2, 0, -2 ], [ 0, 1, 1 ], [ 1, 3, -3 ] ]);
p = new Matrix(3, 3, [ [ 1, 2, 3 ], [ 0, 4, 5 ], [ 1, 0, 6 ] ]);
