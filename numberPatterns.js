let primePlot, evenPlot, oddPlot, perfectSquarePlot, nonSquarePlot;
const globalPrimes = [],
	globalOdds = [],
	globalEvens = [],
	globalPerfectSquares = [];
globalNonSquares = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	initAllGlobals();
	primePlot = new PrimePlot();
	evenPlot = new EvenPlot();
	oddPlot = new OddPlot();
	perfectSquarePlot = new PerfectSquarePlot();
	nonSquarePlot = new NonSquarePlot();
	stroke(0, 255, 255);
	strokeWeight(2);
}

function draw() {
	background(0);
	translate(width / 2, height / 2);
	if (globalPrimes.length > 0) {
		primePlot.insert();
		primePlot.plot();
	}

	// if (globalOdds.length > 0) {
	// 	oddPlot.insert();
	// 	oddPlot.plot();
	// }

	// if (globalEvens.length > 0) {
	// 	evenPlot.insert();
	// 	evenPlot.plot();
	// }

	// if (globalPerfectSquares.length > 0) {
	// 	perfectSquarePlot.insert();
	// 	perfectSquarePlot.plot();
	// }

	// if (globalNonSquares.length > 0) {
	// 	nonSquarePlot.insert();
	// 	nonSquarePlot.plot();
	// }
}

function initAllGlobals() {
	let isPrime;
	for (let i = 2; i < 80000; i++) {
		isPrime = true;
		for (let j = 2; j < i; j++) {
			if (i % j == 0) {
				isPrime = false;
				break;
			}
		}
		if (isPrime) {
			globalPrimes.push(i / 100);
		}
	}
	for (let i = 1; i < 8000; i++) {
		if (i % 2 == 0) {
			globalEvens.push(i / 10);
		} else {
			globalOdds.push(i / 10);
		}
	}
	for (let i = 1; i < 80000; i++) {
		if (sqrt(i) % 1 == 0) {
			globalPerfectSquares.push(i / 100);
		} else {
			globalNonSquares.push(i / 100);
		}
	}
}

function fib(n) {
	if (n <= 1) return 1;
	return fib(n - 1) + fib(n - 2);
}

function fact(n) {
	if (n == 1) return 1;
	return n * fact(n - 1);
}

function polarPoint(r, angle) {
	const x = r * cos(angle);
	const y = r * sin(angle);
	point(x, y);
}

class PrimePlot {
	constructor() {
		this.primes = [];
	}
	insert() {
		this.primes.push(globalPrimes.shift());
	}
	plot() {
		this.primes.forEach((prime) => {
			polarPoint(prime, prime);
		});
	}
}

class EvenPlot {
	constructor() {
		this.evens = [];
	}
	insert() {
		this.evens.push(globalEvens.shift());
	}
	plot() {
		this.evens.forEach((even) => {
			polarPoint(even, even);
		});
	}
}

class OddPlot {
	constructor() {
		this.odds = [];
	}
	insert() {
		this.odds.push(globalOdds.shift());
	}
	plot() {
		this.odds.forEach((odd) => {
			polarPoint(odd, odd);
		});
	}
}

class PerfectSquarePlot {
	constructor() {
		this.perfectSquares = [];
	}
	insert() {
		this.perfectSquares.push(globalPerfectSquares.shift());
	}
	plot() {
		this.perfectSquares.forEach((perfectSquare) => {
			polarPoint(perfectSquare, perfectSquare);
		});
	}
}

class NonSquarePlot {
	constructor() {
		this.nonSquares = [];
	}
	insert() {
		this.nonSquares.push(globalNonSquares.shift());
	}
	plot() {
		this.nonSquares.forEach((nonSquare) => {
			polarPoint(nonSquare, nonSquare);
		});
	}
}
