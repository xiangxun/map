import Rhino3dmLoader from "three/examples/jsm/loaders/Rhino3dmLoader";

const rhino3dmLoader = new Rhino3dmLoader();
rhino3dmLoader.load("models/Rhino3dmModel.3dm", (object) => {
  console.log(object);
});
