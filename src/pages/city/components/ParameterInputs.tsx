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
		<div className='flex opacity-90 items-left justify-left '>
			<div className='max-w-lg'>
				<div className='px-8 pt-6 pb-8 mb-4 bg-white rounded-lg shadow-md'>
					<div>
						<h1 className='text-3xl font-bold '>全局参数</h1>
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
							<Col span={10}>
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
							<Col span={10}>
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
							<Col span={10}>
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
									// onChange={(v) => setGridDensity(v)}
								/>
							</Col>
						</Row>
						{/* 路网密度 */}
						<Row>
							<Col span={10}>
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
									// onChange={(v) => setRoadDensity(v)}
								/>
							</Col>
						</Row>
						{/* 绿地密度 */}
						<Row>
							<Col span={10}>
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
									// onChange={(v) => setGreenRate(v)}
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
						type='primary'
						className='font-bold text-white bg-blue-500 hover:bg-blue-700 '
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
