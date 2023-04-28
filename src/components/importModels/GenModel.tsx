import React, { FC, forwardRef, useImperativeHandle, useMemo } from "react";
import { useSelector } from "react-redux";
import { useThree } from "@react-three/fiber";
import { useGLTF, Edges, Html } from "@react-three/drei";
import { BufferGeometry, BufferAttribute, Mesh } from "three";
import { colorType1, colorType2, colorType3 } from "@/assets";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import saveAs from "file-saver";

type ColorType = {
  [key: string]: {
    color: string;
    opacity: number;
  };
};
type CreateMeshProps = {
  type: string;
  positionArray: number[];
  indexArray: number[];
  color: string;
  opacity: number;
};
// 通过后端数据生成mesh
/**
 * Creates a mesh from given parameters.
 * @param {Object} param - An object containing parameters.
 * @param {String} param.type - Type of mesh. Default is "mesh".
 * @param {Array} param.positionArray - Array of positions.
 * @param {Array} param.indexArray - Array of indices.
 * @param {String} param.color - Color of material.
 * @param {Number} param.opacity - Opacity of material.
 * @returns {JSX.Element} A mesh JSX element.
 */
const CreateMesh: FC<CreateMeshProps> = ({
  type,
  positionArray,
  indexArray,
  color,
  opacity,
}) => {
  const position = new BufferAttribute(new Float32Array(positionArray), 3);
  const index = new BufferAttribute(new Uint16Array(indexArray), 1);

  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute("position", position);
  bufferGeometry.setIndex(index);
  bufferGeometry.computeVertexNormals();

  // const highlightMaterial = new MeshStandardMaterial({
  //   color: 0xff0000,
  //   emissive: 0xff0000,
  //   emissiveIntensity: 0.5,
  //   transparent: true,
  //   opacity: 0.5,
  // });

  return (
    <mesh
      name={type ? type : "mesh"}
      geometry={bufferGeometry}
      receiveShadow
      castShadow
      // onPointerOver={(e) => {
      //   e.stopPropagation();
      //   // console.log("hovered Mesh", e.intersections[0].object);
      // }}
      onClick={(e) => {
        e.stopPropagation();
        // console.log("click Mesh", e.intersections[0].object);
      }}
    >
      <meshStandardMaterial
        // wireframe
        transparent
        opacity={opacity}
        color={color}
        side={2}
      />
      <Edges threshold={30} color='#555555' />
    </mesh>
  );
};

const GenModel = forwardRef((props, ref) => {
  // 导出模型
  const { scene } = useThree();
  console.log("scene in GenModel", scene);

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
      (error) => {
        console.log("error", error);
      },
      {}
      // { onlyVisible: false, binary: true }
    );
  };

  useImperativeHandle(ref, () => ({
    exportGLB: exportGLB,
  }));
  //从store里取数据
  const data = useSelector((state: any) => state.data);

  console.log("data in GenModel", data);

  interface BuildingProps {
    type: string;
  }
  // 通过建筑类型名称生成建筑
  const CreateBuilding: FC<BuildingProps> = ({ type }) => {
    // 通过建筑类型type获得生成建筑的vertex, vertex_index的数组
    // 在 VertexData 函数中使用 Object.entries() 方法获取对象的键值对数组，避免使用 Object.keys() 方法和 filter() 方法分别获取键和值。
    const VertexData = useMemo(() => {
      return (type: string): { vertex: number[]; vertex_index: number[] }[] => {
        return Object.entries(data)
          .filter(([key]) => key.includes(type))
          .map(
            ([, value]) => value as { vertex: number[]; vertex_index: number[] }
          );
      };
    }, []);
    return (
      <>
        {VertexData(type).map((item, index) => {
          const { vertex, vertex_index } = item;
          return (
            <CreateMesh
              type={type}
              key={index}
              positionArray={vertex}
              indexArray={vertex_index}
              opacity={colorType[type] ? colorType[type].opacity : 1}
              color={colorType[type] ? colorType[type].color : "#ffffff"}
            />
          );
        })}
      </>
    );
  };
  // const VertexData = useMemo(() => {
  //   return (type: string) => {
  //     return Object.keys(data)
  //       .filter((key) => key.includes(type))
  //       .map((key) => data[key]);
  //   };
  // }, [data]);
  // console.log("data in GenModel", data);

  // const buildingTypeList: string[] = useMemo(() => {
  //   return data ? Object.keys(data) : [];
  // }, [data]);
  // console.log("buildingTypeList", buildingTypeList);

  // 使用 for...in 循环遍历对象中的属性，并使用解构赋值获取了数组元素。在提取非数字部分时，使用了空值合并运算符 ?? 来处理没有匹配结果的情况。最后使用 Array.from() 方法将 Set 转换为数组，
  // const List: Set<string> = new Set();
  // if (data) {
  //   for (const item in data) {
  //     const [type] = item.match(/[^\d]+/g) ?? [];
  //     if (type) {
  //       List.add(type);
  //     }
  //   }
  // }
  // const buildingTypeList = Array.from(List);
  // console.log("buildingTypeList", buildingTypeList);

  // 使用 useMemo 钩子来计算 buildingTypeList 变量，并将 data 作为依赖项传递给 useMemo。这样，当 data 发生变化时，useMemo 会重新计算 buildingTypeList，否则会直接返回上一次计算的结果。这样可以避免在每次组件渲染时都重新计算 buildingTypeList，提高组件的性能。
  // 使用 Object.keys(data || {}) 方法获取 data 对象的属性名数组，并使用 map() 方法将每个属性名匹配出不包含数字的部分。然后使用 filter() 方法过滤掉匹配结果为 undefined 或空字符串的项，并使用 Array.from() 方法将匹配结果转换为数组。最后使用 new Set() 去重，得到最终的 buildingTypeList 数组。这样可以避免使用 Set 数据结构和额外的变量来存储匹配结果，使代码更加简洁。
  const buildingTypeList = useMemo(() => {
    const types = Object.keys(data || {})
      .map((item) => item.match(/[^\d]+/g)?.[0])
      .filter(Boolean);
    return Array.from(new Set(types));
  }, [data]);
  console.log("buildingTypeList", buildingTypeList);

  const colorType: ColorType = colorType2;

  return (
    <group
    // onPointerOver={(e) => {
    //   e.stopPropagation();
    //   console.log("hovered Mesh", e.intersections[0].object);
    // }}
    >
      {buildingTypeList.map((type, index) => (
        <CreateBuilding type={type!} key={index} />
      ))}
    </group>
  );
});

export default GenModel;
GenModel.displayName = "GenModel";
