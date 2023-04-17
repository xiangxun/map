const Lights = () => {
  return (
    <>
      {/* 坏境光 */}
      <ambientLight intensity={0.2} />
      {/* 平行光 */}
      <directionalLight
        castShadow
        intensity={2.5}
        position={[0, 500, 200]}
        shadow-mapSize={4096}
        // shadow-mapSize={[4096, 4096]}
        shadow-bias={-0.00025}
        color={"#fff"}
      >
        <orthographicCamera
          attach='shadow-camera'
          args={[-400, 400, 400, -400, 100, 600]}
          // args={[-2000, 2000, 2000, -2000]}
        />
      </directionalLight>
      {/* <hemisphereLight color={"#ffffff"} groundColor='#dddddd' intensity={1} /> */}
    </>
  );
};
export default Lights;
