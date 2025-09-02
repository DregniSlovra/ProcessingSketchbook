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
    float d = distance(coord, vec2(0.5));
    vec4 res = vec4(0, 0, 0, 1.0);
    // x values for red, y values for green, both for blue
    if (d > 0.2)
    {
      float rlimit = 0.45;
      float rdefault = 0.125;
      float r = (d < rlimit ? rdefault + (rlimit-d) : rdefault);
      float rnoise = gold_noise(vec2(coord.x * 800.0, coord.y * 800.0), 1.0) / 8.0;
      r = r + rnoise;
      float gnoise = gold_noise(vec2(coord.x * 800.0, coord.y * 800.0), 2.0) / 8.0;
      float glimit = 0.35;
      float gdefault = 0.175;
      float g = (d > glimit ? gdefault + (glimit-d) : gdefault);
      d = d / 0.4;
      r = r * d + g * (1.0 - d);
      res = vec4(r, g, 0, 1.0);
    }
    gl_FragColor = res;
}
