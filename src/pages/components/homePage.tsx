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
        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          {/* <div className='grid grid-cols-2 gap-6 h-full'> */}
          <div className='flex flex-wrap gap-20'>
            <div className='w-[600px]'>
              <h1 className='text-4xl font-bold leading-tight mb-4  '>
                建筑师智能助手
              </h1>
              <p className='text-gray-700 mb-8'>M.A.P master archi partner</p>
              <p className='text-gray-700 mb-8'>
                致力于用最新的人工智能与算法应用打造建筑师的AI助手，在云端实现从方案设计到出图汇报的全流程赋能
              </p>
              {/* <div className=' grid grid-cols-2 gap-6 py-4'> */}
              <div className='flex flex-wrap gap-20'>
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
                  <Link href='/park'>
                    <button className='px-4 py-2 mt-4 w-full text-center text-blue-700 border-2 bg-white rounded  hover:bg-blue-700 hover:text-white'>
                      Enter
                    </button>
                  </Link>
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
                  <Link href='/city'>
                    <button className='px-4 py-2 mt-4 w-full text-center text-blue-700 border-2 bg-white rounded  hover:bg-blue-700 hover:text-white'>
                      Enter
                    </button>
                  </Link>
                </Card>
              </div>
            </div>
            <div>
              <div className=' xl:h-auto'>
                <EarthCanvas />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default HomePage;
