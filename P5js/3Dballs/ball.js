class Ball {
    constructor(x, y, z, spdx, spdy, spdz, r, cubesize, color) {
        this.pos = createVector(x, y, z);
        this.spd = createVector(spdx, spdy, spdz);
        this.r = r;
        this.cubesize = cubesize;
        this.color = color;
        this.angle = createVector(random(TWO_PI), random(TWO_PI), random(TWO_PI));
    }

    move() {
        // Bounce off the walls
        if (this.pos.x + this.r > this.cubesize || this.pos.x - this.r < -this.cubesize) {
            this.spd.x *= -1;
        }
        if (this.pos.y + this.r > this.cubesize || this.pos.y - this.r < -this.cubesize) {
            this.spd.y *= -1;
        }
        if (this.pos.z + this.r > this.cubesize || this.pos.z - this.r < -this.cubesize) {
            this.spd.z *= -1;
        }
        // Update position
        this.pos.add(this.spd);
        this.angle.add(this.spd.copy().mult(0.05));
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        rotateX(this.angle.x);
        rotateY(this.angle.y);
        rotateZ(this.angle.z);
        specularMaterial(250);
        shininess(10);
        noStroke();
        fill(this.color);
        // sphere(this.r, 24);
        // sphere(this.r, 2, 2);
        sphere(this.r, 4, 2);
        // box(this.r);
        pop();
    }

    live() {
        this.move();
        this.display();
    }
}