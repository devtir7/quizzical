import React from "react"

export default function Choice(props) {
    const styles = {
        backgroundColor: props.isSelected? "#D6DBF5" : "white"
    }
    
    return (
        <div
            className="answer-section"
            style={styles}
            onClick={props.selectAnswer}
        >
            <h3 className="answer-choice">{props.value}</h3>
        </div>
    )
}