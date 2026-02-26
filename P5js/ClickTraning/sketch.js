let size = 50;
let timer_min = 2000;
let timer_max = 5000;
let timer_mod = 0.99;
let score = 0;
let timer = 0;
let target;
let target_delta = 0;
let mouseDelta = 0;
let old_mouse;
let efficiency = 0;
let efficiency_scores = [];
let missed = 0;
let missclicked = 0;
let target_time = 0;
let reaction_times = [];

let evaluation_score = 50;
let state = 0;

function setup() {
  createCanvas(800, 800);
  background(200);
  target = createVector(random(width), random(height));
  old_mouse = createVector(width/2, height/2);
}

function draw() {
  if (state == 0) {
    background(200);
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Click in the screen to start !", width / 2, height / 2);
    return
  }
  else if (state == 2) {
    noStroke();
    display_score();
    return
  }
  noStroke();
  display_score();
  fill(25, 35, 25);
  ellipse(target.x, target.y, size, size);
  stroke(0);
  line(old_mouse.x, old_mouse.y, mouseX, mouseY);
  if (timer > 0) {
    timer -= deltaTime;
  } else {
    timer = random(timer_min, timer_max);
    move_target();
    mouseDelta = 0;
    missed++;
  }
  mouseDelta += dist(mouseX, mouseY, old_mouse.x, old_mouse.y);
  old_mouse = createVector(mouseX, mouseY);
}

function display_score() {
  let texts = [
    "Score: " + score,
    "Missed: " + missed,
    "Missclicked: " + missclicked,
    "Accuracy: " + nf((score / (score + missed + missclicked)) * 100, 2, 0) + "%",
    "Target is " + nf(target_delta.mag(), 1, 0) + " px away from the last one",
    "Mouse moved: " + nf(mouseDelta, 1, 0) + " px",
    "Efficiency: " + nf(efficiency*100, 2, 0) + "%",
    "Efficiency average: " + nf(efficiency_scores.reduce((a, b) => a + b, 0) / efficiency_scores.length*100, 2, 0) + "%",
    "Time max: " + nf(timer_max / 1000, 1, 2),
    "Time min: " + nf(timer_min / 1000, 1, 2),
    "Time to click : " + nf((reaction_times.length > 0 ? reaction_times[reaction_times.length - 1] : 0), 1, 2) + " ms",
    "Time to click average: " + nf(reaction_times.reduce((a, b) => a + b, 0) / reaction_times.length, 1, 2) + " ms"
  ];
  fill(200)
  rect(0, 0, 300, texts.length * 20 + 10);
  let text_size = 16;
  textAlign(LEFT);
  let origin = createVector(10, 0);
  if (state == 2)
    {
      text_size = 32;
      origin = createVector(width/2, height/2 - (text_size / 2) * texts.length);
      textAlign(CENTER, CENTER);
    }
  textSize(text_size);
  for (let i = 0; i < texts.length; i++) {
    fill(0);
    if (i == 1 || i == 2) {
      fill(255, 0, 0);
    }
    text(texts[i], origin.x, origin.y + text_size * (i + 1));
  }
}

function move_target() {
  background(200);
  old = createVector(target.x, target.y);
  target = createVector(random(width), random(height));
  target_delta = p5.Vector.sub(target, old);
  target_time = millis();
}

function mousePressed() {
  if (state == 0) {
    state = 1;
    old_mouse = createVector(mouseX, mouseY);
    target = createVector(mouseX, mouseY);
    move_target();
    timer = random(timer_min, timer_max);
    timer_max = timer_max * timer_mod;
    timer_min = timer_min * (timer_mod+(score/100000));
    mouseDelta = 0;
    return;
  }
  else if (state == 2) {
    state = 0;
    score = 0;
    missed = 0;
    missclicked = 0;
    timer_min = 2000;
    timer_max = 5000;
    efficiency_scores = [];
    reaction_times = [];
    return;
  }
  let d = dist(mouseX, mouseY, target.x, target.y);
  if (d < size / 2) {
    efficiency = target_delta.mag() / mouseDelta;
    efficiency_scores.push(efficiency);
    // if (efficiency_scores.length > 20) {
    //   efficiency_scores.shift();
    // }
    reaction_times.push(millis() - target_time);
    move_target();
    score++;
    timer = random(timer_min, timer_max);
    timer_max = timer_max * timer_mod;
    timer_min = timer_min * (timer_mod+(score/100000));
    mouseDelta = 0;
    if (score + missed >= evaluation_score) {
      state = 2;
    }
  }
  else {
    missclicked++;
  }
}