import { useEffect, useRef, useContext, Fragment } from 'react'
import Pirate from './Pirate'
import Modal from '../UI/Modal'
import map from '../../assets/Map.png'
import GameContext from '../../store/game-context'
import ScrollContainer from 'react-indiana-drag-scroll'

const Game = () => {
    const container = useRef(null);
    const gameCtx = useContext(GameContext)
    const isScrollingEnabled = gameCtx.isScrollingEnabled
    const isModalVisible = gameCtx.isModalVisible
    const ModalContent = gameCtx.ModalContent
    const onClickHandler = gameCtx.toggleModalVisibility

    document.body.onresize = () => {
        if (window.innerHeight>window.innerWidth) {
            gameCtx.toggleModalVisibility()
        }
    }

    useEffect(() => {
        if (container.current) {
            container.current.scrollTo(0, 0);
        }
    }, []);

    return <Fragment>
        {isModalVisible && <Modal onClick={onClickHandler}>{ModalContent}</Modal>}
        <ScrollContainer innerRef={container}
            vertical={isScrollingEnabled}
            horizontal={isScrollingEnabled}
            style={{ height: "100vh" }}>
            <div style={{ height: "100%" }}>
                <img src={map} alt="map" />
                <Pirate />
            </div>
        </ScrollContainer>
    </Fragment>
}

export default Game