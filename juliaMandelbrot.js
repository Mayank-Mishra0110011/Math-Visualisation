let a = -0.8,
	b = 0.7,
	ar,
	br;
function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(0);
	juliaSet(a, b);
	if (ar) {
		a -= 0.015;
	} else {
		a += 0.015;
	}
	if (a > 0.4) ar = true;
	if (a < -0.8) ar = false;
	if (br) {
		b -= 0.015;
	} else {
		b += 0.015;
	}
	if (b > 0.7) br = true;
	if (b < -0.7) br = false;
	// mandelbortSet();
}

function juliaSet(a, b) {
	loadPixels();
	let x = a,
		y = b;
	for (let i = 0; i < 400; i++) {
		for (let j = 0; j < 400; j++) {
			let x0 = map(j, 0, 400 / 1.5, -2.5, 1);
			let y0 = map(i, 0, 400 / 1.5, -1, 1);
			let maxIteration = 50,
				iteration = 0;
			while (iteration < maxIteration) {
				if (x0 ** 2 + y0 ** 2 > 4) break;
				let xSqr = x0 ** 2 - y0 ** 2,
					ySqr = 2 * x0 * y0;
				x0 = xSqr + x;
				y0 = ySqr + y;
				iteration++;
			}
			let p = 400 * 4 * i + 4 * j;
			if (iteration == maxIteration) {
				pixels[p] = 255;
				pixels[p + 1] = 255;
				pixels[p + 2] = 255;
				pixels[p + 3] = 255;
			}
		}
	}
	updatePixels();
}

function mandelbortSet() {
	loadPixels();
	for (let i = 0; i < 400; i++) {
		for (let j = 0; j < 400; j++) {
			let x0 = map(j, 0, 400, -2.5, 1);
			let y0 = map(i, 0, 400, -1, 1);
			let x = x0,
				y = y0;
			let maxIteration = 100,
				iteration = 0;
			while (iteration < maxIteration) {
				if (x0 ** 2 + y0 ** 2 > 4) break;
				let xSqr = x0 ** 2 - y0 ** 2,
					ySqr = 2 * x0 * y0;
				x0 = xSqr + x;
				y0 = ySqr + y;
				iteration++;
			}
			let p = 400 * 4 * i + 4 * j;
			if (iteration == maxIteration) {
				pixels[p] = 255;
				pixels[p + 1] = 255;
				pixels[p + 2] = 255;
				pixels[p + 3] = 255;
			}
		}
	}
	updatePixels();
}
