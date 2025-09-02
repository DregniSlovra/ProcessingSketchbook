class Ball {
    // constructor() {
    //     this.pos = createVector(random(width), random(height));
    //     this.size = random(10, 30);
    //     this.maxspd = 5;
    //     this.speed = createVector(random(-this.maxspd, this.maxspd), random(-this.maxspd, this.maxspd));
    //     this.acc_cap = 1;
    //     this.acceleration = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    // }
    constructor(pos, size, maxspd, speed, acc_cap) {
        this.pos = pos;
        this.size = size;
        this.maxspd = maxspd;
        this.speed = speed;
        this.acc_cap = acc_cap;
        this.acceleration = createVector(random(-acc_cap, acc_cap), random(-acc_cap, acc_cap));
    }

    move() {
        this.pos.add(this.speed);

        if (this.pos.x < 0 || this.pos.x > width) {
            this.speed.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > height) {
            this.speed.y *= -1;
        }
    }

    accelerate() {
        this.speed.add(this.acceleration);

        if (this.speed.x > this.maxspd) {
            this.speed.x = this.maxspd;
        } else if (this.speed.x < -this.maxspd) {
            this.speed.x = -this.maxspd;
        }

        if (this.speed.y > this.maxspd) {
            this.speed.y = this.maxspd;
        } else if (this.speed.y < -this.maxspd) {
            this.speed.y = -this.maxspd;
        }
    }

    random_acc() {
        this.acceleration = createVector(random(-this.acc_cap, this.acc_cap), random(-this.acc_cap, this.acc_cap));
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    live() {
        this.random_acc();
        this.accelerate();
        this.move();
        this.show();
    }
}