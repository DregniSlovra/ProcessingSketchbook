// casey conchinha - @kcconch ( https://github.com/kcconch )
// louise lessel - @louiselessel ( https://github.com/louiselessel )
// more p5.js + shader examples: https://itp-xstory.github.io/p5js-shaders/
// this is a modification of a shader by adam ferriss
// https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/2_texture-coordinates/2-1_basic

precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

float PHI = 1.61803398874989484820459;  // Φ = Golden Ratio

float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

void main() {

    // copy the vTexCoord
    // vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
    // we can use it to access every pixel on the screen
    vec2 coord = vTexCoord;
    vec4 res = vec4(0, 0, 0, 1.0);
    float g = coord.x * 0.4 + coord.y * 0.6;
    float b = coord.x * 0.6 + coord.y * 0.4;
    vec4 teal = vec4(0, g, b, 1.0);
    b = coord.x * 0.1 + coord.y * 0.9;
    float r = coord.x * 0.5 + coord.y * 0.5;
    vec4 indigo = vec4(r*0.5, 0, b, 1.0);
    teal = vec4(0, 1.0, 1.0, 1.0);
    indigo = vec4(0.4, 0, 1.0, 1.0);
    r = teal.x * coord.x + indigo.x * 1.5 * (1.0 - coord.x);
    g = teal.y * coord.y + indigo.y * 1.5 * (1.0 - coord.y);
    float a = (coord.x + coord.y) / 2.0;
    b = teal.z * a + indigo.z * (1.0 - a);
    res = vec4(r, g, b, 1.0);
    gl_FragColor = res;
}
