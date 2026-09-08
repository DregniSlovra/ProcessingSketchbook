class BallPopulation {
    constructor(length, max_size, min_size) {
        this.length = length;
        this.max_size = max_size;
        this.min_size = min_size;
        this.balls = [];
        for (var i = 0; i < this.length; i++) {
            this.balls.push(new Ball(
                i + 1,
                createVector(random(this.max_size, width - this.max_size), random(this.max_size, height - this.max_size)),
                createVector(random(-5, 5), random(-5, 5)),
                random(this.min_size, this.max_size),
                color(random(255), random(255), random(255), 200)
            ));
        }
        this.ball_total_size = this.balls.reduce((total, ball) => total + ball.size, 0);
        this.balls.sort((a, b) => b.size - a.size);
        this.alive_balls = this.balls.filter(ball => ball.size > 1);
    }

    show(showId = false, showSpeed = false) {
        for (var ball of this.balls) {
            ball.show(showId, showSpeed);
        }
    }

    live() {
        for (var ball of this.balls) {
            ball.live(this.max_size, true);
            // for (var food of foods) {
            //   ball.fight(food);
            // }
        }
    }

    fight() {
        for (var ball of this.balls) {
            for (var other_ball of this.balls) {
                if (ball.fight(other_ball)) {
                    this.ball_total_size = this.balls.reduce((total, ball) => total + ball.size, 0);
                    this.balls.sort((a, b) => b.size - a.size);
                    this.alive_balls = this.balls.filter(ball => ball.size > 1);
                }
            }
        }
    }

    check_end(podium = 1) {
        if (this.alive_balls.length <= 1) {
            return true;
        }
        if (podium && this.alive_balls.length <= podium) {
            return true;
        }
        return false;
    }
}