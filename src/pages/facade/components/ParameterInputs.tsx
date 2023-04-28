import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// import { Select, InputNumber } from 'antd';

const Select = dynamic(() => import("antd").then((antd) => antd.Select), {
  ssr: false,
});
const InputNumber = dynamic(
  () => import("antd").then((antd) => antd.InputNumber),
  {
    ssr: false,
  }
);

const ParameterInputs: React.FC = () => {
  const dispatch = useDispatch();

  const [randomChoice, setRandomChoice] = useState("True");
  const [modelIndex, setModelIndex] = useState(0);
  const [firstHeight, setFirstHeight] = useState(6.5);
  const [standardHeight, setStandardHeight] = useState(4.5);
  const [unit, setUnit] = useState(4.0);

  const jsonData = {
    random_choice: randomChoice,
    model_index: modelIndex,
    first_height: firstHeight,
    standard_height: standardHeight,
    unit: unit,
  };

  const submit = async () => {
    // 发送 POST 请求并获取数据
    const response = await fetch("http://192.168.1.63:5003/facade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData), // 用你的请求数据替换
    });
    const data = await response.json();

    // 分发 action，将数据作为 payload
    dispatch({ type: "SET_DATA", payload: data });
  };

  return (
    <div className='flex items-left justify-left '>
      <div className='max-w-lg'>
        <div className='p-4 bg-white'>
          <div>
            <h1 className='text-xl font-bold p-2'>全局参数</h1>
          </div>
          <div className='m-4'></div>
          <div className='flex flex-col space-y-4 text-sm p-2'>
            <div className='w-48'>
              <Select
                value={randomChoice}
                onChange={(value) => setRandomChoice(value as string)}
                options={[
                  { value: "True", label: "随机模式" },
                  { value: "False", label: "指定模式" },
                ]}
                className='w-full'
              />
            </div>
            <div className='w-48'>
              <Select
                value={modelIndex}
                onChange={(value) => setModelIndex(value as number)}
                options={[
                  { value: 0, label: 0 },
                  { value: 1, label: 1 },
                  { value: 2, label: 2 },
                  { value: 3, label: 3 },
                  { value: 4, label: 4 },
                  { value: 5, label: 5 },
                  { value: 6, label: 6 },
                  { value: 7, label: 7 },
                  { value: 8, label: 8 },
                  { value: 9, label: 9 },
                  { value: 10, label: 10 },
                ]}
                className='w-full'
              />
            </div>
            {/* 首层高度 */}
            <div className='flex items-center w-48'>
              <label className='mr-2 w-48'>首层高度：</label>
              <InputNumber
                min={2.5}
                max={10.0}
                step={0.01}
                formatter={(value) => `${value}m`}
                parser={(value) => parseFloat(value!.replace("m", ""))}
                className='w-full'
                value={firstHeight}
                onChange={(v) => setFirstHeight(Number(v))}
              />
            </div>
            {/* 标准层高度 */}
            <div className='flex items-center w-48'>
              <label className='mr-2 w-48'>标准层高度：</label>
              <InputNumber
                min={2.5}
                max={10.0}
                step={0.01}
                formatter={(value) => `${value}m`}
                parser={(value) => parseFloat(value!.replace("m", ""))}
                className='w-full'
                value={standardHeight}
                onChange={(v) => setStandardHeight(Number(v))}
              />
            </div>
            {/* 网格大小 */}
            <div className='flex items-center w-48'>
              <label className='mr-2 w-48'>网格大小：</label>
              <InputNumber
                min={2.0}
                max={8.0}
                step={0.1}
                className='w-full'
                value={unit}
                onChange={(v) => setUnit(Number(v))}
              />
            </div>
          </div>

          <div className='absolute bottom-20 left-0 right-0 flex justify-center items-center '>
            <div className=' w-48'>
              <button
                className=' rounded-md p-1 text-sm font-bold text-white bg-blue-500 hover:bg-blue-700 sm:w-full'
                onClick={submit}
              >
                载入模型
              </button>
            </div>
          </div>
          <div className='absolute bottom-10 left-0 right-0 flex justify-center items-center'>
            <div className='w-48'>
              <button
                className=' rounded-md p-1 text-sm font-bold text-white bg-blue-500 hover:bg-blue-700 sm:w-full'
                onClick={submit}
              >
                生成立面
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterInputs;
