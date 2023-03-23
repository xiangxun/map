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

export const ParameterInputs: React.FC = () => {
  // const dispatch = useDispatch();

  const [towerArea, setTowerArea] = useState(50000);
  const [skirtArea, setSkirtArea] = useState(5000);
  const [towerMode, setTowerMode] = useState("AVG");
  const [skirtHeight, setSkirtHeight] = useState(21);
  const [result, setResult] = useState([]);
  // const [isMounted, setIsMounted] = useState(false);
  const jsonData = {
    TOWER_AREA: towerArea,
    SKIRT_AREA: skirtArea,
    TOWER_MODE: towerMode,
    // SKIRT_HEIGHT: skirtHeight,
  };

  const submit = async () => {
    // 发送 POST 请求并获取数据
    const response = await fetch("http://192.168.4.122:5000/cal", {
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
    <div className="flex opacity-90 items-left justify-left ">
      <div className="max-w-lg">
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded-lg shadow-md">
          <div>
            <h1 className="text-3xl font-bold ">全局参数</h1>
          </div>
          <Divider />
          <Space
            style={{
              width: "100%",
            }}
            direction="vertical"
          >
            {/* 塔楼目标面积 */}
            <Row>
              <Col span={10}>
                <label>塔楼目标面积：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000000}
                  // defaultValue={135000}
                  formatter={(value) => `${value}m2`}
                  parser={(value) => value.replace("m2", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={towerArea}
                  onChange={(v) => setTowerArea(v)}
                />
              </Col>
            </Row>

            {/* 塔楼高度生成模式 */}
            <Row>
              <Col span={10}>
                <label>塔楼高度生成模式：</label>
              </Col>
              <Col span={12}>
                <Select
                  defaultValue="平均模式"
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  onChange={(v) => setTowerMode(v)}
                  options={[
                    {
                      value: "AVG",
                      label: "平均模式",
                    },
                    {
                      value: "TALL",
                      label: "限高优先",
                    },
                    {
                      value: "FUNC",
                      label: "功能优先",
                    },
                  ]}
                />
              </Col>
            </Row>
            {/* 裙房目标面积 */}
            <Row>
              <Col span={10}>
                <label>裙房目标面积：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000000}
                  // defaultValue={4000}
                  formatter={(value) => `${value}m2`}
                  parser={(value) => value.replace("m2", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={skirtArea}
                  onChange={(v) => setSkirtArea(v)}
                />
              </Col>
            </Row>
            {/* 裙房高度 */}
            <Row>
              <Col span={10}>
                <label>裙房高度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={21}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  value={skirtHeight}
                  onChange={(v) => setSkirtHeight(v)}
                />
              </Col>
            </Row>
            {/* 塔楼限高 */}
            <Row>
              <Col span={10}>
                <label>塔楼限高：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={100}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 塔楼标准层高度 */}
            <Row>
              <Col span={10}>
                <label>塔楼标准层高度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={4.2}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 塔楼最小单元长度 */}
            <Row>
              <Col span={10}>
                <label>塔楼最小单元长度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={8}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>

            {/* 裙房限高 */}
            <Row>
              <Col span={10}>
                <label>裙房限高：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={24}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 裙房首层高度 */}
            <Row>
              <Col span={10}>
                <label>裙房首层高度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={6}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 裙房标准层高度 */}
            <Row>
              <Col span={10}>
                <label>裙房标准层高度：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={5}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 裙房生成模式 */}
            <Row>
              <Col span={10}>
                <label>裙房生成模式</label>
              </Col>
              <Col span={12}>
                <Select
                  defaultValue="条状生成"
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                  // onChange={handleChange}
                  options={[
                    {
                      value: "BAR",
                      label: "条状生成",
                    },
                    {
                      value: "BLOCK",
                      label: "块状生成",
                    },
                  ]}
                />
              </Col>
            </Row>
            {/*  */}

            {/* 容积率上限 */}
            <Row>
              <Col span={10}>
                <label>容积率上限：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={100}
                  defaultValue={10.0}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 容积率下限 */}
            <Row>
              <Col span={10}>
                <label>容积率下限：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={100}
                  defaultValue={1.0}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 建筑密度上限 */}
            <Row>
              <Col span={10}>
                <label>建筑密度上限：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={100}
                  defaultValue={50}
                  formatter={(value) => `${value}%`}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 建筑密度下限 */}
            <Row>
              <Col span={10}>
                <label>建筑密度下限：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={100}
                  defaultValue={20}
                  formatter={(value) => `${value}%`}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 商业最小间距 */}
            <Row>
              <Col span={10}>
                <label>商业最小间距：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={15}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
            {/* 塔楼最小间距 */}
            <Row>
              <Col span={10}>
                <label>塔楼最小间距：</label>
              </Col>
              <Col span={12}>
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={30}
                  formatter={(value) => `${value}m`}
                  parser={(value) => value.replace("m", "")}
                  style={{
                    margin: "0 6px",
                    width: "100%",
                  }}
                />
              </Col>
            </Row>
          </Space>
          <Divider />
          {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block">
            Click me!
          </button> */}
          <Button
            block
            type="primary"
            className="font-bold text-white bg-blue-500 hover:bg-blue-700 "
            // onClick={() => submit({ onResultChange: setResult })}
            onClick={submit}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
};
