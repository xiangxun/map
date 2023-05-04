/* eslint-disable react/jsx-key */
import Link from "next/link";
import Image from "next/image";
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import {
  CloudDownloadOutlined,
  FormatPainterOutlined,
  SwitcherOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

//
import SaveSolution from "@/components/SaveSolution";
import ParameterInputs from "./components/ParameterInputs";
import RenderMode from "./components/RenderMode";
import ModelInfo from "@/components/modelInfo";
import ExportModels from "@/components/exportModels";
import FacadeCanvas from "./canvas/FacadeCanvas";
import { logo } from "@/assets";

const Facade = () => {
  const [showLeva, setShowLeva] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const residenceRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  // console.log("activeTab", activeTab);

  const handlerExportModels = () => {
    console.log("exportModels");
    // residenceRef.current.exportGLB();
    residenceRef.current.sayHello();
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
            立面细部快速生成 Smart Facade Planning
          </div>
        </div>
      </div>
      <div className=' flex-grow flex'>
        {/* 左边栏 icon*/}
        <div className='relative bg-white p-3 shadow-lg'>
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
        <div className='relative bg-white w-[250px] p-1  hidden sm:block shadow-md'>
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
            <FacadeCanvas />
            {/* <ExportModels parkRef={parkRef} /> */}
          </div>
          <div>
            <ModelInfo />
          </div>
          <div className='absolute bottom-1 left-0 right-0 text-center'>
            <p className='text-xs mx-auto text-white'>Smart Facade Planning</p>
          </div>
        </div>
        {/* 右边栏 */}
        {/* <div className='relative bg-white w-[300px] p-2 hidden lg:block shadow-lg'>
          <div className='container z-10 w-auto  mx-auto '>
            <SaveSolution canvasRef={canvasRef} />
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default Facade;
