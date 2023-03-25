import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { Button, Card } from "antd";
const { Meta } = Card;

const Box = () => {
	const [hovered, setHover] = React.useState(false);
	const [active, setActive] = React.useState(false);
	const ref = useRef();
	useFrame((state, delta) => (ref.current.rotation.x += delta));
	const props = useSpring({
		scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
		color: hovered ? "hotpink" : "yellow",
	});
	return (
		<a.mesh
			ref={ref}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
			onClick={() => setActive(!active)}
			scale={props.scale}
			castShadow
		>
			<boxBufferGeometry />
			<a.meshStandardMaterial color={props.color} />
		</a.mesh>
	);
};

export const HomePage = () => {
	return (
		<>
			<main className='bg-gray-100 py-24'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-2 gap-6 h-full'>
						<div>
							<h1 className='text-4xl font-bold leading-tight mb-4'>
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
											src='/images/park1.png'
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
											src='/images/park1.png'
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
								{/* <div className="flex justify-center items-center h-screen"> */}
								<div className='flex flex-col overflow-hidden'>
									<Canvas
										style={{ height: 600 }}
										shadows
										// colorManagement
										camera={{ position: [2, 2, 2], fov: 60 }}
									>
										<ambientLight intensity={0.3} />
										<directionalLight
											// castShadow
											position={[0, 10, 0]}
											intensity={1.5}
										/>
										<group>
											<mesh
												receiveShadow
												rotation={[-Math.PI / 2, 0, 0]}
												position={[0, -3, 0]}
											>
												<planeBufferGeometry
													attach='geometry'
													args={[100, 100]}
												/>
												<shadowMaterial attach='material' opacity={0.3} />
											</mesh>
											<Box />
										</group>
										<OrbitControls />
									</Canvas>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			{/* <Card /> */}
		</>
	);
};
