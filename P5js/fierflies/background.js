function moonlit_ground()
{
    background(0);
    let moon_size = 200;
    let moon_pos = createVector(3*width/4, height/6);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            stroke(50, 5000 / (dist(moon_pos.x, moon_pos.y, x, y)/4));
            strokeWeight(1);
            line(x, y, x, y);
        }
    }
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            stroke(255, 255 / (dist(moon_pos.x, moon_pos.y, x, y)/4));
            strokeWeight(1);
            line(x, y, x, y);
        }
    }
    image(moon, moon_pos.x - moon_size/2, moon_pos.y - moon_size/2, moon_size, moon_size);
    for (let i = 0; i < height/4; i++) {
        stroke(255, 150/(i/3));
        strokeWeight(1);
        line(0, 3*height/4-i, width, 3*height/4-i);
    }
    noStroke();
    fill(30,20,10);
    rect(0, height * 3/4, width, height/4);
    for (let i = 0; i < 10000; i++) {
        let ray = random(1, 10);
        let x = random(ray, width-ray);
        let y = random(height * 3/4 + ray, height - ray);
        fill(random(0, 50), random(0, 30), random(0, 20), random(100, 200));
        ellipse(x, y, ray, ray);
    }
    for (let i = 0; i < 5000; i++) {
        let x = random(width);
        let y = random(0, height * 3/4);
        noStroke();
        fill(random(200, 225), random(200, 255), random(200, 255));
        ellipse(x, y, 1.5, 1.5);
    }
    return get();
}

let bg;
let moon;

function preload()
{
    moon = loadImage("assets/moon.png");
}

function setup()
{
    createCanvas(1468, 764);
    bg = moonlit_ground();
    bg.save("moon_bg.jpg");
    image(bg, 0, 0);
}

function draw()
{
}