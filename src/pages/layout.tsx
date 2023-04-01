// import { UnorderedListOutlined } from "@ant-design/icons";
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
import Lights from "@/pages/park/components/Lights";
import {
  ProfileTwoTone,
  SkinTwoTone,
  UnorderedListOutlined,
} from "@ant-design/icons";

const LayoutTest = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* 顶栏 */}
      <div className=' bg-blue-600 py-3 shadow-lg border-gray-900'>
        <div className='px-4 mx-auto sm:px-6 lg:px-12 text-white text-xs z-20'>
          智慧园区单地块方案生成 Smart Park Planning
        </div>
      </div>
      <div className='relative flex-grow flex'>
        {/* 左边栏 */}
        <div className='bg-gray-200 p-4  shadow-lg'>
          <UnorderedListOutlined />
        </div>
        <div className='bg-gray-100 w-[300px] p-6 hidden sm:block shadow-lg'></div>

        {/* 主内容区 */}
        <div className='relative flex-grow p-6 bg-gray-200 shadow-lg'>
          <div className='w-full h-full absolute top-0 left-0'>
            <Canvas
              gl={{ preserveDrawingBuffer: true }}
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
                      // visibleEdgeColor={"#FFFFFF"}
                      // hiddenEdgeColor={256}
                      edgeStrength={10}
                    />
                    <SMAA />
                    <SSAO />
                  </EffectComposer>
                  <RhinoModel0316 castShadow receiveShadow />
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

                {/* <Environment preset="sunset" /> */}
              </Suspense>
              <GizmoHelper
                alignment='bottom-right'
                margin={[80, 80]}
                renderPriority={2}
              >
                <GizmoViewport
                  axisColors={["hotpink", "aquamarine", "#3498DB"]}
                  labelColor='black'
                />
              </GizmoHelper>
            </Canvas>
          </div>
          <div className='absolute bottom-1 left-0 right-0 text-center'>
            <p className='text-xs mx-auto text-white'>
              This is a small text at the bottom.
            </p>
          </div>
        </div>
        {/* 右边栏 */}
        <div className='bg-gray-100 w-[300px] p-6 hidden sm:block shadow-lg'></div>
      </div>
    </div>
  );
};

export default LayoutTest;
