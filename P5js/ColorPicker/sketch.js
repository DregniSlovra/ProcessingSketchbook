let hsb = null;
let rgb = null;

function setup() {
  createCanvas(2800, 1000);
  lab = new ColorPickerLAB(createVector(0, 0), createVector(900, 1000), 10);
  rgb = new ColorPickerRGB(createVector(910, 0), createVector(900, 1000), 10);
  hsb = new ColorPicker(createVector(1820, 0), createVector(900, 1000), 10);
}

function draw() {
  background(0, 0, 0);
  hsb.display();
  rgb.display();
  lab.display();
  if (mouseIsPressed) {
    rgb.selectUpdate(mouseX, mouseY);
    hsb.selectUpdate(mouseX, mouseY);
    lab.selectUpdate(mouseX, mouseY);
  }
}
