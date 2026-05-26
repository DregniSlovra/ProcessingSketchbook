class TimeBar {
    constructor() {
        this.pos = createVector(0, 0);
        this.size = createVector(100, 20);
        this.value = 0;
    }

    setup(posx, posy, sizex, sizey, defaultValue = 0) {
        this.pos = createVector(posx, posy);
        this.size = createVector(sizex, sizey);
        this.value = defaultValue;
    }

    draw(value) {
        push();
        this.value = value;
        if (value > 1) {
            this.value = 1;
        }
        noStroke();
        fill(255);
        rect(this.pos.x + 2, this.pos.y, this.size.x, this.size.y);
        fill(0);
        noStroke();
        rect(this.pos.x, this.pos.y - 2, this.size.y + this.value * this.size.x, this.size.y + 4);
        textSize(12);
        fill(0);
        let percentage = (this.value * 100).toFixed(0) + "%";
        textAlign(CENTER, BOTTOM);
        text(percentage, this.pos.x + textWidth(percentage) / 4 + this.value * this.size.x, this.pos.y - 10);
        pop();
    }
}