/*
 * @name Reach 2
 * @arialabel Grey triangle segmented and attached to the bottom of the black screen. The tip of the triangle follows the direction of the user’s mouse
 * @frame 710,400
 * @description The arm follows the position of the mouse by calculating the
 * angles with atan2(). Based on code from Keith Peters.
 */

class Segment {
  constructor(length, color) {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.length = length;
    this.weight = 2;
    this.targetX = 0;
    this.targetY = 0;
    this.c = color;
  }

  reach(xin, yin) {
    let dx = xin - this.x;
    let dy = yin - this.y;
    this.angle = atan2(-dy, dx);
    this.targetX = lerp(this.targetX, xin - cos(this.angle) * this.length, 0.2);
    this.targetY = lerp(this.targetY, yin - sin(this.angle) * this.length, 0.2);
  }

  reposition(prev) {
    prev.x = this.x + cos(this.angle) * this.length;
    prev.y = this.y + sin(this.angle) * this.length;
  }

  display() {
    strokeWeight(this.weight);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    stroke(this.c);
    line(0, 0, this.length, 0);
    pop();
  }
}

class Leaf {
  constructor(length = 10) {
    this.length = length;
    this.segLength = 25;
    this.multiplier = 5;
    this.segments = [];
    // print(this.length, length);
    this.c = color(random(50, 100), random(150, 255), random(50, 150));
    this.c = color(
      lerp(this.c.levels[0], (length)*(this.c.levels[0]/10), 0.7),
      lerp(this.c.levels[1], (length)*(this.c.levels[1]/10), 0.7),
      lerp(this.c.levels[2], (length)*(this.c.levels[2]/10), 0.7)
    )
    for (let i = 0; i < this.length; i++) {
      this.segments[i] = new Segment(this.segLength, this.c)
    }
    this.segments[this.length - 1].x = width/2
    this.segments[this.length - 1].y = height
  }

  reach(tx, ty) {
    let prev = this.segments[0];
    prev.reach(tx, ty)
    for (let i = 1; i < this.length; i++) {
        let seg = this.segments[i];
        seg.reach(prev.targetX, prev.targetY)
        prev = seg;
      }
    }
  reposition() {
    for (let i = this.length - 1; i >= 1; i--) {
        this.segments[i].reposition(this.segments[i - 1]);
    }
  }
  display() {
    var weight = 1.5;
    for (var segment of this.segments) {
        segment.weight = weight;
        weight *= this.multiplier;
        segment.display();
    }
  }

  live(tx, ty) {
    this.reach(tx, ty);
    this.reposition();
    this.display();
  }
}

class Grass {
    constructor(amount = 500) {
        this.leaves = [];
        for (let i = 0; i < amount; i++) {
            let h = random(height/4);
            let length = int(random(1, 2)) + int(5 * (h / (height / 4)));
            // print(h, length);
            let leaf = new Leaf(length);
            // print(leaf.length)
            leaf.segments[leaf.length - 1].x = random(width);
            leaf.segments[leaf.length - 1].y = h + 3*height/4;
            leaf.multiplier = 1 + (h / height);
            this.leaves.push(leaf);
        }
    }

    live(tx, ty) {
        for (let leaf of this.leaves) {
            leaf.live(tx, ty);
        }
    }
}

class Patch {
  constructor(size) {
      this.grass = new Grass(size || 500);
      let pos = createVector(random(width/2) + width/4, height*4);
      let spd = createVector(random(-10, 10), 0);
      this.target = new Ball(pos, 5, 50, spd, 20);
  }

  live() {
      this.grass.live(this.target.pos.x, this.target.pos.y);
      this.target.live();
      this.target.pos.y = height * 5;
      this.target.speed.y = 0;
      if (this.target.pos.x < width/4) {
        this.target.pos.x = width/4;
        this.target.speed.x *= -1;
      }
      if (this.target.pos.x > width*3/4) {
        this.target.pos.x = width*3/4;
        this.target.speed.x *= -1;
      }
    }
}

// Patches = [];

// function setup() {
//   createCanvas(710, 400);
//   strokeWeight(20);
//   stroke(255, 100);

//   for (let i = 0; i < 5; i++) {
//     let patch = new Patch(300);
//     Patches.push(patch);
//   }
// }

// function draw() {
//   background(0);

//   for (let patch of Patches) {
//     patch.live();
//   }
// }
