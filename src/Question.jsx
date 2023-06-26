import React from "react";
import Choice from "./choice.jsx"
import {nanoid} from "nanoid"

export default function(props) {
    //console.log(props)
    const [choices, setChoices] = React.useState()

    // var arrLength = props.incorrectChoices.length

    //takes array of incorrect choices
    //inserts the correct choice into that array
    //at a random position
    

    React.useEffect(() => {
        const tempArr = props.incorrectChoices?.splice((props.incorrectChoices?.length+1) * Math.random() | 0, 0, props.correctAns)
        // console.log(props.correctAns)
        const fixedVal = tempArr?.map(item => {
            console.log(item)
            return {
                ...item,
                id: nanoid(),
                isSelected: false
            }
        })
        // console.log(props.incorrectChoices)
        setChoices(fixedVal)
    }, [])

    function selectAnswer(id) {
        setChoices(oldChoices => oldChoices.map(choice => {
            return choice.id === id ?
                {...choice, isSelected: !isSelected} :
                choice
        }))
    }
    
    const choiceElements = choices?.map(choice =>
        <>
        <p>choices</p>
            {/* <Choice 
                    key={choice.id}
                    value={choice.value}
                    isSelected={choice.isSelected}
                    selectAnswer={() => selectAnswer(choice.id)}
            /> */}
        </>
        
    )

    React.useEffect(() => {
        console.log(tempArr)
    }, [console.log(tempArr)])

    return (
        <>
            <h2 className="question-text">{props.value}</h2>
            {choiceElements}
        </>
    )
}