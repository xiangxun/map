import React from "react";
import SolutionLIst from "./components/SolutionLIst";
import AddSolution from "./components/AddSolution";
// const canvasRef = React.createRef<HTMLCanvasElement>();

interface SaveSolutionProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}
const SaveSolution: React.FC<SaveSolutionProps> = ({ canvasRef }) => {
  console.log("canvasRef", canvasRef);
  return (
    <div className=''>
      {/* <div>方案保存</div> */}
      <AddSolution canvasRef={canvasRef} />
      {/* <SolutionLIst /> */}
    </div>
  );
};

export default SaveSolution;
