import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ShaderMaterial, TextureLoader } from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D map;
  varying vec2 vUv;
  void main() {
    vec4 texColor = texture2D(map, vUv);
    gl_FragColor = vec4(texColor.rgb * vec3(0.8), 1.0);
  }
`;

const shaderMaterial = new ShaderMaterial({
  uniforms: {
    map: { value: null },
  },
  vertexShader,
  fragmentShader,
});

function Scene() {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export const ShaderScene = () => {
  const texture = useMemo(
    () => new TextureLoader().load("texture.png"),
    []
  );

  shaderMaterial.uniforms.map.value = texture;

  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};
