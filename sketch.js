var w, h, scl = 20;
var circles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	w = windowWidth;
	h = windowHeight;
	circle = new Circle(100, 1);
	circles.push(circle);
	circle = new Circle(100, 10);
	circles.push(circle);
}

function draw() {
	background(30, 144, 255);
	translate(w/2, h/2);
	circles.forEach(circle => {
		circle.drawRadius();
		circle.drawSinWave();
		circle.drawCosWave();
		circle.drawTanWave();
	});
	xyPlane();
	scale(scl);
}

function Circle(r, v) {
	this.r = r;
	this.speed = v;
	this.x = -w / 4;
	this.y = 0;
	this.deg = 0;
	this.angle = 0;
	this.drawCircle = function() {
		fill(30, 144, 255);
		ellipse(this.x, this.y, 200);
	}
	this.drawRadius = function() {
		this.angle = this.deg * (PI / 180);
		line(this.x, this.y, this.x + this.r * cos(this.angle), this.y + this.r * sin(this.angle));
		if (this.deg == -360) {
			this.deg = 0;
		}
		this.deg -= this.speed;
	}
	this.drawSinWave = function() {
		let y;
		let amp = this.r;
		let tempAngle = this.angle;
		for (let x = 0; x <= w; x += 0.5) {
			y = map(sin(tempAngle), 1, -1, 0 - amp, 0 + amp);
			point(x, y);
			tempAngle += 0.01;
		}
	}
	this.drawCosWave = function() {
		let y;
		let amp = this.r;
		let tempAngle = this.angle;
		for (let x = 0; x <= w; x += 0.5) {
			y = map(cos(tempAngle), 1, -1, 0 - amp, 0 + amp);
			point(x, y);
			tempAngle += 0.01;
		}
	}
	this.drawTanWave = function() {
		let y;
		let amp = this.r;
		let tempAngle = this.angle;
		for (let x = 0; x <= w; x += 0.5) {
			y = map(tan(tempAngle), 1, -1, 0 - amp, 0 + amp);
			point(x, y);
			tempAngle += 0.01;
		}
	}
}

function xyPlane() {
	fill(0);
	strokeWeight(1);
	for (let i = 0; i < w; i+=scl) {
		line(i, 0, i, h);
		line(i, 0, i, -h);
		line(-i, 0, -i, h);
		line(-i, 0, -i, -h);
		line(0, i, w, i);
		line(0, i, -w, i);
		line(0, -i, w, -i);
		line(0, -i, -w, -i);
	}
	strokeWeight(3);
	line(-w, 0, w, 0);
	line(-w / 4, -h, -w / 4, h);
	line(0, -h, 0, h);
}

function keyTyped() {
	if (key === 'a') {
		scl += 0.5;
		circles.forEach(circle => {
			circle.r += 10;
		})
	}
	else
	if (key === 'd') {
		scl -= 0.5;
		circles.forEach(circle => {
			circle.r -= 10;
		})
	}
}
