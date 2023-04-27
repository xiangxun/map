import React, { useImperativeHandle, useMemo } from "react";
import { useSelector } from "react-redux";
import { BufferGeometry, BufferAttribute } from "three";
import { useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { saveAs } from "file-saver";

const CreateMesh = ({ type = "mesh", positionArray, indexArray, color, opacity }) => {
  const position = useMemo(() => new BufferAttribute(new Float32Array(positionArray), 3), [positionArray]);
  const index = useMemo(() => new BufferAttribute(new Uint16Array(indexArray), 1), [indexArray]);

  const bufferGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", position);
    geometry.setIndex(index);
    geometry.computeVertexNormals();
    return geometry;
  }, [position, index]);

  return (
    <mesh
      name={type}
      geometry={bufferGeometry}
      receiveShadow
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        console.log(`click ${type}`, e.intersections[0].object);
      }}
    >
      <meshStandardMaterial transparent opacity={opacity} color={color} />
      <Edges threshold={30} silhouette color='#000' lineWidth={2} />
    </mesh>
  );
};

const ParkModel = React.forwardRef((props, ref) => {
  const { scene } = useThree();

const exportGLB = () => { const exporter = new GLTFExporter();
  exporter.parse( scene, (gltf) => { const output = JSON.stringify(gltf, null, 2);
     const blob = new Blob([output],
      { type: "application/octet-stream" });
      saveAs(blob, "scene.glb");
    },
    { onlyVisible: false, binary: true } );
   };

useImperativeHandle(ref, () => ({ exportGLB }));

const data = useSelector((state) => state.data);

const buildingType = useMemo(() => { 
    const types = ["Tower", "Skirt", "Plane"]; 
return types.reduce((acc, type) => { 
    const buildings = Object.entries(data)
    .filter(([key]) => key.includes(type))
    .map(([, value]) => value); 
    return {...acc, [type]: buildings }; 
}, {}); }, [data]);

const config = { Skirt: { Color: "#cee6e9", Opacity: 1.0, }, Tower: { Color: "#e97b79", Opacity: 1.0, }, };

const renderBuildingType = (type) => { return buildingType[type].map(({ vertices, vertex_indices }, index) => { return ( ); }); };

return (
    <>
    renderBuildingType(Tower),
    renderBuildingType(Skirt),
    renderBuildingType(Plane),
    </>
  );
 });

export default ParkModel;
ParkModel.displayName = "ParkModel";
