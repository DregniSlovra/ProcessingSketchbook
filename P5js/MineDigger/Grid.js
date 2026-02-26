class Cell {
    constructor(x, y, size, value) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.value = value;
        this.revealed = false;
        this.marked = false;
        this.pressed = false;
    }

    reveal() {
        if (this.marked) return true;
        this.revealed = true;
        if (this.value === 0) {
            // If the cell is empty, reveal neighboring cells
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (x === 0 && y === 0) continue;
                    let ni = int(this.x / this.size + x);
                    let nj = int(this.y / this.size + y);
                    if (ni >= 0 && ni < grid.cols && nj >= 0 && nj < grid.rows && ! grid.cells[ni][nj].revealed) {
                        grid.cells[ni][nj].reveal();
                    }
                }
            }
        }
        if (this.value === -1) {
            // If the cell is a bomb, reveal all bombs
            for (let i = 0; i < grid.cols; i++) {
                for (let j = 0; j < grid.rows; j++) {
                    if (grid.cells[i][j].value === -1) {
                        grid.cells[i][j].revealed = true;
                    }
                }
            }
            losses++;
            playing = false;
            saveScores();
            return false;
        }
        pointscore += this.value;
        return true;
    }

    mark() {
        this.marked = !this.marked;
    }

    show() {
        if (this.marked) {
            stroke(0);
            fill(0, 0, 255);
            rect(this.x, this.y, this.size, this.size);
            return;
        }
        if (!this.revealed) {
            stroke(0);
            fill((this.pressed ? 150 : 200));
            rect(this.x, this.y, this.size, this.size);
            this.pressed = false;
            return;
        }
        if (this.value === -1) {
            fill(255, 0, 0);
        } else if (this.value === 0) {
            fill(150, 255, 150);
        } else {
            fill(255-255/(this.value*0.7), 255/(this.value*0.7), (this.value > 4 ? 255 - 150/(this.value - 4) : 100));
        }
        stroke(0);
        rect(this.x, this.y, this.size, this.size);
        if (this.value !== -1) {
            textSize(this.size * 0.75);
            textAlign(CENTER, CENTER);
            fill(0);
            text(this.value, this.x + this.size / 2, this.y + this.size / 2);
        }
    }
}

class Grid {
    constructor(cols, rows, size, bomb_amount) {
        this.cols = cols;
        this.rows = rows;
        this.size = size;
        this.safe = true;
        // this.hinted = 10;
        this.hints = 0;
        this.bomb_amount = int(bomb_amount);
        this.mark_amount = 0;
        this.marked_bombs = 0;
        this.cells = [];
        this.initCells();
    }

    initCells() {
        this.safe = true;
        this.mark_amount = 0;
        this.marked_bombs = 0;
        this.hints = 0;
        for (let i = 0; i < this.cols; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.cells[i][j] = new Cell(i * this.size, j * this.size, this.size, 0);
            }
        }
        let bomb_max = this.bomb_amount;
        while (bomb_max > 0) {
            let x = floor(random(0, this.cols));
            let y = floor(random(0, this.rows));
            if (this.cells[x][y].value === 0) {
                this.cells[x][y].value = -1;
                bomb_max--;
            }
        }
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.cells[i][j].value !== -1) {
                    let count = 0;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (x === 0 && y === 0) continue;
                            let ni = i + x;
                            let nj = j + y;
                            if (ni >= 0 && ni < this.cols && nj >= 0 && nj < this.rows) {
                                if (this.cells[ni][nj].value === -1) {
                                    count++;
                                }
                            }
                        }
                    }
                    this.cells[i][j].value = count;
                }
            }
        }
    timescore = 0;
    }

    start_opening() {
        // Find all zero zones using BFS
        const visited = Array.from({ length: this.cols }, () => Array(this.rows).fill(false));
        const zeroZones = [];

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.cells[i][j].value === 0 && !visited[i][j]) {
                    // BFS to find connected zero zone
                    const queue = [[i, j]];
                    const zone = [];
                    visited[i][j] = true;
                    while (queue.length) {
                        const [x, y] = queue.shift();
                        zone.push([x, y]);
                        for (let dx = -1; dx <= 1; dx++) {
                            for (let dy = -1; dy <= 1; dy++) {
                                const nx = x + dx;
                                const ny = y + dy;
                                if (
                                    nx >= 0 && nx < this.cols &&
                                    ny >= 0 && ny < this.rows &&
                                    !visited[nx][ny] &&
                                    this.cells[nx][ny].value === 0
                                ) {
                                    visited[nx][ny] = true;
                                    queue.push([nx, ny]);
                                }
                            }
                        }
                    }
                    zeroZones.push(zone);
                }
            }
        }

        // Find the biggest zero zone
        let biggestZone = [];
        zeroZones.forEach(zone => {
            if (zone.length > biggestZone.length) biggestZone = zone;
        });

        // Reveal all cells in the biggest zero zone
        biggestZone.forEach(([x, y]) => {
            this.cells[x][y].reveal();
        });
    }

    reveal(x, y) {
        if (x < 0 || x >= this.cols * this.size || y < 0 || y >= this.rows * this.size) {
            return;
        }
        let cell = this.cells[int(x / this.size)][int(y / this.size)];
        if (this.safe) {
            if (!cell.revealed) {
                this.safe = cell.reveal();
                // this.hinted = (this.hinted > 0) ? this.hinted - 1 : 0;
                let score_to_hints = 50;
                if (pointscore > score_to_hints) {
                    this.hints += 1;
                    pointscore -= score_to_hints;
                }
            }
        } else {
            this.initCells();
            this.start_opening();
            this.safe = true;
        }
    }

    mark(x, y) {
        if (x < 0 || x >= this.cols * this.size || y < 0 || y >= this.rows * this.size) {
            return;
        }
        let cell = this.cells[int(x / this.size)][int(y / this.size)];
        if (!cell.revealed) {
            if (cell.marked) {
                this.mark_amount -= 1;
                if (cell.value === -1) {
                    this.marked_bombs--;
                }
            } else {
                this.mark_amount += 1;
                if (cell.value === -1) {
                    this.marked_bombs++;
                }
            }
            cell.mark();
        }
        if (this.marked_bombs === this.bomb_amount) {
            this.cells.forEach(col => col.forEach(cell => cell.reveal()));
            this.safe = false;
            wins++;
            playing = false;
            addTimeHighscore();
        }
        // console.log('infos : ' + this.mark_amount + ' / ' + this.bomb_amount + ' / ' + this.marked_bombs);
    }

    pressed(x, y) {
        if (x < 0 || x >= this.cols * this.size || y < 0 || y >= this.rows * this.size) {
            return;
        }
        this.cells[int(x / this.size)][int(y / this.size)].pressed = true;
    }

    showHints() {
        // if (this.hinted > 0) return;
        // this.hinted = 10;
        if (this.hints <= 0) return;
        this.hints -= 1;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const cell = this.cells[i][j];
                if (cell.revealed && cell.value > 0) {
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            const ni = i + dx;
                            const nj = j + dy;
                            if (
                                dx === 0 && dy === 0
                            ) continue;
                            if (
                                ni >= 0 && ni < this.cols &&
                                nj >= 0 && nj < this.rows
                            ) {
                                const neighbor = this.cells[ni][nj];
                                if (neighbor.value === -1 && !neighbor.marked && !neighbor.revealed) {
                                    neighbor.mark();
                                    this.mark_amount += 1;
                                    this.marked_bombs += 1;
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    show() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.cells[x][y].show();
            }
        }
    }
}