function make_cube(x, y, z, size, weightFactor) {
    xratio = (x + tilesize / 2) / tilesize;
    yratio = (y + tilesize / 2) / tilesize;
    zratio = (z + tilesize / 2) / tilesize;
    let res = new Cube(x, y, z,
        size,
        color(255 * xratio, 255 * yratio, 255 * zratio, 150),
        weightFactor
    );
    return res;
}

function make_cubes(step, tilesize, weightFactor) {
    let res = [];
    for (let x = step / 2; x < tilesize; x = x + step) {
        for (let y = step / 2; y < tilesize; y = y + step) {
            for (let z = step / 2; z < tilesize; z = z + step) {
                res.push(make_cube(x - tilesize / 2,
                    y - tilesize / 2,
                    z - tilesize / 2,
                    step,
                    weightFactor
                ));
            }
        }
    }
    return res;
}

class Cube {
    constructor(x, y, z, r, color, weightFactor = 0.1) {
        this.pos = createVector(x, y, z);
        this.r = r;
        this.color = color;
        this.weight = r * weightFactor;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        specularMaterial(250);
        shininess(100);
        strokeWeight(this.weight * 0.75);
        stroke(this.color);
        // fill(this.color);
        noFill();
        box(this.r - this.weight,
            this.r - this.weight,
            this.r - this.weight);
        pop();
    }
}