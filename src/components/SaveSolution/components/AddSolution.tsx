import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddSolution = (props) => {
  //   const { input, setInput } = useState();
  //   const todo = useSelector((state) => state.todo[props.id]);
  const dispatch = useDispatch();

  const handleAddSolution = () => {
    console.log("Add Solution");
  };

  return (
    <div>
      <input onChange={(e) => setInput(e)} />
      <button className='bg-blue-300' onClick={handleAddSolution}>
        <div>AddSolution</div>
      </button>
    </div>
  );
};

export default AddSolution;
