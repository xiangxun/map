import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const SaveImage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const img = canvas.toDataURL('image/png');
      // save the image using img variable
    }
  }, [canvasRef]);

  return (
    <Canvas ref={canvasRef}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxBufferGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
};

export default SaveImage;
