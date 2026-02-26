let time_elapsed = 0;
let score = 0;
let scored = false;
let missed = 0;
let high_score = 0;
let text_scored = "";

function preload() {
  high_score = localStorage.getItem('high_score_zen') || 0;
}

function setup() {
  createCanvas(800, 800);
  background(0);
}

function display_times() {
  for (i = 0; i < 12; i++) {
    let angle = map(i, 0, 4, -PI/2, TWO_PI - PI/2);
    // let angle = map(i, 0, 12, -PI/2, TWO_PI - PI/2);
    let x = width / 2 + cos(angle) * 300;
    let y = height / 2 + sin(angle) * 300;
    fill(255);
    // textSize(32);
    // textAlign(CENTER, CENTER);
    // text(i + 1, x, y);
    noStroke();
    ellipse(x, y, 25, 25);
  }
}

function display_hand() {
  let s = second();
  let m = 1000/(millis()%1000);

  let second_angle = map(s, 0, 60, -PI/2, TWO_PI - PI/2);


  // Draw second hand
  // noFill();
  // stroke(255);
  // let second_x = width / 2 + cos(second_angle) * 250;
  // let second_y = height / 2 + sin(second_angle) * 250;
  // line(width / 2, height / 2, second_x, second_y);
  push();
  translate(width / 2, height / 2);
  rotate(second_angle);
  noStroke();
  fill(255);
  ellipse(0, 0, 25, 25);
  rect(-5, -5, 10, 250, 10);
  fill(255-255/m, 255/m, 0);
  rect(-5, -5, 10, 1+249/m, 10);
  pop();
}

function display_text_time(time, c, pos, prefix="", alignmentW=CENTER, alignmentH=CENTER) {
  let s = time%60;
  let m = int(time/60);
  let h = int(m/60);
  fill(c);
  textSize(32);
  textAlign(alignmentW, alignmentH);
  text(prefix + (h >= 1 ? h + " : " : '') + (m >= 1 ? m - h*60 + " : " : '') + s, pos.x, pos.y);
}

function display_score()
{
  textSize(32);
  textAlign(CENTER, CENTER);
  if (scored) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  let c = color(255);
  display_text_time(score, c, createVector(width/2, height-50));
  display_text_time(time_elapsed, c, createVector(width/2, 50));
  display_text_time(missed, c, createVector(50, 50), "Missed : ", LEFT);
  display_text_time(high_score, c, createVector(50, 100), "Highest : ", LEFT);
  if (text_scored == "Good !") {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  textAlign(RIGHT);
  text(text_scored, width - 50, 50);
}

function draw() {
  background(0);
  display_times();
  display_hand();
  display_score();
  if (frameCount % 60 == 54) {
    scored = false;
    time_elapsed ++;
  }
  if (frameCount % 60 == 6 && scored == false) {
    text_scored = "Missed !";
  }
}

function keyPressed() {
  if (key === ' ') {
    if (frameCount % 60 >= 55 || frameCount % 60 <= 5) {
      score++;
      high_score = max(high_score, score);
      localStorage.setItem('high_score_zen', high_score);
      scored = true;
    } else {
      scored = false;
    }
  }
  if (scored)
  {
    text_scored = "Good !";
  } else if (frameCount % 60 > 6 && frameCount % 60 <= 30) {
    missed += 1;
    text_scored = "Too late !";
  } else {
    missed += 1;
    text_scored = "Too early !";
  }
  if (key == '+') {
    time_elapsed += 60;
    score += 60;
  }
  if (key == 'r') {
    score = 0;
  }
  if (key == 'R') {
    localStorage.setItem('high_score_zen', 0);
    high_score = 0;
  }
}