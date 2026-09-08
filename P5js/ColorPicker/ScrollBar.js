class ScrollBar {
    constructor(pos, size, thickness, defaultValue = 0) {
        this.pos = pos;
        this.size = size;
        this.thickness = thickness;
        this.direction = "horizontal";
        this.value = defaultValue;
    }

    click(x, y) {
        if (x >= this.pos.x && x < this.pos.x + this.size.x - this.thickness && y > this.pos.y - this.thickness * 2 && y < this.pos.y + this.thickness * 2) {
            this.value = (x - this.pos.x) / (this.size.x - this.thickness);
            return true;
        }
        return false;
    }

    display() {
        stroke(255);
        strokeWeight(this.thickness);
        line(this.pos.x + this.thickness, this.pos.y, this.pos.x + this.size.x, this.pos.y);
        fill(255);
        noStroke();
        rect(this.pos.x + this.value * this.size.x, this.pos.y - this.thickness, this.thickness, this.thickness * 2);
        textSize(12);
        fill(255);
        let percentage = (this.value * 100).toFixed(0) + "%";
        textAlign(CENTER, BOTTOM);
        text(percentage, this.pos.x + textWidth(percentage) / 4 + this.value * this.size.x, this.pos.y - this.thickness / 2 - 10);
    }
}