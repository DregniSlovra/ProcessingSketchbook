var podium = 5;
var ball_pop;
var scoreboard;
// var foods = [];

var state = "start";

function init_balls() {
  ball_pop = new BallPopulation(
    20, // Population length
    50, // Ball max size
    25); // Ball min size
  scoreboard = new Scoreboard(createVector(50, 10), createVector(width - 100, 20));
}

function init_foods() {
  foods = [];
  for (var i = 0; i < ball_pop.length * 4; i++) {
    foods.push(new Ball(
      0,
      createVector(random(ball_pop.max_size, width- ball_pop.max_size), random(ball_pop.max_size, height - ball_pop.max_size)),
      createVector(0, 0),
      5,
      color(255, 255, 255)
    ));
  }
}

function setup() {
  createCanvas(900, 900);
  background(0);
  init_balls();
  // init_foods();
}

function batlle() {
  // for (var food of foods) {
  //     food.show();
  // }
  ball_pop.fight();
  ball_pop.live();
  if (ball_pop.check_end(podium)) {
    state = "end";
  }
}

function show_all(showId = false, showSpeed = false) {
  // for (var food of foods) {
  //   food.show();
  // }
  ball_pop.show(showId, showSpeed);
}

function draw() {
  background(90, 100, 110);
  switch (state) {
    case "init":
      init_balls();
      init_foods();
      state = "start";
      break;
    case "start":
      show_all(true, true);
      break;
    case "battle":
      batlle();
      break;
      case "pause":
      show_all(true);
    case "end":
      show_all(true);
      scoreboard.winners(ball_pop);
      break;
    }
  scoreboard.show(ball_pop);
}

function mousePressed() {
  switch (state) {
    case "start":
      state = "battle";
      break;
    case "battle":
    case "pause":
    case "end":
      state = "init";
      break;
  }
}

function keyPressed() {
if (key === ' ') {
  switch (state) {
    case "battle":
      state = "pause";
    break;
    case "pause":
      state = "battle";
    break;
    }
  }
}