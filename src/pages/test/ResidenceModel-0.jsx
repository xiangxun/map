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

  //导出模型
  //   const { scene, gl } = useThree();
  const threeScene = useThree((state) => state.scene);
  // console.log("threeScene", threeScene);

  const exportGLTF = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (gltf) => {
        const output = JSON.stringify(gltf, null, 2);
        console.log("output", output);
        const blob = new Blob([output], { type: "text/plain" });
        // saveAs(blob, "scene.gltf");
      },
      { binary: false }
    );
  };
  // exportGLTF();
  const sayHello = () => {
    alert("Hello from child component!");
  };
  const exportGLB = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      threeScene,
      (gltf) => {
        const output = JSON.stringify(gltf, null, 2);
        console.log("output", output);
        console.log("gltf", gltf);
        console.log("scene", scene);
        const blob = new Blob([output], {
          type: "application/octet-stream",
        });
        saveAs(blob, "scene.glb");
      },
      { onlyVisible: false, binary: true }
    );
  };
  useImperativeHandle(ref, () => ({
    sayHello: sayHello,
    exportGLB: exportGLB,
  }));

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
  //   console.log("meshMaterialNameArr", meshMaterialNameArr);
  //   const meshArrMaterialNameArrObj = meshMaterialNameArr.map((item) => {
  //     return { name: item, color: "#ffffff" };
  //   });

  const meshInfo = [];

  useFrame(() => {
    // 如果当前有选中的 Group，则为其添加高亮效果
    // if (hovered && selectedGroup) {
    //   selectedGroup.children.forEach((child) => {
    //     if (child.material) {
    //       child.material = highlightMaterial;
    //     }
    //   });
    // }
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

  // console.log("threeScene", threeScene.children[4].children);

  // const highlightMaterial = new MeshStandardMaterial({
  //   color: 0xffffff,
  //   emissive: 0xff0000,
  //   emissiveIntensity: 1,
  //   side: 2,
  // });

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
          <group
            key={index}
            name={meshName}
            // onClick={(e) => {
            //   e.stopPropagation();
            //   console.log("group click", e.object.parent);
            //   setSelectedGroup(e.object.parent);
            // }}
            onPointerOver={(e) => {
              e.stopPropagation();
              console.log("group hover", e.object.parent);
              setHover(true);
              setMaterials(e.object);
              e.object.material = Object.values(highlightMaterials);
              // setSelectedGroup(e.object.parent);
              // setHighlightMaterial(
              //   new MeshStandardMaterial({
              //     color: "red",
              //     transparent: true,
              //     opacity: 0.1,
              //   })
              // );
              // setOriginalMaterial(e.object.parent.children[0].material);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHover(false);
              Object.values(originalMaterials).forEach((material) => {
                e.object.material = material;
              });
              // setSelectedGroup(e.object.parent);
              // selectedGroup.children.forEach((child) => {
              //   if (child.material) {
              //     child.material = child.material;
              //   }
              // });
              // selectedGroup(null);
              // setHighlightMaterial(
              //   new MeshStandardMaterial({
              //     color: "blue",
              //     transparent: true,
              //     opacity: 0.1,
              //   })
              // );
            }}
          >
            {meshArr
              .filter((v) => v.name.split("_")[0] === meshName)
              .map((meshItem, index) => {
                return (
                  <mesh
                    key={meshItem.uuid}
                    geometry={meshItem.geometry}
                    // material={
                    //   selectedGroup ? highlightMaterial : meshItem.material
                    // }
                    // material={meshItem.material}
                    // material={hovered ? meshItem.material : meshItem.material}
                    material={
                      selectedGroup
                        ? highlightMaterials[meshItem.material.uuid]
                        : meshItem.material
                    }
                    name={meshName}
                    userData={meshItem.userData}
                    castShadow
                    receiveShadow
                    // onPointerOver={(e) => {
                    //   e.stopPropagation();
                    //   setHover(true);
                    //   //   console.log("hover", e.intersections[0].object);
                    //   meshInfo.push(e.intersections[0].object.name);
                    //   console.log("meshInfo", meshInfo);
                    // }}
                    // onPointerOut={(e) => {
                    //   e.stopPropagation();
                    //   setHover(false);
                    //   meshInfo.pop();
                    // }}
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   console.log("click", e.intersections[0].object);
                    //   setActive(!active);
                    // }}
                    // scale={active ? [1.01, 1.01, 1.01] : [1, 1, 1]}
                  >
                    {hovered && !highlightMaterials[meshItem.material.uuid] && (
                      <meshStandardMaterial attach='material' color='red' />
                    )}
                    {/* {hovered && !highlightMaterial && (
                      <meshStandardMaterial attach='material' color='red' />
                    )} */}
                    {/* <meshStandardMaterial
                      attach='material'
                      color={hovered ? 0xff0000 : 0xffffff}
                      emissive={hovered ? 0xffff00 : 0xffffff}
                      emissiveIntensity={1}
                      transparent
                      opacity={0.1}
                    /> */}
                  </mesh>
                );
              })}
          </group>
        );
      })}

      {/* <Select enabled={config.all}> */}
      <primitive object={scene} {...props} castShadow receiveShadow />
      <Html position={[0, 50, 50]} transform>
        <div className=' text-4xl p-4 bg-gray-200 rounded-xl'>
          <p>Hello</p>
          <p>{meshInfo}</p>
        </div>
      </Html>
      {/* </Select> */}
    </group>
    // <group ref={groupRef}>
    //   {/* 遍历模型的所有 Group */}
    //   {gltfModel.children.map((child) => (
    //     <group
    //       key={child.uuid}
    //       name={child.name}
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         setSelectedGroup(groupRef.current.getObjectByName(child.name));
    //       }}
    //       onPointerOver={() => {
    //         groupRef.current
    //           .getObjectByName(child.name)
    //           .children.forEach((child) => {
    //             if (child.material) {
    //               child.material.emissive.set(0x555555);
    //             }
    //           });
    //       }}
    //       onPointerOut={() => {
    //         if (!selectedGroup || selectedGroup.name !== child.name) {
    //           groupRef.current
    //             .getObjectByName(child.name)
    //             .children.forEach((child) => {
    //               if (child.material) {
    //                 child.material.emissive.set(0x000000);
    //               }
    //             });
    //         }
    //       }}
    //     >
    //       {/* 遍历 Group 中的所有 Mesh */}
    //       {child.children.map((mesh) => (
    //         <mesh
    //           key={mesh.uuid}
    //           geometry={mesh.geometry}
    //           material={mesh.material}
    //         />
    //       ))}
    //     </group>
    //   ))}
    // </group>
  );
});

export default ResidenceModel;
ResidenceModel.displayName = "ResidenceModel";

useGLTF.preload(gltfFile, true, true);
