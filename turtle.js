var canvas = document.querySelector('.myCanvas');
var width = canvas.width = (window.innerWidth / 2);
var height = canvas.height = (window.innerHeight / 2);
var lineLength = 300;
var ctx = canvas.getContext('2d');

// The model on which the drawing will be based
var drawModel = {
	iterations: 200,
	angle: 121,
	baseSegmentLength: 0,
	segmentLengthIncrement: 2.0,
	lineWidth: 1,
	color: {
		r: 60,
		g: 60,
		b: 60,
		a: 0.5
	},
	bgcolor: {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	}
};

// The UI elements that control the model, and are updated programmatically as needed
var controls = {
	iterations: {
		slider: document.getElementById("iterations-slider"),
		value: document.getElementById("iterations-slider-value")
	},
	angle: {
		slider: document.getElementById("angle-slider"),
		value: document.getElementById("angle-slider-value")
	},
	baseSegmentLength: {
		slider: document.getElementById("segment-base-length-slider"),
		value: document.getElementById("segment-base-length-slider-value")
	},
	segmentLengthIncrement: {
		slider: document.getElementById("segment-length-increment-slider"),
		value: document.getElementById("segment-length-increment-slider-value")
	},
	lineWidth: {
		slider: document.getElementById("line-width-slider"),
		value: document.getElementById("line-width-slider-value")
	},
	color: {
		r: {
			slider: document.getElementById("line-color-r-slider"),
			value:document.getElementById("line-color-r-slider-value")
		},
		g: {
			slider: document.getElementById("line-color-g-slider"),
			value:document.getElementById("line-color-g-slider-value")
		},
		b: {
			slider: document.getElementById("line-color-b-slider"),
			value:document.getElementById("line-color-b-slider-value")
		},
		a: {
			slider: document.getElementById("line-color-a-slider"),
			value:document.getElementById("line-color-a-slider-value")
		}
	},
	bgcolor: {
		r: {
			slider: document.getElementById("bg-color-r-slider"),
			value:document.getElementById("bg-color-r-slider-value")
		},
		g: {
			slider: document.getElementById("bg-color-g-slider"),
			value:document.getElementById("bg-color-g-slider-value")
		},
		b: {
			slider: document.getElementById("bg-color-b-slider"),
			value:document.getElementById("bg-color-b-slider-value")
		},
		a: {
			slider: document.getElementById("bg-color-a-slider"),
			value:document.getElementById("bg-color-a-slider-value")
		}
	}
};

var updateControlValuesFromSettings = function(drawModel) {
	// Use double assignment paradigm to guarantee that the model and slide counters are set to the same value
	controls.iterations.value.innerHTML = (controls.iterations.slider.value = drawModel.iterations);
	controls.angle.value.innerHTML = (controls.angle.slider.value = drawModel.angle);
	controls.baseSegmentLength.value.innerHTML = (controls.baseSegmentLength.slider.value = drawModel.baseSegmentLength);
	controls.segmentLengthIncrement.value.innerHTML = (controls.segmentLengthIncrement.slider.value = drawModel.segmentLengthIncrement);
	controls.lineWidth.value.innerHTML = (controls.lineWidth.slider.value = drawModel.lineWidth);
	controls.color.r.value.innerHTML = (controls.color.r.slider.value = drawModel.color.r);
	controls.color.g.value.innerHTML = (controls.color.g.slider.value = drawModel.color.g);
	controls.color.b.value.innerHTML = (controls.color.b.slider.value = drawModel.color.b);
	controls.color.a.value.innerHTML = (controls.color.a.slider.value = drawModel.color.a);
	controls.bgcolor.r.value.innerHTML = (controls.bgcolor.r.slider.value = drawModel.bgcolor.r);
	controls.bgcolor.g.value.innerHTML = (controls.bgcolor.g.slider.value = drawModel.bgcolor.g);
	controls.bgcolor.b.value.innerHTML = (controls.bgcolor.b.slider.value = drawModel.bgcolor.b);
	controls.bgcolor.a.value.innerHTML = (controls.bgcolor.a.slider.value = drawModel.bgcolor.a);
}

controls.iterations.slider.oninput = function() {
	drawModel.iterations = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.angle.slider.oninput = function() {
	drawModel.angle = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.baseSegmentLength.slider.oninput = function() {
	drawModel.baseSegmentLength = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.segmentLengthIncrement.slider.oninput = function() {
	drawModel.segmentLengthIncrement = parseFloat(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.lineWidth.slider.oninput = function() {
	drawModel.lineWidth = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.color.r.slider.oninput = function() {
	drawModel.color.r = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.color.g.slider.oninput = function() {
	drawModel.color.g = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.color.b.slider.oninput = function() {
	drawModel.color.b = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.color.a.slider.oninput = function() {
	drawModel.color.a = parseFloat(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.bgcolor.r.slider.oninput = function() {
	drawModel.bgcolor.r = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.bgcolor.g.slider.oninput = function() {
	drawModel.bgcolor.g = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.bgcolor.b.slider.oninput = function() {
	drawModel.bgcolor.b = parseInt(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

controls.bgcolor.a.slider.oninput = function() {
	drawModel.bgcolor.a = parseFloat(this.value);
	updateControlValuesFromSettings(drawModel);
	draw(drawModel);
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

function nextData(data, segmentData) {
	data.angle = data.angle + segmentData.angle;
	data.position.x = data.position.x + (segmentData.distance * Math.cos(degToRad(data.angle)));
	data.position.y = data.position.y + (segmentData.distance * Math.sin(degToRad(data.angle)));

	return data;
}

function draw(model) {
	// Clear the canvas
	ctx.clearRect(0, 0, width, height);

	// Set the background color
	ctx.beginPath();
	ctx.fillStyle = 'rgba(' + model.bgcolor.r + ', ' + model.bgcolor.g + ', ' + model.bgcolor.b + ', ' + model.bgcolor.a + ')';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fill();
	ctx.fillstyle='none';

	// Begin tracing the path
	ctx.beginPath();
	ctx.lineWidth = model.lineWidth;
	ctx.strokeStyle = 'rgba(' + model.color.r + ', ' + model.color.g + ', ' + model.color.b + ', ' + model.color.a + ')';

	// Set up tracking for the turtle's current position
	var currentData = {
		'position': {
			'x': (width)/2,
			'y': (height)/2
		},
		'angle': 0
	};

	// March the turtle around
	for (var i = 0; i < model.iterations; i++) {
		segmentInfo = {
			'angle': model.angle,
			'distance': model.baseSegmentLength + (model.segmentLengthIncrement * i)
		}

		currentData = nextData(currentData, segmentInfo);
		ctx.lineTo(currentData.position.x, currentData.position.y);
	}
	
	// Draw the turtle's path
	ctx.stroke();
}

updateControlValuesFromSettings(drawModel);
draw(drawModel);
