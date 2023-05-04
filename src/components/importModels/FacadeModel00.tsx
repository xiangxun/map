import { Edges, useGLTF } from "@react-three/drei";
import React from "react";
const gltfFile = "/models/gltf/facade/facade.glb";
const FacadeModel00 = () => {
  const { scene, nodes } = useGLTF(gltfFile);
  const meshes = Object.values(nodes).filter((n) => n.type === "Mesh");
  return (
    <>
      {meshes.map((item, index) => (
        <mesh key={index} geometry={item.geometry} receiveShadow castShadow>
          <meshStandardMaterial transparent opacity={0.95} />
          <Edges scale={1} threshold={15} color='#444444' />
        </mesh>
      ))}
    </>
  );
};
export default FacadeModel00;
useGLTF.preload(gltfFile);
