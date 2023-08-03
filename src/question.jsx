import { useState, useEffect } from "react"
import Choice from "./choice.jsx"
import { nanoid } from "nanoid"

export default function Question(props) {
  const [choices, setChoices] = useState()

  //function that randomizes the positions of the items of an array
  function shuffle(sourceArray) {
    for (let i = 0; i < sourceArray.length - 1; i++) {
      let j = i + Math.floor(Math.random() * (sourceArray.length - i))

      let temp = sourceArray[j]
      sourceArray[j] = sourceArray[i]
      sourceArray[i] = temp
    }
    return sourceArray
  }

  useEffect(() => {
    let tempArr = props?.incorrectChoices //assigns the props.incorrectChoices array to tempArr
    tempArr.splice(1, 0, props.correctAns) //inserts value of correct answer into the tempArr array, thus creating an array of all the answer choices
    let tempB = shuffle(tempArr) //positions of the items in tempArr are shuffled

    const fixedVal = tempB?.map(item => {
      return {
        answer: item,
        id: nanoid(),
        isCorrect: props.result && item === props.correctAns ? true : false,
        isSelected: false,
      }
    })

    setChoices(fixedVal)
    // console.log(typeof tempArr)
  }, [])

  useEffect(() => {
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
        isCorrect:
          props.result && item.answer === props.correctAns ? true : false,
      }
    })

    setChoices(fixedVal)
  }, [props.result])

  //uses the ID of the answer choice that the user clicked
  //to toggle the value of isSelected to true
  //and setting isSelected to false for every other choice
  function selectAnswer(choiceID) {
    setChoices(oldChoices =>
      oldChoices.map(choice => {
        return choice.id === choiceID
          ? {
              ...choice,
              isSelected: true,
            }
          : {
              ...choice,
              isSelected: false,
            }
      })
    )
  }

  //function from parent component
  function handleSelection(groupID, answer) {
    props.handleSelection(groupID, answer)
  }

  //stores each of the answer choices and their props for the current question
  const choiceElements = choices?.map(choice => (
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
  ))

  return (
    <>
      <h1 className="question-text">{props.value}</h1>
      <div className="answer-section">{choiceElements}</div>
      <hr />
    </>
  )
}
