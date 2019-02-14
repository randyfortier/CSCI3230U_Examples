var centre = {x: 300, y: 200};
var radius = 150;

var width = 600;
var height = 400;

var xOffset;
var yOffset;

var deltaT = 0.01;
var t = 0.0;

var surface;
var ctx;
var id;


function drawLine(p1, p2, colour) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = colour;
  ctx.stroke();
}

function drawPoint(p, colour) {
  var radius = 3;

  ctx.beginPath();
  ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = colour;
  ctx.fill();
}

var animating = false;

function updateSpeed() {
  if (animating) {
    var speedSlider = document.getElementById('speed');
    var speed = 50000 / speedSlider.value;

    clearInterval(id);
    id = setInterval(drawFrame, speed);
  }
}

function stopAnimation() {
  animating = false;

  clearInterval(id);
}

function startAnimation() {
  var speedSlider = document.getElementById('speed');

  if (speedSlider.value == 0) {
    stopAnimation();
  } else {
    animating = true;
    var speed = 10000 / speedSlider.value;

    clearInterval(id);
    id = setInterval(drawFrame, speed);
  }
}

function updateT() {
  var tElement = document.getElementById('t');
  tElement.innerHTML = 't: ' + t.toFixed(2);
}

function drawFrame() {
    if (t > 0.99999) {
        clearInterval(id);
    } else {
      t += deltaT;
      updateT();
      redraw();
    }
}

function interpolatePoint(centre, radius, t) {
  angle = t * Math.PI * 2;

  x = 10 * (16 * Math.pow(Math.sin(angle), 3));
  y = -10 * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

  return {x: x + xOffset, y: y + yOffset};
}

function redraw() {
  ctx.clearRect(0, 0, width, height);

  // draw the centre point
  drawPoint(centre, '#0000FF');

  // draw the gray in-between lines
  var prevPt = null;
  for (var currentT = 0.0; currentT < t; currentT += deltaT) {
    // find the points on the lines between the control points

    var pt = interpolatePoint(centre, radius, currentT);
    if (prevPt) {
      drawLine(prevPt, pt, '#5050A0');
    }

    drawLine(centre, pt, '#5050A0');  // line to centre
    drawPoint(pt, '#A05050');

    prevPt = pt;
  }

  if (t > 0.0) {
    // draw the most recent line
    var newPt = interpolatePoint(centre, radius, t);
    drawLine(centre, newPt, '#5050A0');   // line to centre
    drawLine(prevPt, newPt, '#0000FF');

    // draw the curve point for this line
    drawPoint(newPt, '#FF0000');
  } else {
    var pt = interpolatePoint(centre, radius, currentT);
    drawLine(centre, pt, '#5050A0');  // line to centre
    drawPoint(pt, '#A05050');
  }
}

window.onload = function() {
  xOffset = width / 2;
  yOffset = height / 2;

  surface = document.getElementById("surface");
  ctx = surface.getContext("2d");

  t = 0.0;
  updateT();
  redraw();

  var speedSlider = document.getElementById('speed');
  speedSlider.oninput = function() {
    updateSpeed();
  };

  stopAnimation();
  var stopGoButton = document.getElementById('stopgo');
  stopGoButton.onclick = function() {
    if (stopGoButton.textContent === 'Stop') {
      stopAnimation();
      stopGoButton.textContent = 'Go';
    } else {
      startAnimation();
      stopGoButton.textContent = 'Stop';
    }
  };
  var nextButton = document.getElementById('next');
  nextButton.onclick = function() {
    t += deltaT;
    if (t > 1.0) {
      t = 1;
    }
    updateT();
    redraw();
  };
  var prevButton = document.getElementById('prev');
  prevButton.onclick = function() {
    t -= deltaT;
    if (t < 0.0) {
      t = 0;
    }
    updateT();
    redraw();
  };
};
