function setup() {
  createCanvas(800, 800);
  background(150, 147, 145);
  fill(25, 25, 35, 100);
  rect(0, 0, width, height);
}

function draw() {
  background(150, 147, 145, 5);
  strokeWeight(random(10, 25));
  stroke(25, 25, 35, 100);
  let drops = random(0, 25);
  for (let i = 0; i < drops; i++) {
    point(random(width), random(height));
  }
}
