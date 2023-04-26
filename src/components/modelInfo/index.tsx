import React from "react";
import { useSelector } from "react-redux";

function ModelInfo() {
  // use modelInfo data from redux
  const modelInfo = useSelector((state: any) => state.modelInfo);
  console.log("modelInfo", modelInfo);

  return (
    <div>
      {/* <div>modelInfo</div> */}
      <div className='text-xs p-2 bg-gray-200 rounded-xl'>
        <div>{modelInfo ? modelInfo : ""}</div>
      </div>
      {/* {meshInfo.map((meshInfoItem, index) => ( */}
      {/* // <div key={index}> */}
      {/* <p>{meshInfoItem.name}</p> */}
      {/* <p>颜色：{meshInfoItem.color.toArray().join(", ")}</p> */}
      {/* <p>位置：{meshInfoItem.position.toArray().join(", ")}</p> */}
      {/* <MaterialInfo material={meshInfoItem.material} /> */}
      {/* </div> */}
      {/* ))} */}
      {/* </div> */}
    </div>
  );
}

export default ModelInfo;
