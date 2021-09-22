import { useContext } from 'react'
import PirateSprite from '../../assets/Pirate.png'
import classes from './Pirate.module.css'
import GameContext from '../../store/game-context'

const Pirate = props => {
    const gameCtx = useContext(GameContext)
    const pirateLocation = gameCtx.pirateLocation
    let spriteClasses = classes["pirate-sprite"]
    if (pirateLocation > 1) {
        spriteClasses += (' '+ classes[`animation-${pirateLocation-1}`])
    }

    return <img src={PirateSprite} alt="pirate"
        className={spriteClasses} />
}

export default Pirate