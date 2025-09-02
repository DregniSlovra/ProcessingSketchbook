/*
 * @name 3D Tiling
 * @arialabel Tiling space with 3D cubes or octahedrons
 * @description Tiling space with 3D cubes or octahedrons with an added gradient.
 */

let tiles = [];
let tilesize = 0;
let selected = 143;
let font;

function setup() {
  createCanvas(800, 800, WEBGL);

  describe(
    'Tiling space with 3D cubes or octahedrons with an added gradient.',
  );

  tilesize = width < height ? width : height;
  camera(0, 0, -tilesize * 1.5); // Set the camera position
  // tiles = make_diamonds(width / 5, tilesize, 0.2);
  tiles = make_tiles(width / 5, tilesize, 0.2);
  tiles[selected].select();
  console.log(tiles);
  font = loadFont("assets/Montserrat-Regular.ttf");
}

function draw() {
  background(250);
  orbitControl();

  // ambient light is gray
  ambientLight(50);
  // directional light is green
  directionalLight(50, 255, 255, 0.5, 0.5, 0.25);
  // spotlight is green
  // spotLight(0, 255, 0, width/4, 0, 250, 0, 0, -1, PI, 1);
  // point light is blue
  // pointLight(0, 0, 255, width, height, 150);

  for (t of tiles) {
    t.display();
  }

  // Draw the cube that bounds the balls
  push();
  // specularMaterial(250);
  noFill();
  stroke(0);
  box(tilesize);
  pop();

  push();
  translate(-tilesize * 0.5 - 5, -tilesize * 0.5 - 5, -tilesize * 0.5 - 5);
  strokeWeight(5);
  stroke(255, 0, 0)
  line(0, 0, 0, tilesize, 0, 0);
  stroke(0, 255, 0)
  line(0, 0, 0, 0, tilesize, 0);
  stroke(0, 0, 255)
  line(0, 0, 0, 0, 0, tilesize);
  pop();

  textSize(32);
  textFont(font);
  push();
  translate(-tilesize * 0.5 - 5, -tilesize * 0.5 - 5, -tilesize * 0.5 - 5);
  rotateY(-PI);
  fill(255, 0, 0);
  text("X", 0, 0);
  pop();
  push();
  translate(-tilesize * 0.5 - 5, -tilesize * 0.5 - 5, -tilesize * 0.5 - 5);
  // rotateY(-PI/2);
  fill(0, 255, 0);
  text("Y", 0, 0);
  pop();
  push();
  translate(-tilesize * 0.5 - 5, -tilesize * 0.5 - 5, -tilesize * 0.5 - 5);
  rotateY(PI/2);
  fill(0, 0, 255);
  text("Z", 0, 0);
  pop();
}

function keyPressed() {
  console.log(tiles[selected])
  switch (key) {
    case ' ':
      tiles[selected].select();
      break;
    case '1':
    case '2':
    case '3':
    case '4':
      neigh = int(key) - 1;
      if (tiles[selected].hasNeighbour(neigh)) {
        tiles[selected].select();
        tiles[selected].neighbours[neigh].select();
      }
      break;
    case '6':
    case '7':
    case '8':
    case '9':
      neigh = int(key) - 2;
      if (tiles[selected].hasNeighbour(neigh)) {
        tiles[selected].select();
        tiles[selected].neighbours[neigh].select();
      }
      break;
    default:
      break;
  }
}