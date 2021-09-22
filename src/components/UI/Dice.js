import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dice = props => {
    const diceType = 'dice-'+props.number
    const classes = "fa-layers fa-fw fa-10x " + (props.isSpinning ? 'fa-spin' : '')

    return <div style={{fontSize:"1.5vw"}}><span className={classes}>
        <FontAwesomeIcon icon={['fas', 'square']} color="black" transform="shrink-7" fixedWidth/>
        <FontAwesomeIcon icon={['fas', diceType]} color="rgb(214, 205, 205)" fixedWidth/>
        </span></div>
}

export default Dice