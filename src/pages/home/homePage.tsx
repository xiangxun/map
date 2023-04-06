import React, { FC, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Card } from "antd";
import EarthCanvas from "./canvas/Earth";
import { city, city1, park, park1 } from "@/assets";
const { Meta } = Card;

const HomePage = () => {
  return (
    <>
      <main className='bg-gray-100 py-24 selection:bg-blue-700  selection:text-white'>
        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          {/* <div className='grid grid-cols-2 gap-6 h-full'> */}
          <div className='flex flex-wrap gap-20'>
            <div className=''>
              <h1 className='text-4xl font-bold leading-tight'>
                建筑师智能助手
              </h1>
              <p className='text-gray-700 mb-8'>
                Architectural Intelligent Assistant
              </p>
              {/* <p className='text-gray-700 mb-8'>M.A.P master archi partner</p> */}
              <p className='text-gray-700 text-lg'>
                致力于用最新的人工智能与算法应用打造建筑师的AI助手，在云端实现从方案设计到出图汇报的全流程赋能
              </p>
              <p className='text-gray-700 mb-12 text-sm'>
                Committing to utilizing the latest artificial intelligence and
                algorithm applications to create an AI assistant for architects,
                <br></br>
                empowering the entire process from design to drawing and
                reporting through cloud technology.
              </p>
              {/* <div className=' grid grid-cols-2 gap-6 py-4'> */}
              <div className='flex flex-wrap gap-20 pt-15'>
                <Card
                  hoverable
                  style={{ width: 1000 }}
                  cover={
                    <Image
                      src={park1}
                      alt='产业园区'
                      width={500}
                      height={500}
                      className='w-2/3 border-2'
                      priority // add this property if the image is above the fold
                    />
                  }
                >
                  {/* <Meta title='产业园区' description='产业园区' /> */}
                  <Meta
                    className='p-2'
                    title='产业园区智能建筑方案：'
                    description='利用专业建筑师与算法工程师联手开发的智能几何算法库，根据给定指标自动生成符合建筑规范要求的产业园区建筑方案。'
                  />
                  <Link href='/park'>
                    <button className='px-4 py-2 mt-4 w-full text-center  border-2  rounded  bg-blue-700 text-white hover:bg-blue-900'>
                      Enter
                    </button>
                  </Link>
                </Card>
                <Card
                  hoverable
                  style={{ width: 1000 }}
                  cover={
                    <Image
                      src={city1}
                      alt='产业园区智能规划方案'
                      width={500}
                      height={500}
                      className='w-2/3 border-2'
                      priority // add this property if the image is above the fold
                    />
                  }
                >
                  {/* <Meta title='城市生成' description='城市生成' /> */}
                  <Meta
                    className='p-2'
                    title='产业园区智能规划方案：'
                    description='基于智能建筑方案算法库，根据专业建筑师的城市设计经验和相关规范指标，快速生成城市尺度的产业园区规划方案。'
                  />
                  <Link href='/city'>
                    <button className='px-4 py-2 mt-4 w-full text-center  border-2  rounded  bg-blue-700 text-white hover:bg-blue-900'>
                      Enter
                    </button>
                  </Link>
                </Card>
              </div>
            </div>
            {/* <div>
              <div className=' xl:h-auto'>
                <EarthCanvas />
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
};
export default HomePage;
