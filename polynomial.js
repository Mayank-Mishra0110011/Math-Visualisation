//             **>>		This is a seperate sketch for now		<<**

var degree, coeff = [], temp = [], x = '', xfield = undefined, fout, y = [], eval;
const reg = /^\d+$/;

function setup() {
	createCanvas(windowWidth, windowHeight);
	degree = createInput();
	degree.style('width', '50px');
	degree.position(340, 32);
	eval = createButton("Plot");
	eval.position(400, 190);
	eval.style('width', '50px');
	eval.mousePressed(plot);
	eval.hide();
}

function draw() {
	background(150, 150, 150);
	textSize(20);
	text("Enter the degree of the polynomial : ", 10, 50);
	if (reg.test(degree.value()) && coeff.length == 0) {
		definePolynomial(degree.value());
		eval.show();
	}
	else
	if (degree.value() == '' && coeff.length != 0) {
		for (let i = 0; i < coeff.length; i++) {
			coeff[i].remove();
		}
		xfield.remove();
		xfield = undefined;
		flag = false;
		x = '';
		for (let i = 0; i < temp.length; i++) {
			temp[i].remove();
		}
		temp = [];
		coeff = [];
		y = [];
		eval.hide();
	}
	if (coeff.length > 0) {
		writeEquation();
		getX();
	}
	if (reg.test(degree.value())) {
		xyPlane();
		graph();
	}
	if (x != '') {
		evaluate();
	}
}

function plot() {
	y = [];
	for (let i = -300; i <= 300; i++) {
		x = i;
		evaluate();
		y.push(fout);
	}
	x = '';
	let yx = [];
	let low = min(y);
	let high = max(y);
	y.forEach(y => {
		yx.push(map(y, low, high, 300, 600));
	});
	y = yx;
}

function graph() {
	let tx = 0;
	y.forEach(y => {
		point(tx, y);
		tx++;
	});
}

function xyPlane() {
	line(300 , 300, 300, 600);
	line(0 , 450, 600, 450);
}

function getX() {
	text("Enter value of x : ", 10, 210);
	if (xfield == undefined) {
		xfield = createInput();
		xfield.position(200, 190);
		xfield.input(updateX);
	}
}

function updateX() {
	x = parseFloat(xfield.value());
}

function definePolynomial(deg) {
	var x = 10;
	for (let i = parseInt(deg) + 1; i > 0; i--) {
		let e = createInput();
		e.style('width', '20px');
		e.position(x, 90);
		e.mouseClicked(plot);
		coeff.push(e);
		if (i == 2) {
			let p = createDiv('x<sup></sup>');
			p.position(x + 30, 90);
			coeff.push(p);
		}
		else
		if (i > 1) {
			let p = createDiv('x<sup>'+(i-1)+'</sup>');
			p.position(x + 30, 90);
			coeff.push(p);
		}
		x += 55;
	}
}

function writeEquation() {
	for (let i = 0; i < temp.length; i++) {
		temp[i].remove();
	}
	temp = [];
	var x = coeff[coeff.length - 1].x + 50;
	text("Polynomial : ", x + 50, 110);
	x += 200;
	for (let i = 0; i < coeff.length; i++) {
		let p;
		if (coeff[i].elt.type == 'text') {
			if (i == 0) {
				p = createDiv(coeff[i].value());
			}
			else
			if (coeff[i].value()[0] != '-') {
				p = createDiv('+ ' + coeff[i].value());
			}
			else {
				p = createDiv(coeff[i].value());
			}
			p.position(x, 94);
		}
		else {
			p = createDiv(coeff[i].elt.innerHTML);
			p.position(x, 90);
		}
		temp.push(p);
		x += 20;
	}
}

function evaluate() {
	var ans = 0.0;
	var a, b;
	for (var i = 0; i < coeff.length - 1; i++) {
		if (i % 2 == 0) {
			a = evaluateInput(i);
		}
		else {
			b = evaluateDiv(i);
			ans += (a * b);
		}
	}
	ans += evaluateInput(i);
	fout = ans;
	text("Answer : " + ans, 10, 250);
}

function evaluateDiv(i) {
	if (coeff[i].elt.innerText.length == 1) {
		return x;
	}
	else {
		return pow(x, parseInt(coeff[i].elt.innerText[1]));
	}
}

function evaluateInput(i) {
	if (coeff[i].value() == '') {
		if (i == coeff.length - 1) {
			return 0;
		}
		else {
			return 1;
		}
	}
	else {
		return parseFloat(coeff[i].value());
	}
}
