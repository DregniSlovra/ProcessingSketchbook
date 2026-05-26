var morseText = "-/...././/--.-/..-/../-.-./-.-//-.../.-./---/.--/-.//..-./---/-..-//.---/..-/--/.--./...//---/...-/./.-.//-/...././/.-../.-/--../-.--//-../---/--.//";
var timepressed = 0;
var timewaited = 0;
var morse_tree = null;
var deltime = 0;
var keybar = null;
var waitbar = null;

function preload() {
    morse_tree = loadImage('morse_tree.png');
    morseText = getItem("morseText") || morseText;
    keybar = new TimeBar();
    waitbar = new TimeBar();
}

function setup() {
    createCanvas(1000, 1000);
    background(220);
    keybar.setup(100, height/2 - 100, width-200, 10);
    waitbar.setup(100, height/2 - 50, width-200, 10);
}

function read_morse(morse_code) {
    var morse_dict = {
        ".": "E",
        "-": "T",
        "..": "I",
        ".-": "A",
        "-.": "N",
        "--": "M",
        "...": "S",
        "..-": "U",
        ".-.": "R",
        ".--": "W",
        "-..": "D",
        "-.-": "K",
        "--.": "G",
        "---": "O",
        "....": "H",
        "...-": "V",
        "..-.": "F",
        ".-..": "L",
        ".--.": "P",
        ".---": "J",
        "-...": "B",
        "-..-": "X",
        "-.-.": "C",
        "-.--": "Y",
        "--..": "Z",
        "--.-": "Q",
        ".....": "5",
        "....-": "4",
        "...--": "3",
        "..---": "2",
        ".-.-.": "+",
        ".----": "1",
        "-....": "6",
        "-....-": "=",
        "-..-.": "/",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        "-----": "0",
    }
    for (var letter of morse_code.split("/")) {
        if (morse_dict[letter]) {
            morse_code = morse_code.replace(letter, morse_dict[letter]);
        }
        if (letter === "") {
            morse_code = morse_code.replace("//", " ");
        }
    }
    return morse_code?.replace(/\//g, "");
}

function draw() {
    background(220);
    noStroke();
    fill(0);
    textSize(32);
    displayText = read_morse(morseText);
    text(displayText, 10, 10, width-10, height-50);
    textSize(24);
    displayMorse = (morseText.substring(morseText.length - 2 ) === "//") ? morseText.substring(0, morseText.length - 2) + "+" : morseText;
    displayMorse = displayMorse.replace(/\/\//g, " ");
    text(displayMorse, 10, height-height/2, width-10, width);
    image(morse_tree, 0, height-height/3, width, height/3);
    keybar.draw(map(millis() - timepressed, 0, 200, 0, 1));
    waitbar.draw(map(millis() - timewaited, 0, 600, 0, 1));
    if (keyIsDown(BACKSPACE)) {
        if (deltime == 0) {
            deltime = millis();
            // print("Backspace pressed")
            morseText = morseText.substring(0, morseText.length - 1);
        }
        else if (millis() - deltime > 300) {
            // print("Backspace still pressed : " + (millis() - deltime) + " tp :" + deltime + " millis: " + millis());
            morseText = morseText.substring(0, morseText.length - 1);
            deltime = millis()-250;
        }
    }
    if (!keyIsPressed && morseText.substring(morseText.length - 2, morseText.length) !== "//" && morseText.length > 0) {
        if (millis() - timewaited > 800) {
            morseText += "/";
            if (morseText.substring(morseText.length - 2, morseText.length) !== "//") {
                timewaited = millis();
            }
        }
    }
}

function keyPressed() {
    ignore_codes = [ SHIFT, CONTROL, ALT, TAB, ESCAPE, LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW, DELETE, ENTER, BACKSPACE ];
    if (keyCode === ENTER) {
        // displayText += "\n";
    }
    else if (keyCode === ESCAPE) {
        morseText = "";
    }
    else if (keyCode === UP_ARROW) {
        timepressed = millis();
    }
    else if (ignore_codes.includes(keyCode)) {
        // Do nothing for ignored keys
    }
    else if (key === ' ') {
        morseText += "/";
    }
    else {
        // displayText += key;
        // print(morseText);
    }
}

function keyReleased() {
    if (keyCode === UP_ARROW) {
        var duration = millis() - timepressed;
        // print("Duration: " + duration);
        if (duration < 200) {
            morseText += ".";
        }
        else {
            morseText += "-";
        }
    }
    // timepressed = millis();
    timewaited = millis();
    deltime = 0;
    storeItem("morseText", morseText);
}