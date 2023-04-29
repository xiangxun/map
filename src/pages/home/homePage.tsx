import React from "react";
import {
  city,
  city01,
  city02,
  facade01,
  facade02,
  park,
  park01,
  park02,
  residence01,
  residence02,
} from "@/assets";
import Card from "./card";

const CardList = [
  {
    image1: park01,
    image2: park02,
    link: "/park",
    title: "产业园区智能建筑方案",
    description:
      "利用专业建筑师与算法工程师联手开发的智能几何算法库，根据给定指标自动生成符合建筑规范要求的产业园区建筑方案。",
  },
  {
    image1: city01,
    image2: city02,
    link: "/city",
    title: "产业园区智能规划方案",
    description:
      "基于智能建筑方案算法库，根据专业建筑师的城市设计经验和相关规范指标，快速生成城市尺度的产业园区规划方案。",
  },
  {
    image1: facade01,
    image2: facade02,
    link: "/facade",
    title: "立面细部快速生成",
    description:
      "基于传入系统的基础体量根据算法快速生成指定风格的立面，生成结果具备一定的细节并具有生成效果图潜质。",
  },
  {
    image1: residence01,
    image2: residence02,
    link: "/residence",
    title: "住宅小区方案快速生成",
    description:
      "基于传入系统的场地红线及规划信息，使用四代住宅库中的模型，根据算法快速生成合理的四代住宅布局。",
  },
];

const HomePage = () => {
  return (
    <>
      <main className=' bg-gray-100 py-24 selection:bg-blue-700  selection:text-white'>
        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8  flex flex-col lg:flex-row gap-20'>
          <div className='flex flex-col justify-center w-full'>
            <h1 className='text-4xl font-bold leading-tight mb-2'>
              建筑师智能助手
            </h1>
            <p className='text-gray-700 mb-8'>
              Architectural Intelligent Assistant
            </p>
            <p className='text-gray-700 text-lg mb-2'>
              致力于用最新的人工智能与算法应用打造建筑师的AI助手，在云端实现从方案设计到出图汇报的全流程赋能
            </p>

            <p className='text-gray-700 mb-12 text-sm'>
              Committing to utilizing the latest artificial intelligence and
              algorithm applications to create an AI assistant for architects,
              <br></br>
              empowering the entire process from design to drawing and reporting
              through cloud technology.
            </p>
            <div className='flex flex-col gap-8 lg:flex-shrink-0'>
              {CardList.map((item, index) => (
                <Card data={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default HomePage;
