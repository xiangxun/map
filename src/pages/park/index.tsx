/* eslint-disable react/jsx-key */
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Bounds,
  OrbitControls,
  Sky,
  GizmoHelper,
  GizmoViewport,
  Environment,
  ContactShadows,
  GizmoViewcube,
} from "@react-three/drei";
import {
  EffectComposer,
  SSAO,
  SMAA,
  Selection,
  Outline,
  Bloom,
  Select,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
//
// import { Leva } from "leva";
import {
  CloudDownloadOutlined,
  FormatPainterOutlined,
  MenuUnfoldOutlined,
  SwitcherOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Solution from "./components/Solution";

import SaveSolution from "@/components/SaveSolution";
import { GenModel, ParkModel00 } from "@/components/importModels";
import Lights from "./components/Lights";
import ParameterInputs from "./components/ParameterInputs";
import RenderMode from "@/components/RanderMode";
import levaTheme from "@/assets/json/levaTheme.json";
import { useDispatch } from "react-redux";
import { logo } from "@/assets";

// export const CanvasContext = createContext(null);
const Park = () => {
  // const [canvasRef, setCanvasRef] =
  //   useState<React.RefObject<HTMLCanvasElement> | null>(null);

  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parkRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  console.log("activeTab", activeTab);

  // useEffect(() => {
  //   // dispatch setCanvasRef action on component mount
  //   // setCanvasRef(canvasRef);
  //   dispatch({ type: "SET_CANVAS_REF", payload: canvasRef });
  // }, [dispatch]);

  const handlerExportModels = () => {
    console.log("exportModels");
    parkRef.current.exportGLB();
    // parkRef.current.sayHello();
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* 顶栏 */}
      <div className=' bg-blue-600 py-3 shadow-xl border-gray-900  z-20 '>
        <div className='flex flex-row items-center px-4 mx-auto sm:px-6 lg:px-12'>
          <Link href='/'>
            <Image src={logo} alt='logo' className='w-5 h-5' />
          </Link>
          <div className='text-white text-xs ml-2'>
            智慧园区单地块方案生成 Smart Park Planning
          </div>
        </div>
      </div>
      <div className=' flex-grow flex'>
        {/* 左边栏 icon*/}
        <div className='relative bg-white p-4  shadow-lg'>
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
            {/* <CanvasContext.Provider value={canvasRef}> */}
            <Canvas
              gl={{ preserveDrawingBuffer: true }}
              ref={canvasRef}
              shadows
              camera={{ position: [200, 200, 200], fov: 60, far: 2000 }}
            >
              {/* <OrbitControls autoRotate maxDistance={350} /> */}
              <OrbitControls />
              <Lights />
              {/* <axesHelper args={[500]} />
              <gridHelper
                args={[500, 20, "yellow", "grey"]}
                onClick={(e) => {
                  console.log("gridHelper", e);
                }}
              /> */}
              {/* <Sky distance={4500} sunPosition={[200, 500, 200]} /> */}
              <Suspense>
                {/* <Tree /> */}
                <Selection>
                  <EffectComposer multisampling={0} autoClear={false}>
                    <Outline
                      blendFunction={BlendFunction.ALPHA}
                      selectionLayer={1}
                      visibleEdgeColor={0x464646}
                      hiddenEdgeColor={0x464646}
                      edgeStrength={10}
                    />
                    {/* <Bloom /> */}
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
                      intensity={30}
                    />
                    <SMAA />
                  </EffectComposer>
                  <ParkModel00 ref={parkRef} position={[0, -40.1, 0]} />
                  <GenModel ref={parkRef} />
                </Selection>
              </Suspense>
              <GizmoHelper
                alignment='bottom-right'
                margin={[80, 80]}
                renderPriority={2}
              >
                <GizmoViewcube
                  font='normal 40px Source Sans Pro '
                  opacity={0.9}
                  color='white'
                  hoverColor='hotpink'
                  textColor='black'
                  strokeColor='black'
                  onClick={(e) => null}
                  faces={["右", "左", "上", "下", "前", "后"]}
                />
              </GizmoHelper>
            </Canvas>
            {/* </CanvasContext.Provider> */}
          </div>
          <div className='absolute bottom-1 left-0 right-0 text-center'>
            <p className='text-xs mx-auto text-white'>Smart Park Planning</p>
          </div>
        </div>
        {/* 右边栏 */}
        <div className='relative bg-white w-[300px] p-2 hidden lg:block shadow-lg'>
          <div className='container z-10 w-auto  mx-auto '>
            <SaveSolution canvasRef={canvasRef} />
            {/* <div className=' border'>
              <div className='p-3 text-lg font-bold'>方案一</div>
              <Solution canvasRef={canvasRef} />
            </div>
            <div className=' border'>
              <div className='p-3 text-lg font-bold'>方案二</div>
              <Solution canvasRef={canvasRef} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Park;
