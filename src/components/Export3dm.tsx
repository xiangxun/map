import { saveAs } from 'file-saver';
import { Rhino3dmExporter } from 'rhino3dm-exporter'; // changed import statement
import * as THREE from 'three';

const export3dm = () => {
  const exporter = new Rhino3dmExporter(); // changed class instantiation
  const scene = new THREE.Scene();
  // add your reant-three/fiber model to the scene
  exporter.parse(scene, (result) => {
    const blob = new Blob([result], { type: 'application/octect-stream' });
    saveAs(blob, 'model.3dm');
  });
};
