//@flow
import React, { Component } from "react";
import { Shaders, Node, GLSL, timeLoop } from "gl-react";
import { Surface } from "gl-react-dom";
// import timeLoop from "";

// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
  blackHoleGL: {
    // This is our first fragment shader in GLSL language (OpenGL Shading Language)
    // (GLSL code gets compiled and run on the GPU)
    // #define 1.0 1.0
    frag: GLSL`
    precision highp float;
    varying vec2 uv;

    uniform float time;

    void main() {
      float amnt;
      float nd;
      vec4 cbuff = vec4(0.0);
      for(float i=0.0; i<5.0;i++){
        nd = sin(3.17*0.8*uv.x + (i*0.1+sin(+time)*0.2) + time)*0.8+0.1 + uv.x;
        amnt = 1.0/abs(nd-uv.y)*0.01;
        cbuff += vec4(amnt, amnt*0.3 , amnt*uv.y, 90.0);
      }
      for(float i=0.0; i<1.0;i++){
        nd = sin(3.14*2.0*uv.y + i*40.5 + time)*90.3*(uv.y+80.3)+0.5;
        amnt = 1.0/abs(nd-uv.x)*0.015;
        cbuff += vec4(amnt*0.2, amnt*0.2 , amnt*uv.x, 1.0);
      }
      gl_FragColor = cbuff;
    }

`,
  },
});

// const Preview = timeLoop(({ frag, visitor, time }) => (
//   <Surface width={500} height={200} visitor={visitor}>
//     <Node shader={{ frag }} uniforms={{ time: time / 1000 }} />
//   </Surface>
// ));

const Loop = ({ time }) => {
  <Surface width={500} height={500}>
    <Node shader={shaders.blackHoleGL} uniforms={{ time: time / 1000 }} />
  </Surface>;
};

const BlackHole = () => {
  return <Loop />;
  // Surface creates the canvas, an area of pixels where you can draw.
  // Node instanciates a "shader program" with the fragment shader defined above.
};
export default BlackHole;
