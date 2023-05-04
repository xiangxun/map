import React, { FC, forwardRef, useImperativeHandle, useMemo } from "react";
import { useSelector } from "react-redux";
import { useThree } from "@react-three/fiber";
import { useGLTF, Edges, Html } from "@react-three/drei";
import { BufferGeometry, BufferAttribute, Mesh, Vector3 } from "three";
import { colorType1, colorType2, colorType3 } from "@/assets";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import saveAs from "file-saver";
import { Select } from "@react-three/postprocessing";

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
  flag,
}) => {
  const fixInvertedFaces = (geometry: BufferGeometry) => {
    geometry.computeVertexNormals();
    const position = geometry.getAttribute("position");
    const normal = geometry.getAttribute("normal") as BufferAttribute;

    const indexArray = geometry.getIndex()?.array ?? [];
    for (let i = 0; i < position.count; i += 3) {
      const faceNormal = new Vector3(
        normal.getX(i),
        normal.getY(i),
        normal.getZ(i)
      );
      const dotProduct = faceNormal.dot(faceNormal);
      // console.log("faceNormal", faceNormal);
      // console.log("dotProduct", dotProduct);
      if (dotProduct < 0) {
        const swap = indexArray[i + 1];
        indexArray[i + 1] = indexArray[i + 2];
        indexArray[i + 2] = swap;
      }
    }
    geometry.setIndex(new BufferAttribute(new Uint16Array(indexArray), 1));
  };
  // const position = new BufferAttribute(new Float32Array(positionArray), 3);
  // const index = new BufferAttribute(new Uint16Array(indexArray), 1);

  // const bufferGeometry = new BufferGeometry();
  // bufferGeometry.setAttribute("position", position);
  // bufferGeometry.setIndex(index);
  // bufferGeometry.computeVertexNormals();
  const swapSecondAndThird = (arr: number[]): number[] => {
    const newArr: number[] = [];
    for (let i = 0; i < arr.length; i += 3) {
      newArr.push(arr[i + 0]);
      newArr.push(arr[i + 2]);
      newArr.push(arr[i + 1]);
    }
    return newArr;
  };

  const position = useMemo(
    () => new BufferAttribute(new Float32Array(positionArray), 3),
    [positionArray]
  );
  const normal = useMemo(
    () => new BufferAttribute(new Float32Array(positionArray), 3, false),
    [positionArray]
  );
  const index = useMemo(
    () =>
      flag
        ? new BufferAttribute(
            new Uint16Array(swapSecondAndThird(indexArray)),
            1
          )
        : new BufferAttribute(new Uint16Array(indexArray), 1),
    [flag, indexArray]
  );

  const bufferGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    // console.log("position", position);
    // console.log("index", index);
    geometry.setAttribute("position", position);
    geometry.setAttribute("normal", normal);
    geometry.setIndex(index);
    geometry.computeVertexNormals();
    geometry.normalizeNormals();
    // console.log("geometry", geometry);
    // fixInvertedFaces(geometry);

    // geometry.computeFaceNormals();
    return geometry;
  }, [position, normal, index]);

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
        // emissive={0xff0000}
        // emissiveIntensity={0.5}
        // roughness={0.1}
        // metalness={0.5}
        opacity={opacity}
        color={color}
        side={2}
      />
      <Edges threshold={30} color='#888888' />
    </mesh>
  );
};

const GenModel = React.forwardRef((props, ref) => {
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

  // 通过建筑类型名称生成建筑
  const CreateBuilding: FC<BuildingProps> = ({ type, flag }) => {
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
    // 使用 Object.values(data) 来获取 data 对象中的值数组，避免使用 filter() 方法进行筛选。我们使用空值合并操作符 ?? 来设置默认值，避免在 colorType[type] 为 undefined 或 null 时出现异常。最后，我们使用 逻辑运算符 || 来判断 value 对象中是否存在 vertex 和 vertex_index 属性，在解构时使用空对象 {} 作为默认值，以避免出现类型不匹配的问题。
    return (
      <>
        {/* {Object.values<DataType>(data).map((value, index) => {
          const { vertex, vertex_index } = value || {};
          const { opacity = 1, color = "#ffffff" } = colorType[type] ?? {};
          return (
            <CreateMesh
              type={type}
              key={index}
              positionArray={vertex}
              indexArray={vertex_index}
              opacity={opacity}
              color={color}
            />
          );
        })} */}
        {VertexData(type).map((item, index) => {
          const { vertex, vertex_index } = item;
          return (
            <CreateMesh
              type={type}
              flag={flag ? flag : false}
              key={index}
              positionArray={vertex}
              indexArray={vertex_index}
              opacity={colorType[type] ? colorType[type].opacity : 1}
              color={colorType[type] ? colorType[type].color : "#00ffff"}
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
    <Select
      name='GenModel'
      enabled
      // onPointerOver={(e) => {
      //   e.stopPropagation();
      //   console.log("hovered Mesh", e.intersections[0].object);
      // }}
    >
      {/* <CreateBuilding type='Tower' flag={true} /> */}
      {buildingTypeList.map((type, index) => (
        <CreateBuilding type={type!} key={index} />
      ))}
    </Select>
  );
});

export default GenModel;
GenModel.displayName = "GenModel";
