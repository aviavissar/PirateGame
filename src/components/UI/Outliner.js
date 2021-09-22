import { useContext, useState } from 'react'
import classes from './Outliner.module.css'
import Controls from './Controls'
import RollButton from './RollButton'
import Dice from './Dice'
import GameContext from '../../store/game-context'

const Outliner = () => {
    const gameCtx = useContext(GameContext)

    const numbers = ['one', 'two', 'three', 'four', 'five', 'six']
    const [buttonIsHightlighted, setButtonIsHighlighted] = useState(false)
    const isDiceRolling = gameCtx.isDiceRolling
    const displayedDiceNumber = gameCtx.rolledNumber
    const buttonText = isDiceRolling ? 'Rolling...' : 'Roll Dice'
    const displayedDiceNumberAsText = numbers[displayedDiceNumber - 1]
    const isRollingEnabled = gameCtx.isRollingEnabled

    const onRollHandler = () => {
        setButtonIsHighlighted(true)
        gameCtx.rollDice()
        setTimeout(() => {
            setButtonIsHighlighted(false)
        }, 300);
    }

    return <div className={classes.outliner}>
        <Controls />
        <RollButton onClick={onRollHandler}
            text={buttonText}
            buttonIsHightlighted={buttonIsHightlighted}
            isDisabled={!isRollingEnabled} />
        <Dice number={displayedDiceNumberAsText} isSpinning={isDiceRolling} />
    </div>
}

export default Outliner