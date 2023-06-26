import React from "react";
import Choice from "./choice.jsx"
import {nanoid} from "nanoid"

export default function(props) {
    const [choices, setChoices] = React.useState()

    //takes array of incorrect choices
    //inserts the correct choice into that array
    // //at a random position
    // let tempArr = props.incorrectChoices?.splice((props.incorrectChoices?.length+1) * Math.random() | 0, 0, props.correctAns)
    
    React.useEffect(() => {
        const tempArr = props.incorrectChoices?.toSpliced(Math.floor((props.incorrectChoices?.length + 1) * Math.random()) | 0, 0, props.correctAns)

        const fixedVal = tempArr?.map(item => {
            return {
                answer: item,
                id: nanoid(),
                isSelected: false
            }
        })

        setChoices(fixedVal)
    }, [])

    function selectAnswer(id) {
        setChoices(oldChoices => oldChoices.map(choice => {
            return choice.id === id ?
                {
                    ...choice,
                    isSelected: !choice.isSelected
                }
                :
                choice
        }))
    }
    
    const choiceElements = choices?.map(choice =>
            <Choice 
                    key={choice.id}
                    value={choice.answer}
                    isSelected={choice.isSelected}
                    selectAnswer={() => selectAnswer(choice.id)}
            />        
    )

    

    React.useEffect(() => {
        console.log(choices)
    }, [console.log(choices)])

    return (
        <>
            <h2 className="question-text">{props.value}</h2>
            {choiceElements}
        </>
    )
}