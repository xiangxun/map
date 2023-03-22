import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { Robot } from "../../../components/Robot";

export const ThreeScene = () => {
  return (
    <div className="h-full">
      <Canvas camera={{ position: [0, 3, 5], fov: 60 }}>
        <OrbitControls />
        {/* 坏境光 */}
        <ambientLight intensity={0.5} />
        {/* 点光源 */}
        <spotLight position={[10, 10, 10]} angle={(0, 5)} />
        {/* 平行光 */}
        <directionalLight castShadow intensity={1} position={[10, 10, 0]} />
        <Suspense>{/* <Robot position={[0, -2, 0]} /> */}</Suspense>
      </Canvas>
    </div>
  );
};
