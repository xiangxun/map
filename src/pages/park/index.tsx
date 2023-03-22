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
//
import { Tree } from "@/components/Tree";
import RhinoModel0316 from "@/components/RhinoModel0316";
import { Lights } from "./components/Lights";
import { ParameterInputs } from "./components/ParameterInputs";

const Park = () => {
  return (
    <div className="relative h-screen">
      <div className="container absolute z-10 w-auto px-6 py-4 mx-auto">
        <ParameterInputs />
      </div>
      <div className="absolute inset-0 h-full">
        <Canvas
          shadows
          camera={{ position: [-200, 200, -200], fov: 60, far: 5000 }}
        >
          <OrbitControls />
          <Lights />
          {/* <Sky distance={4500} sunPosition={[200, 500, 200]} /> */}
          <Suspense>
            <Tree />
            <Selection>
              <EffectComposer multisampling={0} autoClear={false}>
                <Outline
                  // visibleEdgeColor={#FFF}
                  // hiddenEdgeColor={#FFF}
                  edgeStrength={10}
                />
                <SMAA />
                <RhinoModel0316 castShadow receiveShadow />
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
      </div>
    </div>
  );
};
export default Park;
