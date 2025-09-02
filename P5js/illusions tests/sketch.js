const pixSize = 10;
const ratio = 4;
let bg;
let going = 0;
let pos;
let goer = 1;
let cycle = 60;
let apparition_time = 3;

function setup() {
  createCanvas(800, 800);
  background(0);
  // const c = color(255);
  // for (let i = pixSize/2; i < (width > height ? width : height); i += pixSize*ratio) {
  //   strokeWeight(pixSize);
  //   stroke(lerpColor(color(0), c, 0.25));
  //   line(i, 0, i, height);
  //   line(0, i, width, i);
  // }
  // for (let x = pixSize/2; x < width; x += pixSize*ratio) {
  //   for (let y = pixSize/2; y < height; y += pixSize*ratio) {
  //     fill(c);
  //     noStroke();
  //     rect(x-pixSize/2, y-pixSize/2, pixSize, pixSize);
  //   }
  // }
}

function preload() {
  bg = loadImage('illusion_bg.png');
}

function draw() {
  image(bg, 0, 0, width, height);
  if (going == 0)
  {
    pos = createVector(-pixSize,-pixSize);
  }
  going = goer + going;
  if (going == cycle)
  {
    pos = createVector(
      int(random(0, width/(ratio*pixSize)))*pixSize*ratio,
      int(random(0, height/(ratio*pixSize)))*pixSize*ratio
    );
  }
  if (going > cycle + apparition_time)
  {
    going = 0;
    cycle = int(randomGaussian(150, 100));
  }
  noStroke();
  fill(0, 190);
  rect(pos.x, pos.y, pixSize, pixSize);

}

function mouseClicked() {
  if (goer > 0)
  {
    goer = 0;
  }
  else
  {
    goer = 1;
  }
}