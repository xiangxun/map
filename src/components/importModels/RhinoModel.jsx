import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";

const MyModel = () => {
  const rhinoFile = "models/Rhino3dmModel.3dm";
  const { gl, scene, camera, size } = useThree();
  const rhino3dmLoader = new Rhino3dmLoader();
  rhino3dmLoader.setLibraryPath(
    "https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/"
  );

  rhino3dmLoader.load(
    rhinoFile,
    (object) => {
      object.rotation.set(-Math.PI / 2, 0, 0);
      //   object.scale.set(0.1, 0.1, 0.1);
      object.position.set(1, 0, -1);
      object.castShadow = true;
      object.receiveShadow = true;
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
