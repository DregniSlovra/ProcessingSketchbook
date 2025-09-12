const type_names = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"]

const type_colors = [
    [200, 250, 100], // bug
    [0, 0, 0], // dark
    [50, 50, 250], // dragon
    [250, 250, 100], // electric
    [250, 150, 200], // fairy
    [250, 100, 100], // fighting
    [250, 150, 50], // fire
    [200, 200, 250], // flying
    [100, 50, 200], // ghost
    [100, 250, 100], // grass
    [200, 150, 50], // ground
    [100, 250, 250], // ice
    [250, 250, 250], // normal
    [200, 100, 200], // poison
    [250, 200, 200], // psychic
    [200, 200, 150], // rock
    [150, 200, 200], // steel
    [100, 200, 250]  // water
]

const type_chart = [
    [1, 2, 1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1],
    [1, 0.5, 1, 1, 0.5, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1],
    [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1],
    [1, 1, 0.5, 0.5, 1, 1, 1, 2, 1, 0.5, 0, 1, 1, 1, 1, 1, 1, 2],
    [1, 2, 2, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 0.5, 1],
    [0.5, 2, 1, 1, 0.5, 1, 1, 0.5, 0, 1, 1, 2, 2, 0.5, 0.5, 2, 2, 1],
    [2, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 2, 1, 2, 1, 1, 1, 0.5, 1, 0.5],
    [2, 1, 1, 0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0.5, 0.5, 1],
    [1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 2, 1, 1, 1],
    [0.5, 1, 0.5, 1, 1, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 2],
    [0.5, 1, 1, 2, 1, 1, 2, 0, 1, 0.5, 1, 1, 1, 2, 1, 2, 2, 1],
    [1, 1, 2, 1, 1, 1, 0.5, 2, 1, 2, 2, 0.5, 1, 1, 1, 1, 0.5, 0.5],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2, 0.5, 1, 1, 0.5, 1, 0.5, 0, 1],
    [1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1],
    [2, 1, 1, 1, 1, 0.5, 2, 2, 1, 1, 0.5, 2, 1, 1, 1, 1, 0.5, 1],
    [1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 0.5, 0.5],
    [1, 1, 0.5, 1, 1, 1, 2, 1, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 0.5]
]

function display_logo_byID(pos, size, id) {
    x_by_id = id % 6 * logo_w;
    y_by_id = Math.floor(id / 6) * logo_h;
    image(type_img, pos.x - size/2, pos.y - size/2, size, size, x_by_id, y_by_id, logo_w, logo_h);
}

function fight(ball1, ball2) {
    let b1_eff = type_chart[ball1.ptype][ball2.ptype] + type_chart[ball1.ptype2][ball2.ptype2];
    let b2_eff = type_chart[ball2.ptype][ball1.ptype] + type_chart[ball2.ptype2][ball1.ptype2];
    let result = random(0, b1_eff + b2_eff);
    if (result < b1_eff) {
        return 1;
    } else if (result >= b1_eff) {
        return 2;
    }
}

class TypeBall {
    constructor(ptype, ptype2, pos, size, maxspd, speed, acc_cap) {
        this.ptype = ptype;
        this.ptype2 = ptype2;
        this.pos = pos;
        this.size = size;
        this.maxspd = maxspd;
        this.speed = speed;
        this.acc_cap = acc_cap;
        this.acceleration = createVector(random(-acc_cap, acc_cap), random(-acc_cap, acc_cap));
    }


    would_kill(enemy) {
        if (type_chart[this.ptype].includes(enemy.ptype)) {
            return true;
        }
        return false;
    }

    move() {
        this.pos.add(this.speed);

        if (this.pos.x < this.size || this.pos.x > arena_size - this.size) {
            this.speed.x *= -1;
        }
        if (this.pos.y < this.size || this.pos.y > arena_size - this.size) {
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
        if (this.ptype !== this.ptype2) {
            noStroke();
            fill(type_colors[this.ptype][0], type_colors[this.ptype][1], type_colors[this.ptype][2]);
            rect(this.pos.x - this.size/2, this.pos.y - this.size/2, this.size/2, this.size);
            fill(type_colors[this.ptype2][0], type_colors[this.ptype2][1], type_colors[this.ptype2][2]);
            rect(this.pos.x, this.pos.y - this.size/2, this.size/2, this.size);
            // display_logo_byID(createVector(this.pos.x - this.size/4, this.pos.y - this.size/4), this.size/1.5, this.ptype);
            // display_logo_byID(createVector(this.pos.x + this.size/4, this.pos.y + this.size/4), this.size/1.5, this.ptype2);
        } else {
            display_logo_byID(this.pos, this.size, this.ptype);
        }
        noFill();
        stroke(255);
        strokeWeight(this.size / 3);
        ellipse(this.pos.x, this.pos.y, this.size + (this.size / 10));
    }

    live() {
        // this.random_acc();
        // this.accelerate();
        this.move();
        this.show();
    }
}