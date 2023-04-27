import React, { Suspense, useEffect, useRef } from "react";
import { OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { extend, useFrame } from "@react-three/fiber";
// import rhino3dm from "rhino3dm";

import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";
import { useControls } from "leva";
import { Box3, Box3Helper, Group, Vector3 } from "three";

const MyModel = () => {
  const rhinoFile = "models/3dm/residence.3dm";
  // const rhinoFile = "models/Rhino3dmModel.3dm";
  const { gl, scene, camera, size } = useThree();
  const rhino3dmLoader = new Rhino3dmLoader();
  rhino3dmLoader.setLibraryPath(
    "https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/"
  );
  // console.log("rhino3dm", rhino3dm);
  // rhino3dmLoader.setLibraryPath("rhino3dm");

  const rhino3dmPromise = new Promise((resolve, reject) => {
    rhino3dmLoader
      .loadAsync(rhinoFile)
      .then((rhino3dmModel) => {
        console.log(rhino3dmModel);
        const box = new Box3().setFromObject(rhino3dmModel);
        // const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());
        const box3Helper = new Box3Helper(box, 0xff0000);

        // rhino3dmModel.position.set(-center.x * 0.2, 0, center.y * 0.2);
        rhino3dmModel.rotation.set(-Math.PI / 2, 0, 0);
        rhino3dmModel.scale.set(0.2, 0.2, 0.2);
        // console.log("center", center);
        // console.log("rhino3dmModelPosition", rhino3dmModel.position);

        // rhino3dmModel.position.set(-2.27, 0, 0);
        rhino3dmModel.position.x += -center.x * 0.2;
        // rhino3dmModel.position.y += rhino3dmModel.position.y - center.y;
        rhino3dmModel.position.z += center.z * 0.2;

        rhino3dmModel.traverse((child) => {
          if (child.isMesh) {
            console.log("child", child.name);
            // child.material.color.set(0xffffff);
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        const meshes = rhino3dmModel.children.filter((child) => child.isMesh);
        const meshNameList = meshes.map((mesh) => mesh.name);
        console.log("meshNameList", meshNameList);
        const meshMat = meshes.map((mesh) => mesh.material);
        console.log("meshMat", meshMat);

        rhino3dmModel.traverse((child) => {
          switch (child.name) {
            case "Spcq":
              child.material.color.set(0xff7f7f);
              break;
            case meshNameList[1]:
              // child.material.color.set();
              break;
            case meshNameList[2]:
              // child.material.color.set();
              break;
            case "门":
              child.material.color.set(0x7f7f7f);
              break;
            case "窗户":
              child.material.color.set(0x7f7f7f);
              break;
            case "梁":
              child.material.color.set(0x7f7f7f);
              break;
            case "柱":
              child.material.color.set(0x7f7f7f);
              break;
            case "楼梯":
              child.material.color.set(0x7f7f7f);
              break;

            default:
              break;
          }
        });

        rhino3dmModel.castShadow = true;
        rhino3dmModel.receiveShadow = true;
        // scene.add(box3Helper);
        resolve(rhino3dmModel);
      })
      .catch((error) => {
        reject(error);
      });
  });

  useEffect(() => {
    rhino3dmPromise.then((rhino3dmModel) => {
      scene.add(rhino3dmModel);
      // scene.add(box3Helper);
    });
  }, []);

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
  return null;
};

function Cube() {
  return (
    <div className='h-[1000px]'>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 60, far: 2000 }}>
        <OrbitControls />
        <Suspense>
          {/* 坏境光 */}
          <ambientLight intensity={0.5} />
          {/* 平行光 */}
          <directionalLight
            castShadow
            intensity={1.5}
            position={[0, 40, 10]}
            shadow-mapSize={2048}
            // shadow-mapSize={[4096, 4096]}
            shadow-bias={-0.00015}
            color={"#fff"}
          >
            <orthographicCamera
              attach='shadow-camera'
              args={[-400, 400, 400, -400, 100, 600]}
              // args={[-2000, 2000, 2000, -2000]}
            />
          </directionalLight>
          {/* <ambientLight intensity={0.5} /> */}
          {/* <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} /> */}
          {/* <pointLight position={[10, 15, 10]} /> */}
          {/* <fog attach='fog' args={["white", 5, 15]} /> */}
          <axesHelper args={[10]} />
          <gridHelper args={[20, 10]} />
          {/* <Plane args={[20, 10]} /> */}
          {/* <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry attach='geometry' args={[1, 1, 1]} />
            <meshStandardMaterial attach='material' color={"#FFFFFF"} />
          </mesh>
          <mesh position={[1, 0.5, 0]} castShadow>
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
          {/* <EffectComposer>
          </EffectComposer> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Cube;
