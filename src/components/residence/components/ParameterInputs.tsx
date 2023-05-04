import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Space, Divider, Button } from "antd";
const Select = dynamic(() => import("antd").then((antd) => antd.Select), {
  ssr: false,
});
const InputNumber = dynamic(
  () => import("antd").then((antd) => antd.InputNumber),
  { ssr: false }
);
const ParameterInputs: React.FC = () => {
  const dispatch = useDispatch();

  const [mod, setMod] = useState(4);
  const [gfa, setGfa] = useState(6.0);
  const [bcr, setBcr] = useState(0.25);
  const [limitHeight, setLimitHeight] = useState(100);
  const [standardHeight, setStandardHeight] = useState(2.92);
  const [unit, setUnit] = useState(8);
  const [gridTyp, setGridTyp] = useState(1);
  const [recTyp, setRecTyp] = useState(1);
  const [randomGenerate, setRandomGenerate] = useState("True");
  const [BOUND, setBOUND] = useState("SVB");

  // const [isMounted, setIsMounted] = useState(false);
  const jsonData = {
    mod: mod,
    gfa: gfa,
    bcr: bcr,
    limit_height: limitHeight,
    standard_height: standardHeight,
    unit: unit,
    grid_typ: gridTyp,
    rec_typ: recTyp,
    random_generate: randomGenerate,
    BOUND: BOUND,
  };

  const submit = async () => {
    // 发送 POST 请求并获取数据
    const response = await fetch("http://192.168.1.63:5002/residence", {
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
            <h1 className='text-xl font-bold '>全局参数</h1>
          </div>
          <Divider />
          <Space
            className='text-xs'
            style={{
              display: "flex",
              width: "100%",
            }}
            direction='vertical'
          >
            {/* 住宅高度生成模式 */}
            <Row>
              <Col span={12}>
                <label>住宅高度生成模式:</label>
              </Col>
              <Col span={12}>
                <Select
                  defaultValue={0}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  onChange={(v) => setMod(Number(v))}
                  options={[
                    {
                      value: 0,
                      label: "0",
                    },
                    {
                      value: 1,
                      label: "1",
                    },
                    {
                      value: 2,
                      label: "2",
                    },
                    {
                      value: 3,
                      label: "3",
                    },
                  ]}
                />
              </Col>
            </Row>
            {/* 容积率 */}
            <Row>
              <Col span={12}>
                <label>容积率：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={3.0}
                  max={7.0}
                  step={0.1}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={gfa}
                  onChange={(v) => setGfa(Number(v))}
                />
              </Col>
            </Row>
            {/* 建筑密度 */}
            <Row>
              <Col span={12}>
                <label>建筑密度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={0.2}
                  max={0.35}
                  step={0.01}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={bcr}
                  onChange={(v) => setBcr(Number(v))}
                />
              </Col>
            </Row>
            {/* 建筑限高 */}
            <Row>
              <Col span={12}>
                <label>建筑限高：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={60}
                  max={150}
                  step={0.1}
                  formatter={(value) => `${value}m`}
                  parser={(value) => parseFloat(value!.replace("m", ""))}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={limitHeight}
                  onChange={(v) => setLimitHeight(Number(v))}
                />
              </Col>
            </Row>
            {/* 住宅标准层高度 */}
            <Row>
              <Col span={12}>
                <label>住宅标准层高度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={2.5}
                  max={10.0}
                  step={0.01}
                  formatter={(value) => `${value}m`}
                  parser={(value) => parseFloat(value!.replace("m", ""))}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={standardHeight}
                  onChange={(v) => setStandardHeight(Number(v))}
                />
              </Col>
            </Row>
            {/* 网格大小 */}
            <Row>
              <Col span={12}>
                <label>网格大小：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={6.0}
                  max={10.0}
                  step={0.1}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={unit}
                  onChange={(v) => setUnit(Number(v))}
                />
              </Col>
            </Row>
            {/* 网格生成模式 */}
            <Row>
              <Col span={12}>
                <label>网格生成模式：</label>
              </Col>
              <Col span={12}>
                <Select
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "0",
                      label: "0",
                    },
                    {
                      value: "1",
                      label: "1",
                    },
                  ]}
                  value={gridTyp}
                  onChange={(v) => setGridTyp(Number(v))}
                />
              </Col>
            </Row>
            {/* 方向控制模式 */}
            <Row>
              <Col span={12}>
                <label>方向控制模式：</label>
              </Col>
              <Col span={12}>
                <Select
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "0",
                      label: "0",
                    },
                    {
                      value: "1",
                      label: "1",
                    },
                    {
                      value: "2",
                      label: "2",
                    },
                  ]}
                  value={recTyp}
                  onChange={(v) => setRecTyp(Number(v))}
                />
              </Col>
            </Row>
            {/* 是否随机生成 */}
            <Row>
              <Col span={12}>
                <label>是否随机生成：</label>
              </Col>
              <Col span={12}>
                <Select
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "True",
                      label: "是",
                    },
                    {
                      value: "False",
                      label: "否",
                    },
                  ]}
                  value={randomGenerate}
                  onChange={(v) => setRandomGenerate(v as string)}
                />
                {/* <Switch
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  checked={randomGenerate}
                  onChange={(v) => setRandomGenerate(v)}
                /> */}
              </Col>
            </Row>
            {/* 住宅生成模式 */}
            <Row>
              <Col span={12}>
                <label>住宅生成模式：</label>
              </Col>
              <Col span={12}>
                <Select
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "SVB",
                      label: "SVB",
                    },
                    {
                      value: "LEB",
                      label: "LEB",
                    },
                    {
                      value: "MBB",
                      label: "MBB",
                    },
                    {
                      value: "ABB",
                      label: "ABB",
                    },
                  ]}
                  value={BOUND}
                  onChange={(v) => setBOUND(v as string)}
                />
              </Col>
            </Row>
          </Space>
          <Divider />
          <div className='absolute bottom-5 left-0 right-0 flex justify-center items-center'>
            <div className='w-64'>
              <Button
                block
                type='primary'
                className='font-bold text-white bg-blue-500 hover:bg-blue-700 sm:w-full'
                onClick={submit}
              >
                确定
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterInputs;
