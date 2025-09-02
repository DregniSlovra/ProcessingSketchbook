function push_tile(x, y, z, size, weightFactor, tiles) {
    xratio = (x + tilesize / 2) / tilesize;
    yratio = (y + tilesize / 2) / tilesize;
    zratio = (z + tilesize / 2) / tilesize;
    let res = new Tile(x, y, z,
        size,
        color(255 * xratio, 255 * yratio, 255 * zratio, 20),
        weightFactor
    );
    return res;
}

function make_tiles(step, tilesize, weightFactor) {
    let res = [];
    for (let x = step / 2; x < tilesize; x = x + step) {
        for (let y = step / 2; y < tilesize; y = y + step) {
            for (let z = step / 2; z < tilesize; z = z + step) {
                res.push(push_tile(x - tilesize / 2,
                    y - tilesize / 2,
                    z - tilesize / 2,
                    step / 2,
                    weightFactor, res));
                if (x + step / 2 < tilesize && y + step / 2 < tilesize) {
                    res.push(push_tile(x - tilesize / 2 + step / 2,
                        y - tilesize / 2 + step / 2,
                        z - tilesize / 2,
                        step / 2,
                        weightFactor, res));
                }
                if (y + step / 2 < tilesize && z + step / 2 < tilesize) {
                    res.push(push_tile(x - tilesize / 2,
                        y - tilesize / 2 + step / 2,
                        z - tilesize / 2 + step / 2,
                        step / 2,
                        weightFactor, res));
                }
                if (x + step / 2 < tilesize && z + step / 2 < tilesize) {
                    res.push(push_tile(x - tilesize / 2 + step / 2,
                        y - tilesize / 2,
                        z - tilesize / 2 + step / 2,
                        step / 2,
                        weightFactor, res));
                }
            }
        }
    }
    console.log(res.slice());
    for (i = 0; i < res.length; i++) {
        for (j = i + 1; j < res.length; j++) {
            let dx = res[i].pos.x - res[j].pos.x
            let dy = res[i].pos.y - res[j].pos.y
            let dz = res[i].pos.z - res[j].pos.z

            if (dx > 0 && dy > 0 && dz > 0) {
                res[i].addNeighbour(res[j], );
            }
            // if (i !== j && dist(res[i].pos.x, res[i].pos.y, res[i].pos.z, res[j].pos.x, res[j].pos.y, res[j].pos.z) < (res[i].size + res[j].size) + 5) {
            //     console.log("yes");
            //     res[i].addNeighbour(res[j]);
            // }
        }
    }
    console.log(res);
    return res;
}

class Tile {
    constructor(x, y, z, size, color, weightFactor = 0.1) {
        this.pos = createVector(x, y, z);
        this.size = size;
        this.color = color;
        this.weight = size * weightFactor;
        this.selected = false;
        this.neighbours = [];
    }

    addNeighbour(tile) {
        if (this.pos.x > tile.pos.x) {
            this.neighbours[0] = tile;
        }
    }

    hasNeighbour(index) {
        return this.neighbours[index] !== undefined;
    }

    select() {
        if (this.selected) {
            this.selected = false;
            this.color = color(this.color.levels[0], this.color.levels[1], this.color.levels[2], 20);
        }
        else {
            this.selected = true;
            this.color = color(this.color.levels[0], this.color.levels[1], this.color.levels[2], 200);
        }
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