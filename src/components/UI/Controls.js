import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import GameContext from '../../store/game-context'

const Controls = () => {
  const gameCtx = useContext(GameContext)
  const isScrollingEnabled = gameCtx.isScrollingEnabled
  const onClickHandler = gameCtx.toggleScrolling

  const element = <span className="fa-layers fa-fw fa-5x" onClick={onClickHandler} style={{cursor:"pointer"}}>
    <FontAwesomeIcon icon={['fas', 'circle']} color={isScrollingEnabled ? 'lightgreen' : 'white'} />
    <FontAwesomeIcon icon={['far', 'hand-paper']} transform="shrink-7" />
  </span>

  return <div style={{ marginBottom: "20vh" }}>{element} <br />
    <span style={{ fontSize: "x-large", userSelect: "none" }}>Browse map</span>
  </div>
}

export default Controls