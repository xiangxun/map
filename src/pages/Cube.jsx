import React, { Suspense, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, SMAA, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { extend, useFrame } from "@react-three/fiber";
// import rhino3dm from "rhino3dm";

import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";
import { useControls } from "leva";

const MyModel = () => {
  const rhinoFile = "models/3dm/model.3dm";
  // const rhinoFile = "models/Rhino3dmModel.3dm";
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

      object.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(0xffffff);
        }
      });
      // object.traverse((child) => {
      //   if (child.isLine) {
      //     child.material.opacity = 0;
      //   }
      // });

      object.rotation.set(-Math.PI / 2, 0, 0);
      object.scale.set(0.1, 0.1, 0.1);
      object.position.set(0, 0, 0);
      object.castShadow = true;
      object.receiveShadow = true;
      const meshes = object.children.filter((child) => child.isMesh);

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
  // const aoConfig = useControls({
  //   blendFunction: {
  //     value: "MULTIPLY",
  //     options: {
  //       SKIP: "SKIP",
  //       SET: "SET",
  //       ADD: "ADD",
  //       ALPHA: "ALPHA",
  //       COLOR: "COLOR",
  //       COLOR_DODGE: "COLOR_DODGE",
  //       COLOR_BURN: "COLOR_BURN",
  //       DARKEN: "DARKEN",
  //       DIFFERENCE: "DIFFERENCE",
  //       DIVIDE: "DIVIDE",
  //       DST: "DST",
  //       DST_ATOP: "DST_ATOP",
  //       DST_IN: "DST_IN",
  //       DST_OUT: "DST_OUT",
  //       DST_OVER: "DST_OVER",
  //       EXCLUSION: "EXCLUSION",
  //       HARD_LIGHT: "HARD_LIGHT",
  //       HARD_MIX: "HARD_MIX",
  //       HUE: "HUE",
  //       INVERT: "INVERT",
  //       LINEAR_BURN: "LINEAR_BURN",
  //       LINEAR_DODGE: "LINEAR_DODGE",
  //       LINEAR_LIGHT: "LINEAR_LIGHT",
  //       LIMINOSITY: "LIMINOSITY",
  //       MULTIPLY: "MULTIPLY",
  //       NEGATION: "NEGATION",
  //       NORMAL: "NORMAL",
  //       OVERLAY: "OVERLAY",
  //       PIN_LIGHT: "PIN_LIGHT",
  //       REFLECT: "REFLECT",
  //       SATURATION: "SATURATION",
  //       SCREEN: "SCREEN",
  //       SOFT_LIGHT: "SOFT_LIGHT",
  //       HARD_LIGHT: "HARD_LIGHT",
  //       SRC: "SRC",
  //       SUBTRACT: "SUBTRACT",
  //       VIVID_LIGHT: "VIVID_LIGHT",
  //     },
  //   },
  //   samples: { value: 30, min: 0, max: 100 },
  //   rings: { value: 4, min: 0, max: 100 },
  //   distanceThreshold: { value: 1.0, min: 0, max: 1 },
  //   distanceFalloff: { value: 0.0, min: 0, max: 1 },
  //   rangeThreshold: { value: 0.5, min: 0, max: 1 },
  //   rangeFalloff: { value: 0.1, min: 0, max: 1 },
  //   luminanceInfluence: { value: 0.9, min: 0, max: 1 },
  //   radius: { value: 20, min: 0, max: 100 },
  //   scale: { value: 0.2, min: 0, max: 1 },
  //   bias: { value: 0.5, min: 0, max: 1 },
  //   intensity: { value: 0.5, min: 0, max: 1 },
  //   bias: { value: 0.5, min: 0, max: 1 },
  //   luminanceInfluence: { value: 0.9, min: 0, max: 1 },
  //   radius: { value: 20, min: 0, max: 1000 },
  //   scale: { value: 0.2, min: 0, max: 1 },
  //   bias: { value: 0.5, min: 0, max: 1 },
  //   intensity: { value: 200, min: 0, max: 1000 },
  // });

  return (
    <div className='h-[1000px]'>
      <Canvas>
        <Suspense>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          {/* <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} /> */}
          <pointLight position={[-10, -15, -10]} />
          {/* <fog attach='fog' args={["white", 5, 15]} /> */}
          <axesHelper args={[5]} />
          <gridHelper args={[100, 100]} />
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
          <EffectComposer>
            {/* <SSAO
              blendFunction={BlendFunction[aoConfig.blendFunction]}
              samples={aoConfig.samples}
              rings={aoConfig.rings}
              distanceThreshold={aoConfig.distanceThreshold}
              distanceFalloff={aoConfig.distanceFalloff}
              rangeThreshold={aoConfig.rangeThreshold}
              rangeFalloff={aoConfig.rangeFalloff}
              luminanceInfluence={aoConfig.luminanceInfluence}
              radius={aoConfig.radius}
              scale={aoConfig.scale}
              bias={aoConfig.bias}
              intensity={aoConfig.intensity}

              // blendFunction={BlendFunction.DARKEN} // blend mode
              // samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
              // rings={4} // amount of rings in the occlusion sampling pattern
              // distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
              // distanceFalloff={0.0} // distance falloff. min: 0, max: 1
              // rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
              // rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
              // luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
              // radius={20} // occlusion sampling radius
              // scale={0.2} // scale of the ambient occlusion
              // bias={0.5} // occlusion bias
            />
            <SMAA preset={10} /> */}
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Cube;
