import React from "react";

const GameContext = React.createContext({
    rolledNumber: 3,
    pirateLocation: 1,
    isDiceRolling: false,
    isScrollingEnabled:false,
    isModalVisible:false,
    isRollingEnabled:true,
    ModalContent:<p>Hello Modal</p>,
    rollDice: () => {},
    toggleModalVisibility: () => {}
})

export default GameContext