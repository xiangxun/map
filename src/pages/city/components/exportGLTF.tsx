import React, { useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

const ExportGLTF = () => {
	const canvasRef = useRef(null);
	const { scene } = useThree();

	const handleExport = () => {
		const gltfExporter = new GLTFExporter();
		const canvas = canvasRef.current;

		gltfExporter.parse(
			scene,
			(gltf) => {
				const blob = new Blob([JSON.stringify(gltf)], {
					type: "application/octet-stream",
				});
				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				link.download = "model.glb";
				link.click();
			},
			{ binary: true }
		);
	};

	return (
		<div>
			<Canvas ref={canvasRef}>
				<mesh>
					<boxBufferGeometry />
					<meshStandardMaterial />
				</mesh>
			</Canvas>
			<button onClick={handleExport}>Export GLTF</button>
		</div>
	);
};

export default ExportGLTF;
