import React from "react";
import ScrollingGraphic from "../../../games/trex/safari";

const App: React.FC = () => {
  return (
    <div className="grid w-full">
      <div className="grid justify-center m-4">
        <h1>AREA 51 SECTION</h1>
      </div>

      <ScrollingGraphic />
    </div>
  );
};

export default App;
