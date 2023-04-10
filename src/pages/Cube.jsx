import React, { Suspense, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { extend, useFrame } from "@react-three/fiber";
// import rhino3dm from "rhino3dm";

// import { SSAOShader } from "three/examples/jsm/shaders/SSAOShader";
// import {
//   Pass,
//   ShaderPass,
//   RenderPass,
//   EffectComposer,
// } from "three/examples/jsm/postprocessing/EffectComposer";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";

// 扩展EffectComposer，以便我们可以使用SSAOPass
// extend({ Rhino3dmLoader });
//
// 定义SSAOPass组件
// const SSAOPass = () => {
//   const { gl, scene, camera, size } = useThree();
//   const composer = useRef();

//   // 创建SSAOPass
//   const ssaoPass = useRef(ShaderPass);

//   // 更新SSAOPass的uniforms
//   useFrame(() => {
//     ssaoPass.current.uniforms["cameraNear"].value = camera.near;
//     ssaoPass.current.uniforms["cameraFar"].value = camera.far;
//     ssaoPass.current.uniforms["resolution"].value.set(size.width, size.height);
//   }, 1);

//   return (
//     <effectComposer ref={composer} args={[gl]}>
//       <renderPass attachArray='passes' scene={scene} camera={camera} />
//       <ssaoPass attachArray='passes' args={[scene, camera]} />
//     </effectComposer>
//   );
// };

const MyModel = () => {
  const rhinoFile = "models/Rhino3dmModel.3dm";
  const { gl, scene, camera, size } = useThree();
  const rhino3dmLoader = new Rhino3dmLoader();
  rhino3dmLoader.setLibraryPath(
    "https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/"
  );
  // console.log("rhino3dm", rhino3dm);
  // rhino3dmLoader.setLibraryPath(rhino3dm);
  rhino3dmLoader.load(
    rhinoFile,
    (object) => {
      console.log(object);

      // object.traverse((child) => {
      //   if (child.isMesh) {
      //     child.material.color.set(0xff0000);
      //   }
      // });

      // object.position.set(0, 0, 0);
      // object.scale.set(0.1, 0.1, 0.1);
      object.rotation.set(-3.14 / 2, 0, 0);
      // object.castShadow = true;
      // object.receiveShadow = true;
      scene.add(object);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log("加载失败", error);
    }
  );
  return null;
};

function Cube() {
  return (
    <div className='h-[1000px]'>
      <Canvas>
        <Suspense>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -15, -10]} />
          {/* <fog attach='fog' args={["white", 5, 15]} /> */}
          <axesHelper args={[5]} />
          <gridHelper args={[100, 100]} />
          <mesh position={[0, 0.5, 0]} castShadow>
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
          </mesh>
          <MyModel />
          {/* <Rhino3dmLoader url={rhinoFile} /> */}
          {/* <SSAOPass /> */}
          <EffectComposer>
            <SSAO
              blendFunction={BlendFunction.DARKEN} // blend mode
              samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
              rings={4} // amount of rings in the occlusion sampling pattern
              distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
              distanceFalloff={0.0} // distance falloff. min: 0, max: 1
              rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
              rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
              luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
              radius={20} // occlusion sampling radius
              scale={0.2} // scale of the ambient occlusion
              bias={0.5} // occlusion bias
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Cube;
