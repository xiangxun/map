import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGLTF, Edges, Html } from "@react-three/drei";
import { BufferGeometry, BufferAttribute, Mesh } from "three";
import { colorType1, colorType2, colorType3 } from "@/assets";

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
const CreateMesh: React.FC<CreateMeshProps> = ({
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

const FacadeModel = React.forwardRef((props, ref) => {
  //从store里取数据
  const data = useSelector((state: any) => state.data);
  // 通过建筑类型生成建筑
  const CreateBuilding = useMemo(() => {
    return (type: string) => {
      return Object.keys(data)
        .filter((key) => key.includes(type))
        .map((key) => data[key]);
    };
  }, [data]);
  console.log("data in FacadeModel", data);

  const buildingTypeLIst: string[] = data ? Object.keys(data) : [];
  console.log("buildingTypeLIst", buildingTypeLIst);

  const colorType: ColorType = colorType2;

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        console.log("hovered Mesh", e.intersections[0].object);
      }}
      // onClick={(e) => {
      //   console.log("click", e);
      // }}
    >
      {buildingTypeLIst.map((type, index) => {
        return CreateBuilding(type).map((item, index) => {
          const { vertex, vertex_index } = item;
          return (
            <CreateMesh
              type={type}
              key={index}
              positionArray={vertex}
              indexArray={vertex_index}
              opacity={colorType[type].opacity}
              color={colorType[type].color}
            />
          );
        });
      })}
    </group>
  );
});

export default FacadeModel;
FacadeModel.displayName = "FacadeModel";
