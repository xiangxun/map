import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { FacadeModel } from "@/components/importModels";

const FacadeCanvas = () => {
  return (
    <Canvas shadows camera={{ position: [100, 200, 100], fov: 45, far: 2000 }}>
      <OrbitControls />
      {/* 坏境光 */}
      <ambientLight intensity={0.8} />
      {/* 平行光 */}
      <directionalLight
        castShadow
        intensity={1.5}
        position={[50, 300, 50]}
        shadow-mapSize={4096}
        // shadow-bias={-0.0005}
        color={"#fff"}
      >
        <orthographicCamera
          attach='shadow-camera'
          args={[-200, 200, 200, -200, 10, 1000]}
        />
      </directionalLight>
      <axesHelper args={[10]} />
      <gridHelper args={[80, 20]} />
      <Suspense>
        <FacadeModel />
        {/* <ResidenceModel00 /> */}
      </Suspense>
      <EffectComposer>
        <SSAO
          blendFunction={BlendFunction.MULTIPLY} // blend mode
          intensity={12}
        />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
};

export default FacadeCanvas;
