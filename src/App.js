import React from "react";

import Game from "./components/Game/Game";
import Outliner from "./components/UI/Outliner";

import GameProvider from "./store/GameProvider"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix, faSquare } from '@fortawesome/free-solid-svg-icons'
import { faHandPaper } from '@fortawesome/free-regular-svg-icons'

library.add(faCircle, faHandPaper, faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix, faSquare)

function App() {
  return (
    <GameProvider>
      <Game />
      <Outliner />
    </GameProvider>
  );
}

export default App;
