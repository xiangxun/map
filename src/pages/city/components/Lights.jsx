const Lights = () => {
  return (
    <>
      {/* 坏境光 */}
      <ambientLight intensity={1.5} />
      {/* 平行光 */}
      <directionalLight
        castShadow
        intensity={0.8}
        position={[0, 500, 200]}
        shadow-mapSize={[4096, 4096]}
        // shadow-bias={-0.00015}
        color={"#fff"}
      >
        <orthographicCamera
          attach='shadow-camera'
          args={[-2000, 2000, 2000, -2000]}
        />
      </directionalLight>
    </>
  );
};
export default Lights;
