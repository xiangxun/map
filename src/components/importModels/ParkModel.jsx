import React, { useImperativeHandle, useMemo } from "react";
import { useSelector } from "react-redux";
import { BufferGeometry, BufferAttribute } from "three";
import { useThree } from "@react-three/fiber";
import { Edges, Select } from "@react-three/drei";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { saveAs } from "file-saver";
// import { useControls, folder } from "leva";

// 通过后端数据生成mesh
const CreateMesh = ({ type, positionArray, indexArray, color, opacity }) => {
  const position = new BufferAttribute(new Float32Array(positionArray), 3);
  const index = new BufferAttribute(new Uint16Array(indexArray), 1);

  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute("position", position);
  bufferGeometry.setIndex(index);
  bufferGeometry.computeVertexNormals();

  return (
    <mesh
      name={type ? type : "mesh"}
      geometry={bufferGeometry}
      receiveShadow
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        console.log("click Mesh", e.intersections[0].object);
        // alert(e.intersections[0].object.name);
      }}
    >
      <meshStandardMaterial
        // wireframe
        transparent
        opacity={opacity}
        color={color}
        // side={2}
      />
      <Edges threshold={30} silhouette={true} color='#000' lineWidth={2} />
    </mesh>
  );
};

const ParkModel = React.forwardRef((props, ref) => {
  // 导出模型
  const { scene } = useThree();
  console.log("scene in ParkModel", scene);

  const exportGLB = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
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
    exportGLB: exportGLB,
  }));

  //从store里取数据
  const data = useSelector((state) => state.data);
  // const arr = data ? Object.values(data) : [];

  const CreateBuilding = useMemo(() => {
    return (type) => {
      const arr = data
        ? Object.keys(data)
            .filter((key) => key.includes(type))
            .map((key) => data[key])
        : [];
      console.log("arr", arr);
      return arr;
    };
  }, [data]);
  console.log("data in ParkModel", data);

  // const buildingTypeLIst: string[] = [];
  // for (const item in Object.keys(data)) {
  //   console.log("item", item);
  // }
  // Object.keys(data).forEach((key) => {
  //   console.log("key", key);
  // });

  const config = {
    Skirt: {
      Color: "#cee6e9",
      Opacity: 1.0,
    },
    Tower: {
      Color: "#e97b79",
      Opacity: 1.0,
    },
  };

  return (
    <group
      onClick={(e) => {
        console.log("click", e);
      }}
    >
      {CreateBuilding("Tower").map((item, index) => {
        const { vertices, vertex_indices } = item;
        return (
          <CreateMesh
            type={"tower"}
            key={index}
            positionArray={vertices}
            indexArray={vertex_indices}
            opacity={config.Tower.Opacity}
            color={config.Tower.Color}
          />
        );
      })}
      {CreateBuilding("Skirt").map((item, index) => {
        const { vertices, vertex_indices } = item;
        return (
          <CreateMesh
            type={"skirt"}
            key={index}
            positionArray={vertices}
            indexArray={vertex_indices}
            opacity={config.Skirt.Opacity}
            color={config.Skirt.Color}
          />
        );
      })}
      {CreateBuilding("Plane").map((item, index) => {
        const { vertices, vertex_indices } = item;
        return (
          <CreateMesh
            key={index}
            positionArray={vertices}
            indexArray={vertex_indices}
            // opacity={config.skirtOpacity}
            // color={config.skirtColor}
          />
        );
      })}
    </group>
  );
});

export default ParkModel;
ParkModel.displayName = "ParkModel";

// import React, { useImperativeHandle, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { BufferGeometry, BufferAttribute } from "three";
// import { useThree } from "@react-three/fiber";
// import { Edges } from "@react-three/drei";
// import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
// import { saveAs } from "file-saver";

// const CreateMesh = ({ type = "mesh", positionArray, indexArray, color, opacity }) => {
//   const position = useMemo(() => new BufferAttribute(new Float32Array(positionArray), 3), [positionArray]);
//   const index = useMemo(() => new BufferAttribute(new Uint16Array(indexArray), 1), [indexArray]);

//   const bufferGeometry = useMemo(() => {
//     const geometry = new BufferGeometry();
//     geometry.setAttribute("position", position);
//     geometry.setIndex(index);
//     geometry.computeVertexNormals();
//     return geometry;
//   }, [position, index]);

//   return (
//     <mesh
//       name={type}
//       geometry={bufferGeometry}
//       receiveShadow
//       castShadow
//       onClick={(e) => {
//         e.stopPropagation();
//         console.log(`click ${type}`, e.intersections[0].object);
//       }}
//     >
//       <meshStandardMaterial transparent opacity={opacity} color={color} />
//       <Edges threshold={30} silhouette color='#000' lineWidth={2} />
//     </mesh>
//   );
// };

// const ParkModel = React.forwardRef((props, ref) => {
//   const { scene } = useThree();

// const exportGLB = () => { const exporter = new GLTFExporter();
//   exporter.parse( scene, (gltf) => { const output = JSON.stringify(gltf, null, 2);
//      const blob = new Blob([output],
//       { type: "application/octet-stream" });
//       saveAs(blob, "scene.glb");
//     },
//     { onlyVisible: false, binary: true } );
//    };

// useImperativeHandle(ref, () => ({ exportGLB }));

// const data = useSelector((state) => state.data);

// const buildingType = useMemo(() => { const types = ["Tower", "Skirt", "Plane"]; return types.reduce((acc, type) => { const buildings = Object.entries(data).filter(([key]) => key.includes(type)).map(([, value]) => value); return {...acc, [type]: buildings }; }, {}); }, [data]);

// const config = { Skirt: { Color: "#cee6e9", Opacity: 1.0, }, Tower: { Color: "#e97b79", Opacity: 1.0, }, };

// const renderBuildingType = (type) => { return buildingType[type].map(({ vertices, vertex_indices }, index) => { return ( ); }); };

// return (
//   {

//     renderBuildingType('Tower'),
//      renderBuildingType(Skirt),
//    renderBuildingType(Plane),
//   }
//   );

//  });

// export default ParkModel;
// ParkModel.displayName = "ParkModel";
