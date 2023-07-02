import React from "react"
import classNames from "classnames"

export default function Choice(props) {
    
    function handle() {
        props.handleSelection(props.groupKey, props.value)
        props.selectAnswer(props.choiceKey)
    }

    return (
        <>
            <input
                type="radio"
                id={props.choiceKey}
                name={props.groupKey}
                value={props.answer}
                onClick={handle}
                disabled={props.disabled}
                result={props.result}
            />
                {/* conditionally sets CSS classes according to each choice */}
                <label htmlFor={props.choiceKey} className={classNames("button", {
                    'correct-choice': props.result && props.isCorrect,
                    'incorrect-choice': props.result && props.isSelected && !props.isCorrect,
                    'unselected-choice': props.result && !props.isSelected,
                    'no-hover': props.result && props.disabled
                })}>{props.value}
                </label>
        </>
    )
}