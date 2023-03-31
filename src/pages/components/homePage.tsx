import React, { FC, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Card } from "antd";
import EarthCanvas from "./canvas/Earth";
import { city, park } from "@/assets";
const { Meta } = Card;

const HomePage = () => {
  return (
    <>
      <main className='bg-gray-100 py-24 selection:bg-gray-600  selection:text-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 gap-6 h-full'>
            <div>
              <h1 className='text-4xl font-bold leading-tight mb-4  '>
                建筑师智能助手
              </h1>
              <p className='text-gray-700 mb-8'>M.A.P master archi partner</p>
              <p className='text-gray-700 mb-8'>
                致力于用最新的人工智能与算法应用打造建筑师的AI助手，在云端实现从方案设计到出图汇报的全流程赋能
              </p>
              <div className=' grid grid-cols-2 gap-6 py-4'>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <Image
                      src={park}
                      alt='产业园区'
                      width={500}
                      height={500}
                      className='w-2/3 rounded-lg shadow-md'
                      priority // add this property if the image is above the fold
                    />
                  }
                >
                  <Meta title='产业园区' description='产业园区' />
                  <div className='px-4 py-2 mt-4 w-full text-center text-blue-700 border-2 bg-white rounded  hover:bg-blue-700 hover:text-white'>
                    <Link href='/park'>Enter</Link>
                  </div>
                </Card>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <Image
                      src={city}
                      alt='城市生成'
                      width={500}
                      height={500}
                      className='w-2/3 rounded-lg shadow-md'
                      priority // add this property if the image is above the fold
                    />
                  }
                >
                  <Meta title='城市生成' description='城市生成' />
                  <div className='px-4 py-2 mt-4 w-full text-center text-blue-700 border-2 bg-white rounded  hover:bg-blue-700 hover:text-white'>
                    <Link href='/city'>Enter</Link>
                  </div>
                </Card>
              </div>
            </div>
            <div>
              <div className='bg-gray-100'>
                <div className='xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden'>
                  <div className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
                    <EarthCanvas />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default HomePage;
