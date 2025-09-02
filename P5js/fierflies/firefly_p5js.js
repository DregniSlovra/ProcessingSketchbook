class Firefly {
  constructor() {
    this.size = random(2, 10);
    this.maxsize = random(5, 10);
    var r = random(0, 1000);
    if (r > 800) this.maxsize = random(10, 15);
    else if (r > 900) this.maxsize = random(15, 30);
    else if (r > 980) this.maxsize = random(30, 100);
    //if (random(0,100) > 90)
    //  this.size = random(5,20)
    this.x = random(this.size, width - this.size);
    this.y = random(this.size, height - this.size);
    this.speedx = random(-5, 5);
    this.speedy = random(-5, 5);
    this.accx = random(-1, 1);
    this.accy = random(-1, 1);
    this.c = color(random(150, 200), random(100, 150), random(150, 255));
    this.cm = random(5, 30);
    this.switching = 0;
  }

  live() {
    this.show();
    this.move();
    this.dir();
    this.acc();
    this.resize();
    this.light();
  }

  show() {
    let out = color(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.c.levels[3]-100);
    stroke(out);
    strokeWeight(3);
    fill(this.c);
    ellipse(this.x, this.y, this.size * 2, this.size * 2);
  }

  move() {
    if (
      this.x + this.speedx < this.size ||
      this.x + this.speedx > width - this.size
    )
      this.speedx *= -1;
    this.x += this.speedx;
    if (
      this.y + this.speedy < this.size ||
      this.y + this.speedy > height - this.size
    )
      this.speedy *= -1;
    this.y += this.speedy;
  }

  acc() {
    this.speedx += this.accx;
    this.speedy += this.accy;
  }

  dir() {
    var maxspd = this.size / 4;
    var maxacc = this.size / 16;
    if (this.speedx < maxspd && this.accx < maxacc)
      this.accx += random(0, maxacc);
    if (this.speedx > -maxspd && this.accx > -maxacc)
      this.accx += random((-maxacc * 94) / 100, 0);
    if (this.speedy < maxspd && this.accy < maxacc)
      this.accy += random(0, maxacc);
    if (this.speedy > -maxspd && this.accy > -maxacc)
      this.accy += random((-maxacc * 94) / 100, 0);
  }

  resize() {
    if (this.size < this.maxsize) this.size += random(0, 2);
    if (this.size > 1) this.size += random(-2, 0);
  }

  light() {
    if (
      this.switching === 0 &&
      ((this.cm < 0 && this.c.levels[3] <= this.cm) ||
        (this.cm > 0 && this.c.levels[3] >= 255 - this.cm))
    ) {
      if (this.cm < 0) this.switching = int(random(20, 100));
      this.cm *= -1;
    }
    if (this.switching === 0) {
      this.c.setAlpha(this.c.levels[3] + this.cm);
    }
    if (this.switching > 0) {
      this.switching -= 1;
    }
    //if ((this.cm < 0 && (this.c.levels[0] <= this.cm || this.c.levels[1] <= this.cm || this.c.levels[2] <= this.cm)) || (this.cm > 0 && (this.c.levels[0] >= 250 - this.cm || this.c.levels[1] >= 250 - this.cm || this.c.levels[2] >= 250 - this.cm)))
    //  this.cm *= -1
    //this.c.setRed(this.c.levels[0] + this.cm)
    //this.c.setGreen(this.c.levels[1] + this.cm)
    //this.c.setBlue(this.c.levels[2] + this.cm)
    //print(this.c)
  }
}
