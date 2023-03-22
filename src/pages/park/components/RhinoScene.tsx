import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  OrbitControls,
  Sky,
  GizmoHelper,
  GizmoViewport,
  Environment,
} from "@react-three/drei";
import {
  EffectComposer,
  SSAO,
  SMAA,
  Selection,
  Outline,
} from "@react-three/postprocessing";
import { RhinoModel } from "../../../components/RhinoModel";
import { Lights } from "./Lights";
import { Tree } from "../../../components/Tree";
import { RhinoModel0316 } from "./../../../components/RhinoModel0316";

export const RhinoScene = () => {
  return (
    <Canvas
      pixelratio={window.devicePixelRatio}
      shadows
      alpha="true"
      antialias="true"
      camera={{ position: [-200, 200, -200], fov: 60, far: 5000 }}
    >
      <OrbitControls />
      <Lights />
      {/* <Sky distance={4500} sunPosition={[200, 500, 200]} /> */}
      <Cube />
      <Suspense>
        <Tree />
        <Robot castShadow receiveShadow />
        {/* <RhinoModel castShadow receiveShadow /> */}
        <Selection>
          <EffectComposer multisampling={0} autoClear={false}>
            {/* <SSAO
              radius={0.05}
              intensity={150}
              luminanceInfluence={0.5}
              color="black"
            /> */}
            <Outline
              // visibleEdgeColor="#AFF"
              visibleEdgeColor="#AAA"
              hiddenEdgeColor="#FFF"
              // blur
              edgeStrength={10}
              renderOrder={-1}
            />
            <SMAA preset="ultra" />
            {/* <Bounds fit clip margin={1.2} damping={0}> */}
            <RhinoModel0316 castShadow receiveShadow />
            {/* </Bounds> */}
          </EffectComposer>
        </Selection>
        {/* <Environment preset="sunset" /> */}
      </Suspense>
      <GizmoHelper
        alignment="bottom-right"
        margin={[80, 80]}
        renderPriority={2}
      >
        <GizmoViewport
          axisColors={["hotpink", "aquamarine", "#3498DB"]}
          labelColor="black"
        />
      </GizmoHelper>
    </Canvas>
  );
};
