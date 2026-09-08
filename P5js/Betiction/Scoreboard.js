class Scoreboard {
  constructor(pos, size) {
    this.pos = pos;
    this.size = size;
  }

  show(ball_pop) {
    var lastpos = this.pos.x
    for (var ball of ball_pop.balls) {
      noStroke();
      fill(ball.color);
      rect(lastpos, this.pos.y, ball.size / ball_pop.ball_total_size * this.size.x, this.size.y);
      lastpos += ball.size / ball_pop.ball_total_size * this.size.x;
      if (ball.size > ball_pop.min_size) {
        fill(255);
        textSize(this.size.y * 0.8);
        textAlign(CENTER, CENTER);
        text(ball.id, lastpos - ball.size / ball_pop.ball_total_size * this.size.x / 2, this.pos.y + this.size.y / 2);
      }
    }
  }

  winners(balls) {
    if (balls.alive_balls.length > 1) {
      var winner_text = "Winners: " + balls.alive_balls.map(ball => ball.id).join(", ");
      console.log("finishing sizes: " + balls.alive_balls.map(ball => ball.size).join(", "));
    } else {
      var winner_text = "Winner: " + balls.alive_balls[0].id;
      console.log("finishing size: " + balls.alive_balls[0].size);
    }
    fill(255);
    textSize(this.size.y * 1.5);
    textAlign(CENTER, CENTER);
    text(winner_text, this.pos.x + this.size.x / 2, this.pos.y + this.size.y * 2);
  }
}