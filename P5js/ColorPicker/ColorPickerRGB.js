function RGB_Triangle(pos, size, tilesize = 10) {
    colorMode(RGB, 1);
    push();
    translate(pos.x, pos.y);
    j_iteration = size / tilesize;
    for (let i = 0; i < PI*2; i += PI/(size / (tilesize/4))) {
        for (let j = 0; j < j_iteration; j += 1) {
            let c = color(map(cos(i), -1, 1, 0, 1) * j/(j_iteration-1), map(cos(i + TWO_PI / 3), -1, 1, 0, 1) * j/(j_iteration-1), map(cos(i + 2 * TWO_PI / 3), -1, 1, 0, 1) * j/(j_iteration-1));
            push();
            rotate(i);
            translate(size / 2 * j / (j_iteration-1), size / 2 * j / (j_iteration-1));
            noStroke();
            fill(c);
            rect(0, 0, size / j_iteration, size / j_iteration);
            // stroke(c);
            // strokeWeight(1);
            // rect(pos.x + size.x * cos(i) * j / (j_iteration-1), pos.y + size.y * sin(i) * j / (j_iteration-1), size.x / j_iteration, size.y / j_iteration);
            pop();
        // let c = color(map(cos(i), -1, 1, 0, 1), map(cos(i + TWO_PI / 3), -1, 1, 0, 1), map(cos(i + 2 * TWO_PI / 3), -1, 1, 0, 1));
        // stroke(c);
        // strokeWeight(1);
        // line(pos.x, pos.y, pos.x + size.x * cos(i), pos.y + size.y * sin(i));
        }
    }
    pop();
}

class ColorPickerRGB {
    constructor(pos, size, resolution = 10) {
        this.pos = pos;
        this.size = size;
        this.resolution = resolution;
        colorMode(RGB, 1);
        this.selected = color(1, 1, 1);
        this.Red = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
        this.Green = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + 2 * size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
        this.Blue = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + 3 * size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
    }

    showRange(pos, size, colorFunction) {
        colorMode(RGB, 1);
        for (let i = 0; i < size.x; i += 1) {
            strokeWeight(1);
            stroke(colorFunction(i));
            line(pos.x + i, pos.y, pos.x + i, pos.y + size.y);
        }
    }

    display() {
        colorMode(RGB, 1);
        RGB_Triangle(createVector(this.pos.x + this.size.x / 4, this.pos.y + this.size.y / 4), min(this.size.x / 4, this.size.y / 4));
        fill(this.selected);
        rect(this.pos.x, this.pos.y + this.size.y / 2, this.size.x / 2, this.size.y / 2);
        let colorFunctions = [
            (i) => color(map(i, 0, this.size.x / 2, 0, 1), this.Green.value, this.Blue.value),
            (i) => color(this.Red.value, map(i, 0, this.size.x / 2, 0, 1), this.Blue.value),
            (i) => color(this.Red.value, this.Green.value, map(i, 0, this.size.x / 2, 0, 1)),
        ];
        for (let i = 0; i < 3; i += 1) {
            this.showRange(createVector(this.pos.x + this.size.x / 2, this.pos.y + (1 + i) * this.size.y / 5 - 100), createVector(this.size.x / 2, 50), colorFunctions[i]);
        }
        this.Red.display();
        this.Green.display();
        this.Blue.display();
    }

    updateColor() {
        colorMode(RGB, 1);

        this.selected = color(map(this.Red.value, 0, 1, 0, 1), map(this.Green.value, 0, 1, 0, 1), map(this.Blue.value, 0, 1, 0, 1));
    }

    selectUpdate(x, y) {
        this.Red.click(x, y);
        this.Green.click(x, y);
        this.Blue.click(x, y);
        this.updateColor();
    }
}