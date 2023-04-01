import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Bounds,
  OrbitControls,
  Sky,
  GizmoHelper,
  GizmoViewport,
  Environment,
  ContactShadows,
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
import ParkModel01 from "@/components/ParkModel01";
import ParkModel03 from "@/components/ParkModel03";
import Lights from "./components/Lights";
import ParameterInputs from "./components/ParameterInputs";
import { Leva } from "leva";
import {
  ProfileTwoTone,
  SkinTwoTone,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Solution from "./components/Solution";
import { File3dm, Mesh } from "rhino3dm";
import Navbar from "../components/navbar";
import { Button } from "antd";
// import { Rhino3dmExporter } from 'three-stdlib/jsm/exporters/Rhino3dmExporter';

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
  const [showParameterInputs, setShowParameterInputs] = useState(false);
  const [showLeva, setShowLeva] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className='flex flex-col h-screen'>
      {/* 顶栏 */}
      <div className=' bg-blue-600 py-3 shadow-xl border-gray-900  z-20 '>
        <div className='px-4 mx-auto sm:px-6 lg:px-12 text-white text-xs '>
          智慧园区单地块方案生成 Smart Park Planning
        </div>
      </div>
      <div className=' flex-grow flex'>
        {/* 左边栏 */}
        <div className='relative bg-white p-4  shadow-lg'>
          <div>
            <UnorderedListOutlined
              onClick={() => setShowParameterInputs(!showParameterInputs)}
            />
          </div>
          <div>
            <SkinTwoTone onClick={() => setShowLeva(!showLeva)} />
          </div>
        </div>
        <div className='relative bg-white w-[300px] p-1 hidden sm:block shadow-md'>
          {/* 全局参数 */}

          <div className='mx-auto'>
            {!showParameterInputs && <ParameterInputs />}
          </div>

          {/* 生成方案 */}
          <div className='absolute bottom-5 left-0 right-0 flex justify-center items-center'>
            <div className='w-64'>
              <Button
                block
                type='primary'
                className='font-bold text-white bg-blue-500 hover:bg-blue-700 sm:w-full'
                // onClick={() => submit({ onResultChange: setResult })}
                // onClick={submit}
              >
                确定
              </Button>
            </div>
          </div>
        </div>
        <div className='container absolute z-10 w-auto px-2 py-4 mx-auto left-[350px]'>
          <Leva theme={levaTheme} fill hidden={showLeva}></Leva>
        </div>

        {/* 主内容区 */}
        <div className='relative flex-grow p-6 bg-gray-200 shadow-lg'>
          <div className='w-full h-full absolute top-0 left-0'>
            <Canvas
              gl={{ preserveDrawingBuffer: true }}
              ref={canvasRef}
              shadows
              camera={{ position: [-250, 250, 0], fov: 60, far: 2000 }}
            >
              <OrbitControls autoRotate maxDistance={350} />
              {/* <OrbitControls maxDistance={350} /> */}
              <Lights />
              {/* <Sky distance={4500} sunPosition={[200, 500, 200]} /> */}
              <Suspense>
                <Tree />
                <Selection>
                  <EffectComposer multisampling={0} autoClear={false}>
                    <Outline
                      // visibleEdgeColor={"#FFFFFF"}
                      // hiddenEdgeColor={256}
                      edgeStrength={10}
                    />
                    <SMAA />
                    <SSAO />
                  </EffectComposer>
                  {/* <RhinoModel0316 castShadow receiveShadow /> */}
                  <ParkModel03 castShadow receiveShadow />
                  <ContactShadows
                    rotation-x={Math.PI / 2}
                    position={[200, 200, 0]}
                    opacity={1.0}
                    width={1000}
                    height={1000}
                    blur={2}
                    far={200}
                  />
                </Selection>

                <Environment preset='sunset' />
              </Suspense>
              {/* <GizmoHelper
                alignment='bottom-right'
                margin={[80, 80]}
                renderPriority={2}
              >
                <GizmoViewport
                  axisColors={["hotpink", "aquamarine", "#3498DB"]}
                  labelColor='black'
                />
              </GizmoHelper> */}
            </Canvas>
          </div>
          <div className='absolute bottom-1 left-0 right-0 text-center'>
            <p className='text-xs mx-auto text-white'>Smart Park Planning</p>
          </div>
        </div>
        {/* 右边栏 */}
        <div className='bg-white w-[300px] p-3 hidden lg:block shadow-lg'>
          <div className='container z-10 w-auto  mx-auto flex flex-col justify-between'>
            <div className=' border'>
              <div className='p-3 text-lg font-bold'>方案一</div>
              <Solution canvasRef={canvasRef} />
            </div>
            <div className=' border'>
              <div className='p-3 text-lg font-bold'>方案二</div>
              <Solution canvasRef={canvasRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Park;
