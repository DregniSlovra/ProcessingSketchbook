function LAB_sphere_cut(center, size, LWB) {
    let radius = LWB * 100;
    push();
    translate(center.x, center.y);
    for (let i = 0; i < TWO_PI; i += 0.01) {
        let x = radius * cos(i);
        let y = radius * sin(i);
        stroke(255);
        strokeWeight(1);
        line(0, 0, x, y);
    }
    pop();
}

class ColorPickerLAB {
    constructor(pos, size, resolution = 10) {
        this.pos = pos;
        this.size = size;
        this.resolution = resolution;
        colorMode(RGB, 1);
        this.selected = color(1, 1, 1);
        this.LWB = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
        this.ARG = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + 2 * size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
        this.BYB = new ScrollBar(createVector(pos.x + size.x / 2, pos.y + 3 * size.y / 5), createVector(size.x / 2, size.y / 2), 10, 1);
        this.selected = this.updateColor(this.LWB.value, this.ARG.value, this.BYB.value);
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
        // RGB_Triangle(createVector(this.pos.x + this.size.x / 4, this.pos.y + this.size.y / 4), min(this.size.x / 4, this.size.y / 4));
        LAB_sphere_cut(createVector(this.pos.x + this.size.x / 4, this.pos.y + this.size.y / 4), min(this.size.x / 4, this.size.y / 4), this.LWB.value);
        fill(this.selected);
        rect(this.pos.x, this.pos.y + this.size.y / 2, this.size.x / 2, this.size.y / 2);
        let colorFunctions = [
            (i) => this.updateColor(map(i, 0, this.size.x / 2, 0, 1), this.ARG.value, this.BYB.value),
            (i) => this.updateColor(this.LWB.value, map(i, 0, this.size.x / 2, 0, 1), this.BYB.value),
            (i) => this.updateColor(this.LWB.value, this.ARG.value, map(i, 0, this.size.x / 2, 0, 1)),
        ];
        for (let i = 0; i < 3; i += 1) {
            this.showRange(createVector(this.pos.x + this.size.x / 2, this.pos.y + (1 + i) * this.size.y / 5 - 100), createVector(this.size.x / 2, 50), colorFunctions[i]);
        }
        this.LWB.display();
        this.ARG.display();
        this.BYB.display();
    }

    updateColor(LWB, ARG, BYB) {
        colorMode(RGB, 1);
        let R = 0, G = 0, B = 0;
        if (ARG > 0.5) {
            G = LWB * map(ARG, 0.5, 1, 0, 1);
            R = 0;
        } else {
            R = LWB * map(ARG, 0, 0.5, 1, 0);
            G = 0;
        }
        if (BYB > 0.5) {
            B = LWB * map(BYB, 0.5, 1, 0, 1);
        }
        else {
            B = 0;
            R = R + (LWB * map(BYB, 0, 0.5, 1, 0));
            G = G + (LWB * map(BYB, 0, 0.5, 1, 0));
        }
        return color(R, G, B);
    }

    selectUpdate(x, y) {
        this.LWB.click(x, y);
        this.ARG.click(x, y);
        this.BYB.click(x, y);
        this.selected = this.updateColor(this.LWB.value, this.ARG.value, this.BYB.value);
    }
}