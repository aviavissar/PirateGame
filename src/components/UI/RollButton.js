import classes from './RollButton.module.css'

const RollButton = props => {
    const btnClasses = `${classes.button} ${props.buttonIsHightlighted ? classes.bump : ''}`

    return <button className={btnClasses} onClick={props.onClick} disabled={props.isDisabled}>
        <span>{props.text}</span>
    </button>
}

export default RollButton