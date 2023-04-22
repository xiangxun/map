/* eslint-disable react/jsx-key */
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import {
  CloudDownloadOutlined,
  FormatPainterOutlined,
  MenuUnfoldOutlined,
  SwitcherOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Solution from "./components/Solution";

import SaveSolution from "@/components/SaveSolution";
import { ParkModel, ParkModel03 } from "@/components/importModels";
import ResidenceCanvas from "./canvas/ResidenceCanvas";
import Lights from "./components/Lights";
import ParameterInputs from "./components/ParameterInputs";
import RenderMode from "./components/RenderMode";
import levaTheme from "@/assets/json/levaTheme.json";
import ModelInfo from "@/components/modelInfo";
import NightingaleChart from "./echarts/NightingaleChart";

const Residence = () => {
  const [showLeva, setShowLeva] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parkRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  // console.log("activeTab", activeTab);

  const handlerExportModels = () => {
    console.log("exportModels");
    // parkRef.current.exportGLB();
    // parkRef.current.sayHello();
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* 顶栏 */}
      <div className=' bg-blue-600 py-3 shadow-xl border-gray-900 z-20 '>
        <div className='px-4 mx-auto sm:px-6 lg:px-12 text-white text-xs '>
          智慧住宅方案生成 Smart Residence Planning
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
        </div>
        {/* 左边栏 */}
        <div className=' relative bg-white w-[400px] p-1  hidden sm:block shadow-md'>
          <div className='flex flex-col p-1'>
            <div className=' w-auto h-[300px] bg-slate-200 p-1 '>图例一</div>
            <div className=' w-auto h-[300px] bg-slate-200 p-1'>图例二</div>
            <div className='p-2 bg-center'>
              <NightingaleChart />
            </div>
          </div>
          {/* <div className='mx-auto'>
            {[
              // 全局参数
              <ParameterInputs />,
              // 渲染模式
              <RenderMode />,
              // leva GUI
              <Leva theme={levaTheme} fill hidden={activeTab == 0}></Leva>,
            ].map((item, index) => {
              return <div key={index}>{index === activeTab && item}</div>;
            })}
          </div> */}
        </div>
        {/* <div className='container absolute z-10 w-auto px-2 py-4 mx-auto left-[350px]'>
          <Leva theme={levaTheme} fill hidden={showLeva}></Leva>
        </div> */}

        {/* 主内容区 */}
        <div className='relative flex-grow p-6 bg-gray-200 shadow-lg'>
          <div className='w-full h-full absolute top-0 left-0'>
            <ResidenceCanvas />
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
        {/* <div className='bg-white w-[300px] p-3 hidden lg:block shadow-lg'>
          <div className='container z-10 w-auto  mx-auto flex flex-col justify-between'>
            <SaveSolution />
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default Residence;
