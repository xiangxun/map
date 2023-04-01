import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Col,
  InputNumber,
  Row,
  Slider,
  Space,
  Input,
  Divider,
  Button,
  Select,
} from "antd";

const ParameterInputs: React.FC = () => {
  const dispatch = useDispatch();

  const [cityType, setCityType] = useState("Center");
  const [volumeRate, setvolumeRate] = useState("high");
  const [gridDensity, setGridDensity] = useState(6);
  const [roadDensity, setRoadDensity] = useState(7.5);
  const [greenRate, setGreenRate] = useState(0.24);

  // const [isMounted, setIsMounted] = useState(false);
  // const jsonData = {
  // 	TOWER_AREA: towerArea,
  // 	SKIRT_AREA: skirtArea,
  // 	TOWER_MODE: towerMode,
  // 	// SKIRT_HEIGHT: skirtHeight,
  // };
  const jsonData = {
    grid_density: gridDensity,
    road_density: roadDensity,
    green_rate: greenRate,
    control_pt: cityType,
    MODE: volumeRate,
  };
  const submit = async () => {
    // 发送 POST 请求并获取数据
    const response = await fetch("http://192.168.1.23:5002/cal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData), // 用你的请求数据替换
    });
    const data = await response.json();

    // 分发 action，将数据作为 payload
    dispatch({ type: "SET_DATA", payload: data });
    console.log("data dispatch", data);
  };

  return (
    <div className='flex items-left justify-left '>
      <div className='max-w-lg'>
        <div className='px-8 pt-6 pb-8 mb-4 bg-white'>
          <div>
            <h1 className='text-lg font-bold '>全局参数</h1>
          </div>
          <Divider />
          <Space
            style={{
              width: "100%",
            }}
            direction='vertical'
          >
            {/* 城市类型 */}
            <Row>
              <Col span={12}>
                <label>城市类型：</label>
              </Col>
              <Col span={12}>
                <Select
                  defaultValue='中心城区'
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  onChange={(v) => setCityType(v)}
                  options={[
                    {
                      value: "Center",
                      label: "中心城区",
                    },
                    {
                      value: "Random",
                      label: "创意模式",
                    },
                    {
                      value: "Pudong",
                      label: "浦东新区",
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
                <Select
                  defaultValue='高'
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  onChange={(v) => setvolumeRate(v)}
                  options={[
                    {
                      value: "high",
                      label: "高",
                    },
                    {
                      value: "mid",
                      label: "中",
                    },
                    {
                      value: "low",
                      label: "低",
                    },
                  ]}
                />
              </Col>
            </Row>
            {/* 网格数量 */}
            <Row>
              <Col span={12}>
                <label>网格数量：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={5}
                  max={10}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={gridDensity}
                  onChange={(v) => setGridDensity(v!)}
                />
              </Col>
            </Row>
            {/* 路网密度 */}
            <Row>
              <Col span={12}>
                <label>路网密度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={6}
                  max={8}
                  step={0.1}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={roadDensity}
                  onChange={(v) => setRoadDensity(v!)}
                />
              </Col>
            </Row>
            {/* 绿地密度 */}
            <Row>
              <Col span={12}>
                <label>绿地密度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={0.2}
                  max={0.25}
                  step={0.01}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={greenRate}
                  onChange={(v) => setGreenRate(v!)}
                />
              </Col>
            </Row>
            {/* 红线退距 */}
            <Row>
              <Col span={12}>
                <label>红线退距：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={12}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  // value={skirtHeight}
                  // onChange={(v) => setSkirtHeight(v)}
                />
              </Col>
            </Row>
            {/* 塔楼限高 */}
            <Row>
              <Col span={12}>
                <label>塔楼限高：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={100}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  // value={skirtHeight}
                  // onChange={(v) => setSkirtHeight(v)}
                />
              </Col>
            </Row>
            {/* 塔楼标准层高度 */}
            <Row>
              <Col span={12}>
                <label>塔楼标准层高度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={4.2}
                  step={0.1}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  // value={skirtHeight}
                  // onChange={(v) => setSkirtHeight(v)}
                />
              </Col>
            </Row>
            {/* 裙房限高 */}
            <Row>
              <Col span={12}>
                <label>裙房限高：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={24}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  // value={skirtHeight}
                  // onChange={(v) => setSkirtHeight(v)}
                />
              </Col>
            </Row>
            {/* 裙房首层高度 */}
            <Row>
              <Col span={12}>
                <label>裙房首层高度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={6.0}
                  step={0.1}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>

            {/* 裙房标准层高度 */}
            <Row>
              <Col span={12}>
                <label>裙房标准层高度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={5}
                  step={0.1}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{ margin: "0 6px", width: "100%" }}
                />
              </Col>
            </Row>
            {/* 容积率下限 */}
            <Row>
              <Col span={12}>
                <label>容积率下限：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={0.1}
                  max={10.0}
                  defaultValue={1.5}
                  step={0.01}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 容积率上限 */}
            <Row>
              <Col span={12}>
                <label>容积率上限：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={0.1}
                  max={10.0}
                  defaultValue={7.5}
                  step={0.01}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 商业最小间距 */}
            <Row>
              <Col span={12}>
                <label>商业最小间距：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={15}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{ margin: "0 6px", width: "100%" }}
                />
              </Col>
            </Row>
            {/* 主干道宽度  */}
            <Row>
              <Col span={12}>
                <label>主干道宽度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={30}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{ margin: "0 6px", width: "100%" }}
                />
              </Col>
            </Row>
            {/* 次干道宽度  */}
            <Row>
              <Col span={12}>
                <label>次干道宽度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={20}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{ margin: "0 6px", width: "100%" }}
                />
              </Col>
            </Row>
            {/* 三级道路宽度  */}
            <Row>
              <Col span={12}>
                <label>三级道路宽度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={15}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{ margin: "0 6px", width: "100%" }}
                />
              </Col>
            </Row>
            {/* 道路转弯半径  */}
            <Row>
              <Col span={12}>
                <label>道路转弯半径：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={30}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value!.replace("m", "") as any}
                  style={{ margin: "0 6px", width: "100%" }}
                />
              </Col>
            </Row>
            {/* 划分绿地最小面积  */}
            <Row>
              <Col span={12}>
                <label className='text-xs'>划分绿地最小面积：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={100000}
                  defaultValue={1000}
                  formatter={(value) => `${value}m²`}
                  parser={(value) => value!.replace("m²", "") as any}
                  style={{ margin: "0 6px", width: "100%" }}
                />
              </Col>
            </Row>
            {/* 划分园区最小面积 */}
            <Row>
              <Col span={12}>
                <label className='text-xs'>划分园区最小面积：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={100000}
                  defaultValue={5000}
                  formatter={(value) => `${value}m²`}
                  parser={(value) => value!.replace("m²", "") as any}
                  style={{ margin: "0 6px", width: "100%" }}
                />
              </Col>
            </Row>
          </Space>
          <Divider />
          {/* <Button
            block
            type='primary'
            className='font-bold text-white bg-blue-500 hover:bg-blue-700 '
            // onClick={() => submit({ onResultChange: setResult })}
            onClick={submit}
          >
            确定
          </Button> */}
        </div>
      </div>
    </div>
  );
};
export default ParameterInputs;
