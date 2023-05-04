/* eslint-disable react/jsx-key */
import Link from "next/link";
import Image from "next/image";
// import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import {
  CloudDownloadOutlined,
  FormatPainterOutlined,
  StarOutlined,
  SwitcherOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
//
import SaveSolution from "@/components/SaveSolution";
import ResidenceCanvas from "./canvas/ResidenceCanvas";
import ResidenceCanvas01 from "./canvas/ResidenceCanvas01";
import ParameterInputs from "./components/ParameterInputs";
import RenderMode from "./components/RenderMode";
import ModelInfo from "@/components/modelInfo";
import ExportModels from "@/components/exportModels";
import { logo } from "@/assets";
import { GenModel, ParkModel00 } from "@/components/importModels";

const Residence = () => {
  const [showLeva, setShowLeva] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const residenceRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  // console.log("activeTab", activeTab);

  const handlerExportModels = () => {
    console.log("exportModels");
    residenceRef.current.exportGLB();
    // residenceRef.current.sayHello();
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* 顶栏 */}
      <div className=' bg-blue-600 py-3 shadow-xl border-gray-900 z-20 '>
        <div className='flex flex-row items-center px-4 mx-auto sm:px-6 lg:px-12'>
          <Link href='/'>
            <Image src={logo} alt='logo' className='w-5 h-5' />
          </Link>
          <div className='text-white text-xs ml-2'>
            智慧住宅方案生成 Smart Residence Planning
          </div>
        </div>
      </div>
      <div className=' flex-grow flex'>
        {/* 左边栏 icon*/}
        <div className='relative bg-white p-4 shadow-lg'>
          {[
            // 全局参数
            <UnorderedListOutlined />,
            // 渲染模式
            <SwitcherOutlined />,
            // leva GUI
            <FormatPainterOutlined />,
          ].map((icon, index) => {
            return (
              <div
                onClick={() => setActiveTab(index)}
                key={index}
                className={`${
                  index === activeTab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                // className='flex flex-col items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-200'
              >
                {icon}
              </div>
            );
          })}

          <div className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'>
            <CloudDownloadOutlined onClick={handlerExportModels} />
          </div>
          <div className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'>
            <Link href={"/residence/show"}>
              <StarOutlined />
            </Link>
          </div>
        </div>
        {/* 左边栏 */}
        <div className='relative bg-white w-[300px] p-1  hidden sm:block shadow-md'>
          <div className='mx-auto'>
            {[
              // 全局参数
              <ParameterInputs />,
              // 渲染模式
              <RenderMode />,
              // leva GUI
              <div>1</div>,
              // <Leva theme={levaTheme} fill hidden={activeTab == 0}></Leva>,
            ].map((item, index) => {
              return <div key={index}>{index === activeTab && item}</div>;
            })}
          </div>
        </div>

        {/* 主内容区 */}
        <div className='relative flex-grow p-6 bg-gray-200 shadow-lg'>
          <div className='w-full h-full absolute top-0 left-0'>
            {/* <ResidenceCanvas /> */}
            <Canvas
              gl={{ preserveDrawingBuffer: true }}
              ref={canvasRef}
              shadows
              camera={{ position: [200, 200, 200], fov: 45, far: 2000 }}
            >
              <OrbitControls autoRotate />
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
                <GenModel ref={residenceRef} />
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
          </div>

          <div className='absolute bottom-1 left-0 right-0 text-center'>
            <p className='text-xs mx-auto text-white'>
              Smart Residence Planning
            </p>
          </div>
        </div>
        {/* 右边栏 */}
        <div className='relative bg-white w-[300px] p-2 hidden lg:block shadow-lg'>
          <div className='container z-10 w-auto  mx-auto '>
            <SaveSolution canvasRef={canvasRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Residence;
