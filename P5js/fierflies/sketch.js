function sort_flies(a, b) {
  return a.size > b.size ? 1 : -1;
}

var flies = [];
let bg;
let Patches = [];
let moon;
function preload() {
  bg = loadImage("assets/moon_bg.jpg");
  // moon = loadImage("assets/moon.png");
}

function setup() {
  createCanvas(1468, 764);
  // bg = moonlit_ground();
  fs = fullscreen();
  fullscreen(!fs);
  fullscreen(!fs);
  frameRate(15);
  for (i = 0; i < 500; ++i) {
    flies.push(new Firefly());
  }
  for (let i = 0; i < 6; i++) {
    let patch = new Patch(500);
    Patches.push(patch);
  }
}

function draw() {
  background(50);
  image(bg, 0, 0, width, height);
  for (var ball of flies) {
    ball.live();
  }
  flies.sort(sort_flies);
  for (let patch of Patches) {
    patch.live();
  }
}
