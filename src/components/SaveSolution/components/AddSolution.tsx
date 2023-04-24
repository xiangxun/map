import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Solution from "./Solution";
import SolutionLIst from "./SolutionLIst";
import { Button } from "antd";

interface AddSolutionProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const AddSolution: React.FC<AddSolutionProps> = ({ canvasRef }) => {
  const [solutions, setSolutions] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch();

  const handleAddSolution = () => {
    console.log("canvasRef", canvasRef);
    const newSolutions = [...solutions];
    newSolutions.push(
      <Solution canvasRef={canvasRef} key={newSolutions.length} />
    );
    setSolutions(newSolutions);
    // dispatch({
    //   type: "ADD_SOLUTION",
    //   payload: newSolutions,
    // });
  };

  return (
    <div className='flex flex-col max-w-lg'>
      {/* <div>AddSolution</div> */}
      <SolutionLIst solutions={solutions} />
      {/* {solutions} */}
      {/* <button
        onClick={handleAddSolution}
        className='text-white bg-blue-500  
      hover:bg-blue-700
      focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2
      text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        添加方案
      </button> */}
      <div className='absolute bottom-5 left-0 right-0 flex justify-center items-center'>
        <div className='w-64'>
          <Button
            block
            type='primary'
            className='font-bold text-white bg-blue-500 hover:bg-blue-700 sm:w-full'
            onClick={handleAddSolution}
          >
            添加方案
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSolution;
