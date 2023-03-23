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
import IndexTable from "./components/IndexTable";
import { Leva } from "leva";
const levaTheme = {
  colors: {
    elevation1: "#ffeeff",
    elevation2: "#eeeeee",
    elevation3: "#ffffff",
    accent1: "#0066dc",
    accent2: "#007bff",
    accent3: "#3c93ff",
    highlight1: "#0051ff",
    highlight2: "#0040ff",
    highlight3: "#73b1b1",
    vivid1: "#ffcc00",
  },
  radii: {
    xs: "2px",
    sm: "3px",
    lg: "10px",
  },
  space: {
    sm: "6px",
    md: "10px",
    rowGap: "7px",
    colGap: "7px",
  },
  fontSizes: {
    root: "11px",
  },
  sizes: {
    rootWidth: "280px",
    controlWidth: "160px",
    scrubberWidth: "8px",
    scrubberHeight: "16px",
    rowHeight: "24px",
    folderHeight: "20px",
    checkboxSize: "16px",
    joystickWidth: "100px",
    joystickHeight: "100px",
    colorPickerWidth: "160px",
    colorPickerHeight: "100px",
    monitorHeight: "60px",
    titleBarHeight: "39px",
  },
  borderWidths: {
    root: "0px",
    input: "1px",
    focus: "1px",
    hover: "1px",
    active: "1px",
    folder: "1px",
  },
  fontWeights: {
    label: "normal",
    folder: "normal",
    button: "normal",
  },
};

const Park = () => {
  return (
    <div className="relative w-screen h-screen">
      <div className="container absolute z-10 w-auto px-6 py-4 mx-auto">
        <ParameterInputs />
      </div>
      <div className="container absolute z-10 w-auto px-6 py-4 mx-auto top-4 right-4">
        <IndexTable />
        <Leva theme={levaTheme} fill></Leva>;
      </div>
      <div className="absolute inset-0 h-full">
        <Canvas
          shadows
          camera={{ position: [-150, 150, 0], fov: 60, far: 2000 }}
        >
          <OrbitControls maxDistance={300} />
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
