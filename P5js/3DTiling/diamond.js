function push_diamond(x, y, z, size, weightFactor) {
    xratio = (x + tilesize / 2) / tilesize;
    yratio = (y + tilesize / 2) / tilesize;
    zratio = (z + tilesize / 2) / tilesize;
    let res = new Diamond(x, y, z,
        size,
        color(255 * xratio, 255 * yratio, 255 * zratio, 150),
        weightFactor
    );
    return res;
}

function make_diamonds(step, tilesize, weightFactor) {
    let res = [];
    for (let x = step / 2; x < tilesize; x = x + step) {
        for (let y = step / 2; y < tilesize; y = y + step) {
            for (let z = step / 2; z < tilesize; z = z + step) {
                res.push(push_diamond(x - tilesize / 2,
                    y - tilesize / 2,
                    z - tilesize / 2,
                    step / 2,
                    weightFactor));
                if (x + step / 2 < tilesize && y + step / 2 < tilesize) {
                    res.push(push_diamond(x - tilesize / 2 + step / 2,
                        y - tilesize / 2 + step / 2,
                        z - tilesize / 2,
                        step / 2,
                        weightFactor));
                }
                if (y + step / 2 < tilesize && z + step / 2 < tilesize) {
                    res.push(push_diamond(x - tilesize / 2,
                        y - tilesize / 2 + step / 2,
                        z - tilesize / 2 + step / 2,
                        step / 2,
                        weightFactor));
                }
                if (x + step / 2 < tilesize && z + step / 2 < tilesize) {
                    res.push(push_diamond(x - tilesize / 2 + step / 2,
                        y - tilesize / 2,
                        z - tilesize / 2 + step / 2,
                        step / 2,
                        weightFactor));
                }
            }
        }
    }
    return res;
}

class Diamond {
    constructor(x, y, z, size, color, weightFactor = 0.1) {
        this.pos = createVector(x, y, z);
        this.size = size;
        this.color = color;
        this.weight = size * weightFactor;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        specularMaterial(this.color);
        shininess(100);
        strokeWeight(this.weight);
        stroke(this.color);
        noFill();
        // sphere(this.size*0.7, 20, 20);
        sphere(this.size - this.weight, 4, 2);
        pop();
    }
}