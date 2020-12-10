import React from "react";
import { RecoilRoot } from "recoil";

import { Overlay } from "./component/Overlay";
import { BoardScene } from "./component/Board";

function App() {
  return (
    <RecoilRoot>
      <BoardScene />
      <Overlay />
    </RecoilRoot>
  );
}

export default App;
