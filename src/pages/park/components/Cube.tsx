import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import React from "react";

function Cube() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -15, -10]} />
      <fog attach='fog' args={["white", 5, 15]} />
      <axesHelper args={[5]} />
      <gridHelper args={[100, 100]} />
      <mesh position={[0, 1, 0]} castShadow>
        <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
        <meshStandardMaterial attach='material' color={"#FFFFFF"} />
      </mesh>
      <EffectComposer>
        <SSAO />
      </EffectComposer>
    </Canvas>
  );
}

export default Cube;
