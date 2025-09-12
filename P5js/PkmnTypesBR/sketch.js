let type_img;
let logo_w = 266;
let logo_h = 247;
let balls = [];

let fighting_time = 5*60;
let timer = fighting_time;
let summaries = [];
let simulating = true;
let arena_size = 800;
let typeCounts = [];

function preload() {
  type_img = loadImage(`types_logo.png`);
}

function reset_population() {
  for (let i = 0; i < 10000; i++) {
    let ball_size = 25;
    balls.push(new TypeBall(int(random(0, 18)), int(random(0, 18)), createVector(random(ball_size, arena_size - ball_size), random(ball_size, arena_size - ball_size)), ball_size, 5, createVector(random(-5, 5), random(-5, 5)), 0.1));
  }
}

function log_single_type_summaries() {
  noStroke();
  fill(100);
  rect(800, 0, 400, 800);
  fill(255);
  textSize(16);
  typeCounts = [];
  for (let item of summaries) {
    let found1 = typeCounts.find(entry => entry.type === item.type[0]);
    if (!found1)
      typeCounts.push({type: item.type[0], count: item.count});
    else
      found1.count += item.count;
    let found2 = typeCounts.find(entry => entry.type === item.type[1]);
    if (!found2)
      typeCounts.push({type: item.type[1], count: item.count});
    else
      found2.count += item.count;
  }
  typeCounts.sort((a, b) => b.count - a.count);
  let totalCount = typeCounts.reduce((sum, item) => sum + item.count, 0);
  let y_start = 0;
  for (let item of typeCounts) {
    fill(255);
    text("Total: " + totalCount, 810, 80);
    fill(type_colors[item.type][0], type_colors[item.type][1], type_colors[item.type][2]);
    let percentage = ((item.count / totalCount) * 100).toFixed(2);
    let deviance = (percentage - (100 / 18)).toFixed(2);
    text(type_names[item.type] + ": " + item.count + " (" + percentage + "%) (" + str(deviance) + "%)", 810, 100 + (typeCounts.indexOf(item) * 20));
    fill(type_colors[item.type][0], type_colors[item.type][1], type_colors[item.type][2]);
    rect(1200, y_start, 200, (percentage / 100) * 800);
    y_start += (percentage / 100) * 800;
  }
}

function log_summaries() {
  fill(255);
  rect(810, 30, 300, 10);

  text("----- Summaries -----", 810, 60);
  summaries.sort((a, b) => b.count - a.count);
  let totalCount = summaries.reduce((sum, item) => sum + item.count, 0);
  if (totalCount > 1000)
  {
    fill(0, 255, 0);
  }
  text("Total count: " + totalCount, 810, 80);

  let y_start = 0;
  for (let item of summaries) {
    fill(255);
    let percentage = ((item.count / totalCount) * 100).toFixed(2);
    if (item.type[0] == item.type[1]) {
      fill(type_colors[item.type[0]][0], type_colors[item.type[0]][1], type_colors[item.type[0]][2]);
    }
    text("Types: " + type_names[item.type[0]] + ", " + type_names[item.type[1]] + ", Count: " + item.count + ", Percentage: " + percentage + "%", 810, 100 + (summaries.indexOf(item) * 20));
    fill(type_colors[item.type[0]][0], type_colors[item.type[0]][1], type_colors[item.type[0]][2]);
    rect(1200, y_start, 100, (percentage / 100) * 800);
    fill(type_colors[item.type[1]][0], type_colors[item.type[1]][1], type_colors[item.type[1]][2]);
    rect(1300, y_start, 100, (percentage / 100) * 800);
    y_start += (percentage / 100) * 800;
  }
}

function setup() {
  createCanvas(1400, 800);
  reset_population();
}

function draw() {
  fill(0);
  noStroke();
  rect(0, 0, arena_size, arena_size);
  noStroke();
  fill(100);
  rect(800, 0, 400, 800);
  log_single_type_summaries();
  noStroke();
  fill(255);
  textSize(16);
  text("Time left: " + int(timer/60) + " seconds", 810, 20);
  // log_summaries();
  if (timer <= 0)
  {
    let summary = [];
    for (let ball of balls) {
      let found = summary.find(item => item.type === ball.ptype);
      if (!found)
        summary.push({type: [ball.ptype, ball.ptype2], count: 1});
      else
        found.count++;
    }
    if (timer == 0) {
      summary.sort((a, b) => b.count - a.count);
      timer = fighting_time;
      reset_population();
      for (let entry of summary) {
        let found = summaries.find(item => item.type[0] === entry.type[0] && item.type[1] === entry.type[1]);
        if (!found)
          summaries.push({type: entry.type, count: entry.count});
        else
          found.count += entry.count;
      }
    }
    return;
  }
  timer -= 1;
  for (let ball of balls) {
    ball.live();
    for (let other of balls) {
      if (ball !== other && dist(ball.pos.x, ball.pos.y, other.pos.x, other.pos.y) < (ball.size + other.size) / 2) {
        if (fight(ball, other) === 1) {
          balls.splice(balls.indexOf(other), 1);
        } else {
          balls.splice(balls.indexOf(ball), 1);
        }
      }
    }
  }
}

function keyPressed() {
  if (key === ' ' && simulating) {
    timer = -1;
    simulating = false;
    console.log("Simulation stopped");
    log_summaries();
  } else if (key == ' ') {
    simulating = true;
    timer = fighting_time;
    reset_population();
  }
}
