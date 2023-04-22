import React from "react";
import SolutionLIst from "./components/SolutionLIst";
import AddSolution from "./components/AddSolution";

function SaveSolution() {
  return (
    <div>
      <div>方案保存</div>
      <SolutionLIst />
      <AddSolution />
    </div>
  );
}

export default SaveSolution;
