import React from "react";
import Choice from "./choice.jsx"
import {nanoid} from "nanoid"

export default function(props) {
    const [choices, setChoices] = React.useState()

    React.useEffect(() => {
        //takes array of incorrect choices
        //inserts the correct choice into that array
        //at a random position
        const tempArr = props.incorrectChoices?.toSpliced(Math.floor((props.incorrectChoices?.length + 1) * Math.random()) | 0, 0, props.correctAns)

        const fixedVal = tempArr?.map(item => {
            return {
                answer: item,
                id: nanoid(),
                isCorrect: (props.result && (item === props.correctAns)) ? true: false,
                isSelected: false
            }
        })

        setChoices(fixedVal)
    }, [])

    React.useEffect(() => {
        //if result is false
        //i.e. quiz hasn't been submitted
        if (!props.result) return

        //loops through each of the answer choices for the particular question
        //if result has been submitted i.e. props.result
        //and the current choice is the correct answer i.e. item.answer === props.correctAns
        //it sets the isCorrect to true for that answer choice
        const fixedVal = choices?.map(item => {
            return {
                ...item,
                isCorrect: (props.result && (item.answer === props.correctAns)) ? true: false,
            }
        })

        setChoices(fixedVal)
    }, [props.result])

    //uses the ID of the answer choice that the user clicked
    //to toggle the value of isSelected to true
    //and setting isSelected to false for every other choice
    function selectAnswer(choiceID) {
        setChoices(oldChoices => oldChoices.map(choice => {
            return choice.id === choiceID ?
                {
                    ...choice,
                    isSelected: true
                }
                :
                {
                    ...choice,
                    isSelected: false
            }
        }))
    }

    //function from parent component
    function handleSelection(groupID, answer) {
        props.handleSelection(groupID, answer)
    }
    
    //stores each of the answer choices and their props for the current question
    const choiceElements = choices?.map(choice =>
            <Choice 
                    key={choice.id}
                    groupKey={props.sectionKey} //id of whole group of 4 choices
                    choiceKey={choice.id} //id of that one particular choice out of 4
                    value={choice.answer} //the one singular answer choice itself
                    isSelected={choice.isSelected}
                    handleSelection={handleSelection}
                    selectAnswer={selectAnswer}
                    isCorrect={choice.isCorrect}
                    result={props.result}
                    disabled={props.disabled}
            />   
    )
    // React.useEffect(() => {
    //     console.log(choices)
    // }, [choices])

    return (
        <>
            <h1 className="question-text">{props.value}</h1>
            <div className="answer-section">
                {choiceElements}
            </div>
            <hr/>
        </>
    )
}