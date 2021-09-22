import GameContext from "./game-context"
import { useReducer } from "react"
import { httpService } from "../services/http.service"
import ip from 'ip'

const defaultGameState = {
    rolledNumber: 3,
    pirateLocation: 1,
    isDiceRolling: false,
    isScrollingEnabled: false,
    isModalVisible: false,
    isRollingEnabled: true,
    ModalContent: <p>Hello Modal</p>
}

const jokes = []

httpService.get('joke').then((res) => {
    res.forEach(joke => {
        jokes.push(joke.content)
    });
    console.log(jokes)
})

const gameReducer = (state, action) => {

    if (action.type === 'TOGGLE_MODAL_VISIBILITY') {
        if (window.innerHeight > window.innerWidth) {
            return { ...state, isModalVisible: true, ModalContent: <p>This app in not supported in portrait mode. Please switch your device's display mode to landscape.</p> }
        }
        return { ...state, isModalVisible: !state.isModalVisible }
    }

    if (action.type === 'SET_MODAL_CONTENT') {
        return { ...state, ModalContent: action.element }
    }

    if (action.type === 'TOGGLE_SCROLLING') {
        return { ...state, isScrollingEnabled: !state.isScrollingEnabled }
    }

    if (action.type === 'TOGGLE_ROLLING_ENABLED') {
        return { ...state, isRollingEnabled: !state.isRollingEnabled }
    }

    if (action.type === 'TOGGLE_DICE_STATE') {
        return { ...state, isDiceRolling: !state.isDiceRolling }
    }

    if (action.type === 'SET_DICE_VALUE') {
        return { ...state, rolledNumber: action.value }
    }

    if (action.type === 'SET_PIRATE_LOCATION') {
        return { ...state, pirateLocation: action.value }
    }

    if (action.type === 'RESET_GAME') {
        return defaultGameState
    }

    return defaultGameState
}

const GameProvider = props => {
    const [gameState, dispatchGameAction] = useReducer(gameReducer, defaultGameState)

    const rollDiceHandler = () => {
        dispatchGameAction({ type: 'TOGGLE_DICE_STATE' })
        dispatchGameAction({ type: 'TOGGLE_ROLLING_ENABLED' })
        let value
        let interval = setInterval(() => {
            value = Math.floor(Math.random() * 6 + 1)
            dispatchGameAction({ type: 'SET_DICE_VALUE', value })
        }, 50);
        setTimeout(() => {
            clearInterval(interval)
            dispatchGameAction({ type: 'TOGGLE_DICE_STATE' })
            dispatchGameAction({ type: 'SET_PIRATE_LOCATION', value })
            httpService.post('log', { IP: ip.address(), action: `Player rolled ${value}` })
            let newModalContent
            switch (value) {
                case 1:
                    newModalContent = <p>You didn't get off the island. Game Over :(</p>
                    httpService.post('log', { IP: ip.address(), action: `Player didn't get off the island` })
                    httpService.post('log', { IP: ip.address(), action: `Game Over` })
                    break;
                case 2:
                    const rumRoll = Math.floor(Math.random() * (2))
                    if (rumRoll) {
                        newModalContent = <p>You found a barrel of rum. It tastes great. You feel like a true pirate! You win! :)</p>
                        httpService.post('log', { IP: ip.address(), action: `Player got good rum` })
                        httpService.post('log', { IP: ip.address(), action: `Player won` })
                    }
                    else {
                        newModalContent = <p>You found a barrel of rum. It tastes sour. You feel sick! Game Over :(</p>
                        httpService.post('log', { IP: ip.address(), action: `Player got spoiled rum` })
                        httpService.post('log', { IP: ip.address(), action: `Game Over` })
                    }
                    break;
                case 3:
                    newModalContent = <p>You got eaten by the Kraken. Game Over :(</p>
                    httpService.post('log', { IP: ip.address(), action: `Player got eaten by kraken` })
                    httpService.post('log', { IP: ip.address(), action: `Game Over` })
                    break;
                case 4:
                    newModalContent = <p>You found the buried treasure! You win! :)</p>
                    httpService.post('log', { IP: ip.address(), action: `Player got the treasure` })
                    httpService.post('log', { IP: ip.address(), action: `Player won` })
                    break;
                case 5:
                    const joke = jokes[Math.floor(Math.random() * (jokes.length + 1))]
                    newModalContent = <p>You found a message in a bottle. It says:<br /> <br /> <span>{joke}</span></p>
                    httpService.post('log', { IP: ip.address(), action: `Player got joke:${joke}` })
                    break;
                case 6:
                    newModalContent = <p>You crossed the archipelago and managed to get rescued. You win! :)</p>
                    httpService.post('log', { IP: ip.address(), action: `Player got to the end` })
                    httpService.post('log', { IP: ip.address(), action: `Player won` })
                    break;
                default:
                    break
            }
            dispatchGameAction({ type: 'SET_MODAL_CONTENT', element: newModalContent })
            setTimeout(() => {
                dispatchGameAction({ type: 'TOGGLE_MODAL_VISIBILITY' })
                dispatchGameAction({ type: 'TOGGLE_ROLLING_ENABLED' })

            }, 1000 * (value - 1))
        }, 1000);
    }

    const toggleScrollingHandler = () => {
        dispatchGameAction({ type: 'TOGGLE_SCROLLING' })
    }

    const resetGameHandler = () => {
        dispatchGameAction({ type: 'RESET_GAME' })
    }

    const toggleModalVisibilityHandler = () => {
        dispatchGameAction({ type: 'TOGGLE_MODAL_VISIBILITY' })
    }

    const gameContext = {
        rolledNumber: gameState.rolledNumber,
        pirateLocation: gameState.pirateLocation,
        isDiceRolling: gameState.isDiceRolling,
        isScrollingEnabled: gameState.isScrollingEnabled,
        isRollingEnabled: gameState.isRollingEnabled,
        isModalVisible: gameState.isModalVisible,
        ModalContent: gameState.ModalContent,
        rollDice: rollDiceHandler,
        toggleScrolling: toggleScrollingHandler,
        resetGame: resetGameHandler,
        toggleModalVisibility: toggleModalVisibilityHandler
    }

    return <GameContext.Provider value={gameContext}>
        {props.children}
    </GameContext.Provider>
}

export default GameProvider