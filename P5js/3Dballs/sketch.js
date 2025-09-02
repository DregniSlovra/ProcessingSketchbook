/*
 * @name 3D Balls
 * @arialabel Balls bouncing around in 3D
 * @description 3D balls screensaver
 */

let balls = [];
let cubesize;

function setup() {
  createCanvas(1920, 1200, WEBGL);

  describe(
    'A 3D balls screensaver that uses various lighting effects and camera controls. Click to catch the mouse and control the camera view.',
  );

  cubesize = width > height ? width : height;
  camera(0, 0, -cubesize * 0.5); // Set the camera position
  // camera(0, 0, -cubesize * 1.5); // Set the camera position
  for (let i = 0; i < 5000; i++) {
    let bsize = random(5, 25);
    let c = color(0);
    let ratio = random(100, 255);
    // let variation = 1;
    let variation1 = random(0.5, 1);
    let variation2 = random(0.5, 1);
    if (random(100) > 70)
    {
      c = color(ratio * variation1 * 0.4, 0, ratio * variation2);
    } else {
      c = color(0, ratio * variation1, ratio * variation2);
    }
    // c.setAlpha(100);
    balls.push(new Ball(
      random(-cubesize / 2 + bsize, cubesize / 2 - bsize),
      random(-cubesize / 2 + bsize, cubesize / 2 - bsize),
      random(-cubesize / 2 + bsize, cubesize / 2 - bsize),
      random(-3, 3),
      random(-3, 3),
      random(-3, 3),
      bsize,
      cubesize / 2,
      c
    ));
  }
}

function draw() {
  background(0);
  orbitControl();

  // ambient light is gray
  ambientLight(255);
  // directional light is green
  directionalLight(255, 255, 255, 0.5, 0.5, 0.25);
  // spotlight is green
  // spotLight(0, 255, 0, width/4, 0, 250, 0, 0, -1, PI, 1);
  // point light is blue
  // pointLight(0, 0, 255, width, height, 150);

  for (b of balls) {
    b.live();
  }

  // Draw the cube that bounds the balls
  push();
  // specularMaterial(250);
  noFill();
  stroke(255);
  // box(cubesize);
  pop();
}

function mouseClicked() {
  // When the mouse is clicked, it will catch the mouse and allow camera control
  for (b of balls) {
    b.spd.mult(-1); // Reverse the speed of the balls
  }
}

function keyPressed() {
  if (key === ' ') {
    saveCanvas('3D_balls', 'png');
  }
}