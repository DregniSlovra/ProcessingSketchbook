const sidesize = 200;
let img;
let rule = 0;
let ruleValue = 1;
let ruleA = null;
let ruleB = null;
let mesure = [];
let result = 'Not enough points or ruler not set.';

function preload() {
  img = loadImage('sample.jpg', img => { img }, tryPNG);
}

function tryPNG(event) {
  img = loadImage('sample.png', img => { img }, () => { console.error('Failed to load JPG and PNG'); });
}

function setup() {
  createCanvas(800 + sidesize, 800);
  let btn_reset = createButton('Reset');
  btn_reset.position(width-sidesize+19, 19);
  btn_reset.mousePressed(resetSketch);
  let rulerValue = createInput('Input how many units is the ruler');
  rulerValue.position(width-sidesize+19, 250);
  rulerValue.input(setRulerValue);
}

function resetSketch() {
  rule = 0;
  ruleA = null;
  ruleB = null;
  mesure = [];
}

function setRulerValue() {
  ruleValue = 1;
  if (float(this.value()) > 0) {
    ruleValue = float(this.value());
  }
  calculateDistance();
}

function calculateDistance() {
  if (mesure.length > 1 && rule > 0) {
    let total = 0;
    for (let i = 0; i < mesure.length - 1; i++) {
      total += dist(mesure[i].x, mesure[i].y, mesure[i + 1].x, mesure[i + 1].y);
    }
    let length = total / float(rule/ruleValue);
    result = 'Length is ' + float(length) + ' units';
  } else {
    result = 'Not enough points or ruler not set.';
  }
}

function draw() {
  background(0);
  textSize(16);
  noStroke();
  fill(255);
  text(result, width-sidesize+10, 100, sidesize-20, height-100);
  image(img, 0, 0, width-sidesize, height, 0, 0, img.width, img.height, CONTAIN);
  if (ruleA != null && ruleB != null) {
    stroke(0, 255, 0);
    line(ruleA.x, ruleA.y, ruleB.x, ruleB.y);
  }
  if (mesure.length > 0) {
    stroke(0, 0, 255);
    for (let i = 0; i < mesure.length - 1; i++) {
      line(mesure[i].x, mesure[i].y, mesure[i + 1].x, mesure[i + 1].y);
    }
  }
}

function mouseClicked() {
  if (mouseX > width-sidesize || mouseY > height) return;
  if (rule == 0)
  {
    if (ruleA == null)
    {
      ruleA = createVector(mouseX, mouseY);
      return;
    }
    ruleB = createVector(mouseX, mouseY);
    rule = dist(ruleA.x, ruleA.y, ruleB.x, ruleB.y);
    return;
  }
  mesure.push(createVector(mouseX, mouseY));
  calculateDistance();
}