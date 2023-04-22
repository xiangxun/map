import { Canvas } from "@react-three/fiber";
import React from "react";

const test = () => {
  return (
    <div className='  w-screen h-screen '>
      <Canvas>
        <mesh>
          <boxGeometry attach='geometry' args={[1, 1, 1]} />
          <meshStandardMaterial attach='material' color='hotpink' />
        </mesh>
        <mesh position={[1, 1, 1]}>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
      <Canvas>
        <mesh>
          <boxGeometry attach='geometry' args={[1, 1, 1]} />
          <meshStandardMaterial attach='material' color='hotpink' />
        </mesh>
        <mesh position={[1, 1, 1]}>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
};
export default test;
