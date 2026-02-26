let ws = 900;
let hs = 900;
let grid;
let colrow = 20;
let bomb_density = 0.20;
let difficulty = "";

let wins = 0;
let losses = 0;

let playing = false;
let timescore = 0;
let pointscore = 0;
let highscores = [];

function addTimeHighscore() {
  if (highscores.length < 5) {
    highscores.push(timescore);
    highscores.sort((a, b) => a - b);
    highscores = highscores.slice(0, 5);
    saveScores();
    return;
  }
  if (highscores.length === 5 && timescore < highscores[4]) {
    highscores[4] = timescore;
    highscores.sort((a, b) => a - b);
    saveScores();
  }
}

function saveScores() {
  localStorage.setItem('high_scores'+difficulty, JSON.stringify(highscores));
  localStorage.setItem('wins'+difficulty, wins);
  localStorage.setItem('losses'+difficulty, losses);
}

function resetScores() {
  highscores = [];
  wins = 0;
  losses = 0;
  saveScores();
}

function loadScores() {
  highscores = JSON.parse(localStorage.getItem('high_scores'+difficulty)) || [];
  wins = localStorage.getItem('wins'+difficulty) || 0;
  losses = localStorage.getItem('losses'+difficulty) || 0;
}

function setup() {
  createCanvas(ws + 200, hs);
  background(200);
  grid = new Grid(colrow, colrow, height / colrow, colrow * colrow * bomb_density);
  difficulty = '_' + String(bomb_density) + '_' + String(colrow);
  pointscore = 0;
  loadScores();
  grid.start_opening();
}

function draw() {
  background(200);
  if (keyIsPressed && key === 'z') {
    grid.pressed(mouseX, mouseY);
  }
  grid.show();
  if (playing) {
    timescore += deltaTime / 1000;
  }
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text('Bomb density: ', width - 180, 40, 160, 40);
  text((bomb_density * 100).toFixed(0) + '%', width - 180, 80, 160, 40);
  text('Size: ' + (colrow + '*' + colrow), width - 180, 120, 160, 40);
  text('Bombs : ' + grid.bomb_amount, width - 180, 160, 160, 40);
  text('Marks: ' + grid.mark_amount, width - 180, 200, 160, 40);
  // text('Next Hint : ' + grid.hinted, width - 180, 240, 160, 40);
  text('Hints : ' + grid.hints + "(" + pointscore + ")", width - 180, 240, 160, 40);
  text('Time: ', width - 180, 280, 160, 40);
  // text(timescore.toFixed(2), width - 180, 240, 160, 40);
  display_text_time(timescore, createVector(width - 180, 320), "", LEFT, TOP);
  text('Wins: ' + wins, width - 180, 360, 160, 40);
  text('Losses: ' + losses, width - 180, 400, 160, 40);
  text('Highscores: ', width - 180, 440, 160, 40);
  for (let i = 0; i < highscores.length; i++) {
    // text(highscores[i].toFixed(2), width - 180, 440 + i * 40, 160, 40);
    display_text_time(highscores[i], createVector(width - 180, 480 + i * 40), "", LEFT, TOP);
  }
}

function mousePressed() {
  if (playing) {
    grid.pressed(mouseX, mouseY);
  }
}

function mouseReleased() {
  if (playing) {
    grid.reveal(mouseX, mouseY);
  }
  if (!playing) {
    playing = true;
  }
}

function keyPressed() {
  if (key === ' ') {
    grid.initCells();
    grid.start_opening();
  }
  if (key === 'd') {
    grid.mark(mouseX, mouseY);
  }
  if (key === 'R') {
    resetScores();
  }
  if (key === 'h') {
    grid.showHints();
  }
}

function keyReleased() {
  if (key === 'z') {
    if (!playing) {
      playing = true;
    }
    grid.reveal(mouseX, mouseY);
  }
}


function display_text_time(time, pos, prefix="", alignmentW=CENTER, alignmentH=CENTER) {
  let s = int(time%60);
  let m = int(time/60);
  let h = int(m/60);
  textAlign(alignmentW, alignmentH);
  text(prefix + (h >= 1 ? h + " : " : '') + (m >= 1 ? (m - h*60) + " : " : '') + s, pos.x, pos.y);
}
