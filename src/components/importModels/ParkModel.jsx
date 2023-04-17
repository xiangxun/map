import {
  BufferGeometry,
  BufferAttribute,
  MeshStandardMaterial,
  ShaderMaterial,
} from "three";
import { Edges, Select } from "@react-three/drei";
import { useSelector } from "react-redux";
import { useControls, folder } from "leva";
import { useThree } from "@react-three/fiber";

const Tower = ({ positionArray, indexArray, color, opacity }) => {
  const position = new BufferAttribute(new Float32Array(positionArray), 3);
  const index = new BufferAttribute(new Uint16Array(indexArray), 1);

  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute("position", position);
  bufferGeometry.setIndex(index);
  bufferGeometry.computeVertexNormals();

  const material = new MeshStandardMaterial({
    color: { color },
    transparent: true,
    side: 2,
  });

  return (
    <Select enable='true'>
      <mesh geometry={bufferGeometry} receiveShadow castShadow>
        <meshStandardMaterial
          transparent
          opacity={opacity}
          color={color}
          side={2}
        />
        <Edges threshold={30} silhouette={true} color='#FFF' lineWidth={2} />
      </mesh>
    </Select>
  );
};
const Skirt = ({ positionArray, indexArray, color, opacity }) => {
  const position = new BufferAttribute(new Float32Array(positionArray), 3);
  const index = new BufferAttribute(new Uint16Array(indexArray), 1);

  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute("position", position);
  bufferGeometry.setIndex(index);
  bufferGeometry.computeVertexNormals();

  return (
    <mesh geometry={bufferGeometry} receiveShadow castShadow>
      <meshStandardMaterial
        transparent
        opacity={opacity}
        color={color}
        side={2}
      />
      <Edges threshold={30} silhouette={true} color='#000000' lineWidth={2} />
    </mesh>
  );
};
const Plane = ({ positionArray, indexArray, color, opacity }) => {
  const position = new BufferAttribute(new Float32Array(positionArray), 3);
  const index = new BufferAttribute(new Uint16Array(indexArray), 1);

  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute("position", position);
  bufferGeometry.setIndex(index);
  bufferGeometry.computeVertexNormals();

  return (
    <mesh geometry={bufferGeometry} receiveShadow castShadow>
      <meshStandardMaterial
        transparent
        opacity={opacity}
        color={color}
        side={2}
      />
      <Edges threshold={30} silhouette={true} color='#000000' lineWidth={2} />
    </mesh>
  );
};
const Site = ({ positionArray, indexArray, color, opacity }) => {
  const position = new BufferAttribute(new Float32Array(positionArray), 3);
  const index = new BufferAttribute(new Uint16Array(indexArray), 1);

  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute("position", position);
  bufferGeometry.setIndex(index);
  bufferGeometry.computeVertexNormals();

  return (
    <mesh geometry={bufferGeometry} receiveShadow castShadow>
      <meshStandardMaterial
        transparent
        opacity={opacity}
        color={color}
        side={2}
      />
      <Edges threshold={30} silhouette={true} color='#000000' lineWidth={2} />
    </mesh>
  );
};

const ParkModel = () => {
  const { scene } = useThree();
  console.log("scene in ParkModel", scene);

  //从store里取数据
  const data = useSelector((state) => state.data);
  // const arr = data ? Object.values(data) : [];

  const towerArr = data
    ? Object.values(data)
    : // .filter((key) => key.includes("Tower0"))
      // .map((key) => data[key])
      [];
  const skirtArr = data
    ? Object.keys(data)
        .filter((key) => key.includes("Skirt"))
        .map((key) => data[key])
    : [];
  const PlaneArr = data
    ? Object.keys(data)
        .filter((key) => key.includes("Plane"))
        .map((key) => data[key])
    : [];

  // const greenArr = data
  //   ? Object.keys(data)
  //       .filter((key) => key.includes("green"))
  //       .map((key) => data[key])
  //   : [];
  // const siteArr = data
  //   ? Object.keys(data)
  //       .filter((key) => key.includes("road"))
  //       .map((key) => data[key])
  //   : [];
  // const towerArr = data ? Object.values(data) : [];
  console.log("type", typeof towerArr);

  console.log("data in ParkModel", data);
  console.log("towerArr", towerArr);

  //GUI leva
  const config = useControls({
    Outline: folder(
      {
        center: { value: true },
        // tower: { value: true },
        building: { value: false },
      },
      { collapsed: false }
    ),
    Skirt: folder({
      skirtColor: { value: "#cee6e9" },
      skirtOpacity: { min: 0.0, max: 1.0, value: 1.0 },
    }),
    Tower: folder({
      towerColor: { value: "#e97b79" },
      towerOpacity: { min: 0.0, max: 1.0, value: 1.0 },
    }),

    // Site: folder({
    //   siteColor: { value: "#DDD" },
    //   siteOpacity: { min: 0.0, max: 1.0, value: 1.0 },
    // }),
    // Green: folder({
    //   greenColor: { value: "#9bad8c" },
    //   greenOpacity: { min: 0.0, max: 1.0, value: 1.0 },
    // }),
  });

  return (
    <>
      <Select enable='true'>
        {towerArr.map((item, index) => {
          const { vertices, vertex_indices } = item;
          return (
            <Tower
              key={index}
              positionArray={vertices}
              indexArray={vertex_indices}
              opacity={config.towerOpacity}
              color={config.towerColor}
            ></Tower>
          );
        })}
      </Select>
      {skirtArr.map((item, index) => {
        const { vertices, vertex_indices } = item;
        return (
          <Skirt
            key={index}
            positionArray={vertices}
            indexArray={vertex_indices}
            opacity={config.skirtOpacity}
            color={config.skirtColor}
          />
        );
      })}
      {PlaneArr.map((item, index) => {
        const { vertices, vertex_indices } = item;
        return (
          <Plane
            key={index}
            positionArray={vertices}
            indexArray={vertex_indices}
            opacity={config.skirtOpacity}
            color={config.skirtColor}
          />
        );
      })}

      {/* {greenArr.map((item, index) => {
        const { vertices, vertex_indices } = item;
        return (
          <Green
            key={index}
            positionArray={vertices}
            indexArray={vertex_indices}
            opacity={config.greenOpacity}
            color={config.greenColor}
            // color={"#00FF00"}
          />
        );
      })}
      {siteArr.map((item, index) => {
        const { vertices, vertex_indices } = item;
        return (
          <Site
            key={index}
            positionArray={vertices}
            indexArray={vertex_indices}
            opacity={config.siteOpacity}
            color={config.siteColor}
          />
        );
      })} */}
    </>
  );
};

export default ParkModel;
