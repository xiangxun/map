import { useThree } from "@react-three/fiber";
import saveAs from "file-saver";
import { forwardRef, useImperativeHandle } from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

const ExportModels: React.FC = forwardRef((props, ref) => {
  const { scene } = useThree();
  console.log("scene in ExportModels", scene);

  const exportGLTF = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (gltf) => {
        const output = JSON.stringify(gltf, null, 2);
        console.log("output", output);
        const blob = new Blob([output], { type: "text/plain" });
        // saveAs(blob, "scene.gltf");
      },
      (error) => {
        console.log(error);
      },
      { binary: false }
    );
  };
  // exportGLTF();

  const sayHello = () => {
    alert("Hello from child component!");
  };

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
        console.log(error);
      },
      { onlyVisible: false, binary: true }
    );
  };

  useImperativeHandle(ref, () => ({
    sayHello: sayHello,
    exportGLB: exportGLB,
  }));
  return <></>;
});

ExportModels.displayName = "ExportModels";
export default ExportModels;
