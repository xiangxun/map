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

const gltfFile = "models/gltf/residence.glb";
const ResidenceModel = React.forwardRef((props, ref) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [highlightMaterials, setHighlightMaterials] = useState({});
  const [originalMaterials, setOriginalMaterials] = useState({});

  const groupRef = useRef(null);

  //导入模型
  const { nodes, scene, material, parser } = useGLTF(gltfFile);

  const gltfModel = scene;
  const box = new Box3().setFromObject(gltfModel);
  // const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new Vector3());
  //   console.log("center", center);
  //   gltfModel.position.x += gltfModel.position.x - center.x;
  //   gltfModel.position.y = -center.y;
  //   gltfModel.position.x = -center.x * 0.1;
  //   gltfModel.position.z = -center.z * 0.1;
  //   gltfModel.scale.set(0.1, 0.1, 0.1);
  //gltfModel.scale.multiplyScalar(1);
  gltfModel.updateMatrix();
  gltfModel.matrixAutoUpdate = false;

  const colorType = colorType3;

  const meshArr = Object.values(nodes).filter((n) => n.type === "Mesh");
  const meshArrName = meshArr.map((item) => item.name.split("_")[0]);
  //去重
  const meshNameArr = Array.from(new Set(meshArrName));

  const meshMaterialArr = meshArr.map((item) => item.material);
  const meshMaterialName = meshMaterialArr.map((item) => item.name);
  const meshMaterialNameArr = Array.from(new Set(meshMaterialName));

  const meshInfo = [];

  useFrame(() => {
    gltfModel.traverse((child) => {
      if (child.isMesh) {
        // console.log("child", child.name);
        // child.material.color.set(0xffffff);
        child.castShadow = true;
        child.receiveShadow = true;
        Object.keys(colorType).map((key, index) => {
          if (child.material.name === key) {
            child.material.color.set(colorType[key]);
          }
        });
      }
    });
  });

  const setMaterials = (mesh) => {
    if (mesh.material instanceof Array) {
      mesh.material.forEach((material) => {
        if (!(material.uuid in highlightMaterials)) {
          setHighlightMaterials({
            ...highlightMaterials,
            [material.uuid]: new MeshStandardMaterial({ color: "red" }),
          });
          setOriginalMaterials({
            ...originalMaterials,
            [material.uuid]: material,
          });
        }
      });
    } else {
      if (!(mesh.material.uuid in highlightMaterials)) {
        setHighlightMaterials({
          ...highlightMaterials,
          [mesh.material.uuid]: new MeshStandardMaterial({ color: "red" }),
        });
        setOriginalMaterials({
          ...originalMaterials,
          [mesh.material.uuid]: mesh.material,
        });
      }
    }
  };

  return (
    <group {...props} dispose={null} ref={groupRef}>
      {meshNameArr.map((meshName, index) => {
        return (
          <group key={index} name={meshName}>
            {meshArr
              .filter((v) => v.name.split("_")[0] === meshName)
              .map((meshItem, index) => {
                return (
                  <mesh
                    key={meshItem.uuid}
                    geometry={meshItem.geometry}
                    material={meshItem.material}
                    name={meshName}
                    userData={meshItem.userData}
                    castShadow
                    receiveShadow
                  ></mesh>
                );
              })}
          </group>
        );
      })}

      <primitive object={scene} {...props} castShadow receiveShadow />
      <Html position={[0, 50, 50]} transform>
        <div className=' text-4xl p-4 bg-gray-200 rounded-xl'>
          <p>Hello</p>
          <p>{meshInfo}</p>
        </div>
      </Html>
    </group>
  );
});

export default ResidenceModel;
ResidenceModel.displayName = "ResidenceModel";

useGLTF.preload(gltfFile, true, true);
