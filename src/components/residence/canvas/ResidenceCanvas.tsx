import React, { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { extend, useFrame } from "@react-three/fiber";
import { Box3, Box3Helper, Group, Object3D, Vector3 } from "three";

import {
  ResidenceModel,
  ParkModel00,
  Tree,
  GenModel,
} from "@/components/importModels";
import { colorType1, colorType2, colorType3 } from "@/assets";
import ExportModels from "@/components/exportModels";
function OrbitControlsComponent() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <OrbitControls
      autoRotate
      camera={camera}
      domElement={domElement}
      target={[0, 0, 0]} // 设置相机要指向的位置
    />
  );
}

function Scene() {
  return (
    <group>
      <PerspectiveCamera
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
      >
        <mesh />
      </PerspectiveCamera>
      {/* 添加需要渲染的场景内容 */}
    </group>
  );
}
const ResidenceCanvas = () => {
  return (
    <Canvas shadows camera={{ position: [200, 200, 200], fov: 45, far: 2000 }}>
      <OrbitControls />
      {/* <OrbitControlsComponent /> */}
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
          // args={[-100, 100, 100, -100]}
        />
      </directionalLight>
      {/* <axesHelper args={[500]} />
      <gridHelper args={[600, 20]} /> */}
      <Suspense>
        {/* <Tree /> */}
        <GenModel />
        {/* <ResidenceModel /> */}
        <ParkModel00 position={[0, -40.1, 0]} />
      </Suspense>
      <EffectComposer>
        <SSAO
          blendFunction={BlendFunction.MULTIPLY} // blend mode
          samples={64} // amount of samples per pixel (shouldn't be a multiple of the ring count)
          rings={4} // amount of rings in the occlusion sampling pattern
          distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
          distanceFalloff={0.0} // distance falloff. min: 0, max: 1
          rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
          rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
          luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
          radius={20} // occlusion sampling radius
          scale={0.5} // scale of the ambient occlusion
          bias={0.1} // occlusion bias
          intensity={12}
        />
        <SMAA />
      </EffectComposer>
      <ExportModels />
    </Canvas>
  );
};

export default ResidenceCanvas;
