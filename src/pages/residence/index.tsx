/* eslint-disable react/jsx-key */
import Link from "next/link";
import Image from "next/image";
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import {
  CloudDownloadOutlined,
  FormatPainterOutlined,
  StarOutlined,
  SwitcherOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

//
import SaveSolution from "@/components/SaveSolution";
import ResidenceCanvas from "./canvas/ResidenceCanvas";
import ResidenceCanvas01 from "./canvas/ResidenceCanvas01";
import ParameterInputs from "./components/ParameterInputs";
import RenderMode from "./components/RenderMode";
import ModelInfo from "@/components/modelInfo";
import ExportModels from "@/components/exportModels";
import { logo } from "@/assets";

const Residence = () => {
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
            <ResidenceCanvas />
            {/* <ExportModels parkRef={parkRef} /> */}
          </div>
          <div>
            <ModelInfo />
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
