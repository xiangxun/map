import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useGLTF, Edges, Html } from "@react-three/drei";
import { useControls, folder, Leva } from "leva";
import { EffectComposer, Outline, Select } from "@react-three/postprocessing";
import { useThree, useFrame } from "@react-three/fiber";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import { Box3, Vector3, MeshStandardMaterial } from "three";

import { colorType1, colorType2, colorType3 } from "@/assets";
import { number } from "echarts";

const gltfFile = "models/gltf/residence.glb";
const ResidenceModel = React.forwardRef((props, ref) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [meshInfo, setMeshInfo] = useState([]);
  const groupRef = useRef(null);
  // dispatch model data to redux
  const dispatch = useDispatch();
  //导入模型
  const { nodes, scene, material, parser } = useGLTF(gltfFile);
  const gltfModel = scene;
  const box = new Box3().setFromObject(gltfModel);
  const center = box.getCenter(new Vector3());
  const meshArr = Object.values(nodes).filter((n) => n.type === "Mesh");
  const meshArrName = meshArr.map((item) => item.name.split("_")[0]);
  //去重
  const meshNameArr = Array.from(new Set(meshArrName));

  const meshMaterialArr = meshArr.map((item) => item.material);
  const meshMaterialName = meshMaterialArr.map((item) => item.name);
  const meshMaterialNameArr = Array.from(new Set(meshMaterialName));

  // const meshInfo = [];
  const meshInfoPosition = [];
  let timeout;

  const colorType = colorType3;
  gltfModel.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      Object.keys(colorType).map((key, index) => {
        if (child.material.name === key) {
          child.material.color.set(colorType[key]);
        }
      });
    }
  });
  useFrame(() => {});

  const highlightMaterial = new MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.5,
  });

  const groups = [];

  // 遍历模型中的group
  gltfModel.traverse((child) => {
    if (child.isGroup) {
      groups.push(child);
      child.children.forEach((mesh) => {
        if (mesh.isMesh) {
          mesh.userData.originalMaterial = mesh.material;
        }
      });
    }
  });

  // 在移入网格的事件处理程序中
  // const handlePointerOver = (e) => {
  //   e.stopPropagation();
  //   setHover(true);
  //   const group = e.object.parent;
  //   console.log("group", group);
  //   if (group.isGroup) {
  //     group.children.forEach((child) => {
  //       if (child.isMesh) {
  //         child.material = highlightMaterial.clone();
  //       }
  //     });
  //   }
  //   const meshInfoItem = [
  //     meshName,
  //   ];
  //   setMeshInfo(meshInfoItem);
  //   // clearTimeout(timeout);
  //   // timeout = setTimeout(() => {
  //   //   setMeshInfo(meshInfoItem);
  //   // }, 100);
  //   dispatch({
  //     type: "SET_MODEL_INFO",
  //     payload: meshInfo,
  //   });
  // };

  // 在移出网格的事件处理程序中
  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHover(false);
    const group = e.object.parent;
    if (group.isGroup) {
      group.children.forEach((child) => {
        if (child.isMesh) {
          child.material = child.userData.originalMaterial;
        }
      });
    }
  };
  useEffect(() => {
    // console.log("meshInfo", meshInfo);
    dispatch({
      type: "SET_MODEL_INFO",
      payload: meshInfo,
    });
  }, [dispatch, meshInfo]);

  return (
    <>
      <group {...props} dispose={null} ref={groupRef}>
        {meshNameArr.map((meshName, index) => {
          return (
            <group
              key={index}
              name={meshName}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHover(true);
                const group = e.object.parent;
                // console.log("group", group);
                if (group.isGroup) {
                  group.children.forEach((child) => {
                    if (child.isMesh) {
                      child.material = highlightMaterial.clone();
                    }
                  });
                  const meshInfoItem = meshName;
                  // setMeshInfo(meshInfoItem);
                  clearTimeout(timeout);
                  timeout = setTimeout(() => {
                    setMeshInfo(meshInfoItem);
                  }, 100);
                  // dispatch({
                  //   type: "SET_MODEL_INFO",
                  //   payload: meshInfo,
                  // });
                  console.log("meshInfo", meshInfo);
                }
              }}
              onPointerOut={handlePointerOut}
            >
              {meshArr
                .filter((v) => v.name.split("_")[0] === meshName)
                .map((meshItem, index) => {
                  return (
                    <mesh
                      key={meshItem.uuid}
                      geometry={meshItem.geometry}
                      material={meshItem.material}
                      position={meshItem.position}
                      name={meshName}
                      userData={meshItem.userData}
                      castShadow
                      receiveShadow
                    >
                      {/* <Html
                        position={[15, meshItem.name.match(/\d+/) * 2.8, -5]}
                        rotation={[0, Math.PI / 2, 0]}
                        transform
                      >
                        <div className='text-xl p-4 bg-gray-200 rounded-xl'>
                          <p>{meshName}</p>
                        </div>
                      </Html> */}
                    </mesh>
                  );
                })}
            </group>
          );
        })}
        <primitive object={scene} {...props} castShadow receiveShadow />
      </group>
      <Html position={[30, 50, 0]}>
        {/* <div>{meshItem.position.x}</div> */}
        <div className='text-xl p-4 bg-gray-200 rounded-xl'>
          <p>Hello</p>
          <p>
            {hovered ? meshInfo : ""}
            {console.log("meshinfo", meshInfo)}
          </p>
        </div>
      </Html>
    </>
  );
});

export default ResidenceModel;
ResidenceModel.displayName = "ResidenceModel";

useGLTF.preload(gltfFile, true, true);
