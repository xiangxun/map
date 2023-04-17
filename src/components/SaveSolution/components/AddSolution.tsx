import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddSolution = (props: any) => {
  //   const { input, setInput } = useState();
  //   const todo = useSelector((state) => state.todo[props.id]);
  const dispatch = useDispatch();

  const handleAddSolution = () => {
    console.log("Add Solution");
  };

  return (
    <div>
      <button className='bg-blue-300 shadow-md' onClick={handleAddSolution}>
        <div>AddSolution</div>
      </button>
    </div>
  );
};

export default AddSolution;
