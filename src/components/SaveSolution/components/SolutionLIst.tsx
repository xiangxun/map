import React from "react";
import Solution from "./Solution";

const SolutionLIst = (
  solutions: { [s: string]: React.ReactNode } | ArrayLike<React.ReactNode>
) => {
  return (
    <div className='h-[1000px] overflow-y-scroll'>
      <div className=''>{Object.values(solutions)}</div>
    </div>
  );
};

export default SolutionLIst;
