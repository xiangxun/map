import React from "react";
import { render } from "react-dom";
import { Surface } from "gl-react-dom";
import { Node, Shaders } from "gl-react";
import glslify from "glslify";

// 这里是从Shadertoy中复制的Shader代码，注意要用反引号包裹，并且用glslify标记
const shader = glslify`
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
}
`;

// 这里是创建一个shaders对象，包含了vertex和fragment两个部分
const shaders = Shaders.create({
  shaderToy: {
    // 这里是顶点着色器的代码，可以直接复制gl-react的文档中的示例
    vert: `
      attribute vec2 _p;
      varying vec2 uv;
      void main() {
        gl_Position = vec4(_p,0.0,1.0);
        uv = vec2(0.5, 0.5) * (_p+vec2(1.0, 1.0));
      }
    `,
    // 这里是片段着色器的代码，可以直接使用Shadertoy中的mainImage函数
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform float iTime;
      uniform vec2 iResolution;
      ${shader}
      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `,
  },
});

// 这里是创建一个React组件，使用Surface和Node来渲染Shader
const ShaderToy = () => {
  return (
    <Surface width={800} height={600}>
      <Node
        shader={shaders.shaderToy}
        uniforms={{
          iTime: () => Date.now() / 1000,
          iResolution: [800, 600],
        }}
      />
    </Surface>
  );
};

export default ShaderToy;
