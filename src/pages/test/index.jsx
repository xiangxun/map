import React, { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { extend, useFrame } from "@react-three/fiber";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "leva";
import { Box3, Box3Helper, Group, Vector3 } from "three";

import { colorType1, colorType2, colorType3 } from "@/assets";

const MyModel = () => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const rhinoFile = "models/3dm/residence1.3dm";
  const gltfFile = "models/gltf/residence.glb";
  const { gl, scene, camera, size } = useThree();
  const rhino3dmLoader = new Rhino3dmLoader();

  // set the path to the rhino3dm.wasm file
  rhino3dmLoader.setLibraryPath("/rhino3dm/");
  // another way to set the path to the rhino3dm.wasm file
  // rhino3dmLoader.setLibraryPath(
  //   "https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/"
  // );

  const meshArr = [];

  const rhino3dmPromise = new Promise((resolve, reject) => {
    rhino3dmLoader
      .loadAsync(rhinoFile)
      .then((rhino3dmModel) => {
        console.log(rhino3dmModel);
        const box = new Box3().setFromObject(rhino3dmModel);
        // const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());
        const box3Helper = new Box3Helper(box, 0xff0000);

        // rhino3dmModel.position.set(-center.x * 0.1, 0, center.y * 0.1);
        rhino3dmModel.rotation.set(-Math.PI / 2, 0, 0);
        rhino3dmModel.scale.set(0.1, 0.1, 0.1);
        // console.log("center", center);
        // console.log("rhino3dmModelPosition", rhino3dmModel.position);

        rhino3dmModel.position.x += -center.x * 0.1;
        rhino3dmModel.position.z += center.z * 0.1;
        // rhino3dmModel.position.y += rhino3dmModel.position.y - center.y;

        rhino3dmModel.traverse((child) => {
          if (child.isMesh) {
            // console.log("child", child.name);
            // child.material.color.set(0xffffff);
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        const meshes = rhino3dmModel.children.filter((child) => child.isMesh);
        // const meshNameList = meshes.map((mesh) => mesh.name);
        // 获取mesh名字的数组
        const meshNameList = Array.from(
          new Set(
            rhino3dmModel.children
              .filter((child) => child.isMesh)
              .map((mesh) => mesh.name)
          )
        );

        // const GroupNameList = Array.from(
        //   new Set(
        //     rhino3dmModel.children
        //       .filter((child) => child.isMesh)
        //       .map((mesh) => mesh.userData.attributes.groupIds[0])
        //   )
        // );
        // console.log("GroupNameList", GroupNameList);

        console.log("meshNameList", meshNameList);
        const meshMat = meshes.map((mesh) => mesh.material);
        // console.log("meshMat", meshMat);

        console.log("colorType1", colorType1);

        // 颜色类型
        const colorType = colorType2;
        // set rhino3dmModel mesh's material color by the colorType
        rhino3dmModel.traverse((child) => {
          Object.keys(colorType).map((key, index) => {
            if (child.name === key) {
              child.material.color.set(colorType[key]);
            }
          });
        });
        /* Here is the explanation for the code above:
          1. traverse() is a three.js function that allows you to access each children of the parent (in this case, rhino3dmModel). 
          2. Object.keys() returns an array of the properties of the colorType object.
          3. map() is used to iterate through the array returned by Object.keys().
          4. If the name of the child matches the key (in this case, 'Wall'), the color of the child is set to the value of the key (in this case, '#ff0000'). */

        rhino3dmModel.castShadow = true;
        rhino3dmModel.receiveShadow = true;
        // scene.add(box3Helper);

        resolve(rhino3dmModel);
      })
      .catch((error) => {
        reject(error);
      });
  });
  const rhino3dm = () => {
    rhino3dmLoader.load(rhinoFile, (rhino3dmModel) => {
      console.log(rhino3dmModel);
      const box = new Box3().setFromObject(rhino3dmModel);
      // const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
      const box3Helper = new Box3Helper(box, 0xff0000);
      rhino3dmModel.rotation.set(-Math.PI / 2, 0, 0);
      rhino3dmModel.scale.set(0.1, 0.1, 0.1);
      rhino3dmModel.position.x += -center.x * 0.1;
      rhino3dmModel.position.z += center.z * 0.1;
      rhino3dmModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      const meshes = rhino3dmModel.children.filter((child) => child.isMesh);
      // const meshNameList = meshes.map((mesh) => mesh.name);
      // 获取mesh名字的数组
      const meshNameList = Array.from(
        new Set(
          rhino3dmModel.children
            .filter((child) => child.isMesh)
            .map((mesh) => mesh.name)
        )
      );
      console.log("meshNameList", meshNameList);
      // console.log("meshNameArr", meshNameArr);
      const meshMat = meshes.map((mesh) => mesh.material);
      // console.log("meshMat", meshMat);

      console.log("colorType1", colorType1);

      meshNameList.map((name, index) => {
        console.log("name", name);
        console.log("index", index);
        console.log("colorType1.keys", Object.keys(colorType1));
        console.log("colorType1.values", Object.values(colorType1));
      });

      rhino3dmModel.traverse((child) => {
        switch (child.name) {
          case "Spcq":
            child.material.color.set(0xff7f7f);
            break;
          case meshNameList[1]:
            child.material.color.set(0xffaaff);
            break;
          case meshNameList[2]:
            // child.material.color.set();
            break;

          default:
            break;
        }
      });

      rhino3dmModel.castShadow = true;
      rhino3dmModel.receiveShadow = true;
      // scene.add(box3Helper);
    });
  };

  const gltfLoader = new GLTFLoader();
  const gltfPromise = new Promise((resolve, reject) => {
    gltfLoader
      .loadAsync(gltfFile)
      .then((gltf) => {
        console.log(gltf);
        const gltfModel = gltf.scene;
        const box = new Box3().setFromObject(gltfModel);
        // const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());
        const box3Helper = new Box3Helper(box, 0xff0000);

        // rhino3dmModel.position.set(-center.x * 0.2, 0, center.y * 0.2);
        // rhino3dmModel.rotation.set(-Math.PI / 2, 0, 0);
        gltfModel.scale.set(0.2, 0.2, 0.2);
        console.log("center", center);
        console.log("gltfModelPosition", gltfModel.position);

        // gltfModel.position.set(-2.27, 0, 0);
        // gltfModel.position.x += gltfModel.position.x - center.x;
        // gltfModel.position.y += gltfModel.position.y - center.y;

        gltfModel.position.x += -center.x * 0.2;
        gltfModel.position.z += -center.z * 0.2;

        gltfModel.traverse((child) => {
          if (child.isMesh) {
            // console.log("child", child.name);
            // child.material.color.set(0xffffff);
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        const meshes = gltfModel.children.filter((child) => child.isMesh);
        // const meshNameList = meshes.map((mesh) => mesh.name);
        // 获取mesh名字的数组
        const meshNameList = Array.from(
          new Set(
            gltfModel.children
              .filter((child) => child.isMesh)
              .map((mesh) => mesh.name)
          )
        );
        console.log("meshNameList", meshNameList);
        // console.log("meshNameArr", meshNameArr);
        const meshMat = meshes.map((mesh) => mesh.material);
        // console.log("meshMat", meshMat);

        gltfModel.traverse((child) => {
          switch (child.name) {
            case meshNameList[0]:
              child.material.color.set(0xff7f7f);
              break;
            case meshNameList[1]:
              // child.material.color.set();
              break;
            case meshNameList[2]:
              // child.material.color.set();
              break;

            default:
              break;
          }
        });

        gltfModel.castShadow = true;
        gltfModel.receiveShadow = true;
        // scene.add(box3Helper);
        resolve(gltfModel);
      })
      .catch((error) => {
        reject(error);
      });
  });

  rhino3dmPromise.then((rhino3dmModel) => {
    const meshes = rhino3dmModel.children.filter((child) => child.isMesh);
    scene.add(rhino3dmModel);
  });

  // gltfPromise.then((rhino3dmModel) => {
  //   scene.add(rhino3dmModel);
  //   // scene.add(box3Helper);
  // });

  // rhino3dmLoader.load(
  //   rhinoFile,
  //   (object) => {
  //     console.log(object);

  //     object.traverse((child) => {
  //       if (child.isMesh) {
  //         child.material.color.set(0xffffff);
  //       }
  //     });
  //     // object.traverse((child) => {
  //     //   if (child.isLine) {
  //     //     child.material.opacity = 0;
  //     //   }
  //     // });

  //     object.rotation.set(-Math.PI / 2, 0, 0);
  //     object.scale.set(0.1, 0.1, 0.1);
  //     object.position.set(0, 0, 0);
  //     object.castShadow = true;
  //     object.receiveShadow = true;
  //     const meshes = object.children.filter((child) => child.isMesh);

  //     scene.add(object);
  //   },
  //   (xhr) => {
  //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //   },
  //   (error) => {
  //     console.log("加载失败", error);
  //   }
  // );
  // return (
  //   <group>
  //     {meshes.map((mesh) => {
  //       return (
  //         <mesh key={mesh.uuid}>
  //           <meshStandardMaterial />
  //         </mesh>
  //       );
  //     })}
  //   </group>
  // );
};

function Cube() {
  return (
    <div className='h-[1000px]'>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 60, far: 2000 }}>
        <OrbitControls />
        <Suspense>
          {/* 坏境光 */}
          <ambientLight intensity={0.8} />
          {/* 平行光 */}
          <directionalLight
            castShadow
            intensity={1.5}
            position={[10, 20, 10]}
            shadow-mapSize={2048}
            // shadow-mapSize={[4096, 4096]}
            shadow-bias={-0.0005}
            color={"#fff"}
          >
            <orthographicCamera
              attach='shadow-camera'
              args={[-20, 20, 20, -20, 10, 100]}
              // args={[-100, 100, 100, -100]}
            />
          </directionalLight>
          {/* <ambientLight intensity={0.5} /> */}
          {/* <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} /> */}
          {/* <pointLight position={[10, 15, 10]} /> */}
          {/* <fog attach='fog' args={["white", 5, 15]} /> */}
          <axesHelper args={[10]} />
          <gridHelper args={[20, 10]} />
          {/* <Plane args={[20, 10]} /> */}
          <mesh receiveShadow position={[0, 0, 0]} castShadow>
            <boxGeometry attach='geometry' args={[20, 0.01, 20]} />
            <meshStandardMaterial attach='material' color={"#FFFFFF"} />
          </mesh>
          {/* <mesh position={[1, 0.5, 0]} castShadow>
            <boxGeometry attach='geometry' args={[1, 1, 1]} />
            <meshStandardMaterial attach='material' color={"#FF0000"} />
          </mesh>
          <mesh position={[0, 0.5, 1]} castShadow>
            <boxGeometry attach='geometry' args={[1, 1, 1]} />
            <meshStandardMaterial attach='material' color={"#00FFFF"} />
          </mesh> */}
          <MyModel />
          {/* <Rhino3dmLoader url={rhinoFile} /> */}
          {/* <SSAOPass /> */}
          <EffectComposer>
            <SSAO
              blendFunction={BlendFunction.MULTIPLY} // blend mode
              samples={64} // amount of samples per pixel (shouldn't be a multiple of the ring count)
              rings={4} // amount of rings in the occlusion sampling pattern
              distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
              distanceFalloff={0.0} // distance falloff. min: 0, max: 1
              rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
              rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
              luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
              radius={20} // occlusion sampling radius
              scale={0.5} // scale of the ambient occlusion
              bias={0.1} // occlusion bias
              intensity={5}
            />
            <SMAA />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Cube;
