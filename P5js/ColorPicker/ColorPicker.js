class ColorPicker {
    constructor(pos, size, resolution = 10) {
        this.pos = pos;
        this.size = size;
        this.resolution = resolution;
        colorMode(HSB, 1);
        this.selected = color(1, 1, 1);
        this.hue = 1;
        this.hue1 = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + size.y / 5), createVector(size.x / 2, size.y / 2), 10, 0);
        this.hue2 = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + 2 * size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
        this.saturation = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + 3 * size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
        this.brightness = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + 4 * size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
    }

    showRange(pos, size, colorFunction) {
        colorMode(HSB, 1);
        for (let i = 0; i < size.x; i += 1) {
            strokeWeight(1);
            stroke(colorFunction(i));
            line(pos.x + i, pos.y, pos.x + i, pos.y + size.y);
        }
    }

    display() {
        colorMode(HSB, 1);
        for (let i = 0; i < this.size.x / 2; i += this.resolution) {
            for (let j = 0; j < this.size.y / 2; j += this.resolution) {
                let c = color(map(i, 0, this.size.x / 2, 0, 1), map(j, 0, this.size.y / 2, 0, 1), 1);
                fill(c);
                noStroke();
                rect(this.pos.x + i, this.pos.y + j, this.resolution, this.resolution);
            }
        }
        fill(this.selected);
        rect(this.pos.x, this.pos.y + this.size.y / 2, this.size.x / 2, this.size.y / 2);
        let colorFunctions = [
            (i) => color(map(i, 0, this.size.x / 2, 0, 0.5), this.saturation.value, this.brightness.value),
            (i) => color(map(i, 0, this.size.x / 2, 0.5, 1), this.saturation.value, this.brightness.value),
            (i) => color(this.hue, map(i, 0, this.size.x / 2, 0, 1), this.brightness.value),
            (i) => color(this.hue, this.saturation.value,map(i, 0, this.size.x / 2, 0, 1))
        ];
        for (let i = 0; i < 4; i += 1) {
            this.showRange(createVector(this.pos.x + this.size.x / 2, this.pos.y + (1 + i) * this.size.y / 5 - 100), createVector(this.size.x / 2, 50), colorFunctions[i]);
        }
        this.hue1.display();
        this.hue2.display();
        this.saturation.display();
        this.brightness.display();
    }

    selectUpdate(x, y) {
        colorMode(HSB, 1);
        if (this.hue1.click(x, y))
        {
            this.hue = this.hue1.value / 2;
        }
        if (this.hue2.click(x, y))
        {
            this.hue = this.hue2.value / 2 + 0.5;
        }
        this.saturation.click(x, y);
        this.brightness.click(x, y);
        this.selected = color(map(this.hue, 0, 1, 0, 1), map(this.saturation.value, 0, 1, 0, 1), map(this.brightness.value, 0, 1, 0, 1));
    }
}