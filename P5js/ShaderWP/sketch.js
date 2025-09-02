/*
 * @name Basic Shader
 * @arialabel Background with a cyan to purple gradient
 * @description This is a basic example showing how to load shaders in p5.js.
 * <br> To learn more about using shaders in p5.js: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.js Shaders</a>
 */

// this variable will hold our shader object
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('assets/basic.vert', 'assets/basic.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(800, 800, WEBGL);
  noStroke();
}

function draw() {
  // shader() sets the active shader with our shader
  shader(theShader);

  fill(255);
  stroke(255);
  background(0);
  // rect gives us some geometry on the screen
  //rect(100, 100, 100, 100);
  ellipse(-width/2 + 50, -height/2 + 50, 100, 100);
  //line(-width/2, -height/2, width/2, height/2);

}
