import React from "react";
import Choice from "./choice.jsx"
import {nanoid} from "nanoid"

export default function(props) {
    //console.log(props)
    const [choices, setChoices] = React.useState()

    // var arrLength = props.incorrectChoices.length

    var tempArr = props.incorrectChoices?.splice(props.incorrectChoices.length+1 * Math.random() | 0, 0, props.correctAns)

    // tempArr = tempArr.map(item => {
    //     return {
    //         ...item,
    //         id: nanoid(),
    //         isSelected: false
    //     }
    // })
    
    // setChoices(tempArr)

    // function selectAnswer(id) {
    //     setChoices(oldChoices => oldChoices.map(choice => {
    //         return choice.id === id ?
    //             {...choice, isSelected: !isSelected} :
    //             choice
    //     }))
    // }

    // const choiceElements = choices.map(choice => {
    //     <Choice 
    //             key={choice.id}
    //             value={choice.value}
    //             isSelected={choice.isSelected}
    //             selectAnswer={() => selectAnswer(choice.id)}
    //     />
    // })

    return (
        <>
            <h2 className="question-text">{props.value}</h2>
            {/* {choices && choiceElements} */}
        </>
    )
}