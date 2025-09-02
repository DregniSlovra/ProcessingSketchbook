/*
 * @name Multiple Lights
 * @arialabel Rotating iridescent cube on the left of the screen and an iridescent sphere on the right. The user’s mouse acts as a light illuminating the shapes and can control the direction of the light
 * @description All types of lights could be used in one sketch.
 */

let cam;
let oldmouse;
let mouse_caught;

function setup() {
  createCanvas(800, 800, WEBGL);

  describe(
    'a 3d example containing a spinning box and a sphere, each lit with a number of different lights, including ambient (gray), directional (red), spotlight (green), and point (blue).'
  );

  cam = createCamera();
  cam.setPosition(0, 0, 1000);
  cam.lookAt(0, 0, 0);
  oldmouse = createVector(mouseX, mouseY, 0);
}

function look() {
  let panner = createVector(mouseX - oldmouse.x, mouseY - oldmouse.y, 0);
  if (panner.x > 0 || panner.x < 0) {
    cam.pan(-panner.x * 0.005);
    print("x: "+ str(panner.x * 0.005));
  }
  if (panner.y > 0 || panner.y < 0) {
    cam.tilt(panner.y * 0.005);
    print("y: "+ str(panner.y * 0.005));
  }
  cam.upX = 0;
  cam.upY = 1;
  cam.upZ = 0;
  oldmouse.set(mouseX, mouseY, 0);
}

function draw() {
  background(0);
  orbitControl();

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  // ambient light is gray
  ambientLight(25);
  // directional light is red
  directionalLight(255, 0, 0, 0.5, 0.5, 0.25);
  // spotlight is green
  spotLight(0, 255, 0, width/4, 0, 250, 0, 0, -1, PI, 1);
  // point light is blue
  pointLight(0, 0, 255, locX, locY, 150);
  let x = cos(frameCount * 0.005)/1000;
  // print("x: "+ str(x));
  // cam.pan(x);
  // if (mouse_caught) {
  //   look();
  // } else {
  //   push();
  //   translate(-width / 2, -height / 2, 0);
  //   rect(width/2-50, height/2-50, 100, 100);
  //   pop();
  // }

  // camera(0, 0, 1000, mouseX-width/2, mouseY-height/2, 0)
  // rotateX(mouseY/100);
  // rotateY(mouseX/100);

  push();
  translate(-width / 4, 0, 0);
  rotateZ(frameCount * 0.02);
  rotateX(frameCount * 0.02);
  specularMaterial(250);
  box(100, 100, 100);
  pop();

  push();
  translate(width / 4, 0, 0);
  rotateY(frameCount * -1);
  specularMaterial(250);
  shininess(100);
  stroke(0);
  strokeWeight(1);
  sphere(120, 24);
  pop();

  push();
  translate(0, height/4, 0);
  rotateY(frameCount * 0.01);
  ambientMaterial(250);
  noStroke();
  torus(100, 10, 8, 10);
  pop();

  push();
  translate(0, height/2, 0);
  rotateX(PI/2);
  plane(1000, 1000);
  pop();

  push();
  fill(255);
  rotateX(frameCount * 0.01);
  ellipse(0, 0, 50, 50);
  pop();
}

function mouseClicked() {
  if (!mouse_caught && mouseX > width/2 - 50 && mouseX < width/2 + 50 && mouseY > height/2 - 50 && mouseY < height/2 + 50) {
    mouse_caught = true;
    print("caught");
  }
  else if (mouse_caught) {
    mouse_caught = false;
  }
  print(mouseX, mouseY);
  oldmouse.set(mouseX, mouseY, 0);
}