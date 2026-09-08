class Ball {
    constructor(id, pos, spd, size, color) {
        this.id = id;
        this.pos = pos;
        this.spd = spd;
        if (this.spd.x < 1 && this.spd.x > -1) {
            this.spd.x = this.spd.x < 0 ? -1 : 1;
        }
        this.size = size;
        this.color = color;
    }

    show(showId = false, showSpeed = false) {
        noStroke();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.size);
        if (showId) {
            var color_level = (this.color.levels[0] + this.color.levels[1] + this.color.levels[2]) / 3;
            fill(color_level > 128 ? 0 : 255);
            textSize(this.size / 2);
            textAlign(CENTER, CENTER);
            text(this.id, this.pos.x, this.pos.y);
        }
        if (showSpeed) {
            stroke(255);
            strokeWeight(1);
            line(this.pos.x, this.pos.y, this.pos.x + this.spd.x * 10, this.pos.y + this.spd.y * 10);
        }
    }

    move() {
        this.pos.add(this.spd);
        if (this.pos.x < this.size / 2 || this.pos.x > width - this.size / 2) {
            this.spd.x *= -1;
        }
        if (this.pos.y < this.size / 2 || this.pos.y > height - this.size / 2) {
            this.spd.y *= -1;
        }
    }

    live(max_size, showId = false) {
        this.move();
        this.show(showId);
        // if (this.size > 1 && this.size < max_size * 4) {
        //     var diff = (max_size - this.size)
        //     if (diff > 0) {
        //         this.size += diff / 100;
        //     }
        // }
    }

    fight(other_ball) {
        var rate = 0.05;
        if (this.id != other_ball.id) {
            var distance = dist(this.pos.x, this.pos.y, other_ball.pos.x, other_ball.pos.y);
            if (distance < (this.size + other_ball.size) / 2) {
                var result = random(100);
                // if (result < 100 * this.size / (this.size + other_ball.size)) {
                // Change to a better clutch system with chances to win based on size difference instead of certainety
                if (this.size > other_ball.size) {
                    this.size += other_ball.size * rate;
                    other_ball.size *= 1 - rate;
                // } else {
                } else if (this.size < other_ball.size) {
                    other_ball.size += this.size * rate;
                    this.size *= 1 - rate;
                }
                if (this.pos.x - this.size / 2 < 0) {
                    this.pos.x = this.size / 2;
                }
                if (this.pos.x + this.size / 2 > width) {
                    this.pos.x = width - this.size / 2;
                }
                if (this.pos.y - this.size / 2 < 0) {
                    this.pos.y = this.size / 2;
                }
                if (this.pos.y + this.size / 2 > height) {
                    this.pos.y = height - this.size / 2;
                }
                return true;
            }
        }
        return false;
    }
}