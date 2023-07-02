import React from 'react'
import './index.css'
import Question from './question.jsx'
import {nanoid} from "nanoid"
import {decode} from 'html-entities';

export default function() {
    const [count, setCount] = React.useState(0)
    const [result, setResult] = React.useState(+false) //keeps track of whether the quiz has been submitted
    const [questions, setQuestions] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [showError, setShowError] = React.useState(false)
    
    // const fetchData = async () => {
    //     const response = 

    //     if (!response.ok) {
    //         throw new Error("Data could not be fetched")
    //     }
    //     else {
    //         return response.json()
    //     }
    // }

    //fetches random questions from the OpenTrivia API and stores them in the 'questions' state variable
    async function getQuestions() {
            
            const res = await fetch('https://opentdb.com/api.php?amount=5')
            const data = await res.json()

            var temp = data.results.map(item => {
                return {
                    ...item,
                    id: nanoid(),
                    selectedAnswer: '',
                    isCorrect: null
                }
            })
            setQuestions(temp)
        }

    React.useEffect(() => {
        getQuestions()
    }, [])

    // React.useEffect(() => {
    //     console.log(questions)
    // }, [questions])

    //runs when an answer choice is clicked
    //using the groupID which is basically the particular question's ID
    //it maps through each of the questions and once it finds the matching question.id
    //sets the value of that question's selectedAnswer to the clicked answer choice
    function handleSelection(groupID, answer) {
        setQuestions(oldQuestions => oldQuestions.map(question => {
            return question.id === groupID ?
                {
                    ...question,
                    selectedAnswer: answer
                }
                :
                question
        }))
    }


//     const delay = ms => new Promise(
//   resolve => setTimeout(resolve, ms)
// );

    //function that runs when the form's submit button is clicked 
    function handleSubmit(event) {
        event.preventDefault()

        //check if each question has a non-blank selectedAnswer and store the result in allAnswered
        const allAnswered = questions.every(question => question.selectedAnswer !== "")

        //if even a single question has a blank selectedAnswer, error message is displayed
         if (!allAnswered) {
            setShowError(true);
            return;
        }

        //DISPLAY RESULT OF QUIZ
        //if clicked check answers
        if (!result) {
            //for each question
            for (let i=0; i < questions.length; i++) {
                //if the chosen answer === the correct answer for that question
                if (questions[i].selectedAnswer === decode(questions[i].correct_answer)) {
                    setCount(oldCount => oldCount + 1) //increment the count of correct answers
                }
            }
            setResult(+true)
        }

        //RESET QUIZ
        //if clicked play again
        else {
            setLoading(true) //sets loading === true so that the submit button can't be clicked twice
                             //before the new quiz is loaded
            setCount(0)      //reset correct answer count to 0
            setResult(+false) //set result i.e. quiz submitted to false
            setShowError(false) //hides the error message upon quiz reset
            getQuestions() //fetch random questions again from OpenTrivia API
            setLoading(false) //sets loading to false so that the button is enabled
        }
    }

    //function to render each question by passing the relevant props to the Question component
    const renderQuestions = () => questions.map(question => {
            return (
                <Question
                    key={question.id}
                    sectionKey={question.id}
                    value={decode(question.question)}
                    correctAns={decode(question.correct_answer)}
                    incorrectChoices={decode(question.incorrect_answers)}
                    handleSelection={handleSelection}
                    result={result}
                    isCorrect={question.isCorrect}
                    disabled={result ? true : false}
                    handleSubmit={handleSubmit}
                    showError={showError}
                />
            )
        })
        
    return (
        
        <div className='quiz-page'>
            <form onSubmit={handleSubmit}>
                
                <fieldset>
                    <div className='question-section'>
                        {renderQuestions()}
                    </div>
                </fieldset>
                
            <button className="quiz-button" disabled={loading}>{result ? "Play again" : "Check answers"}</button>
            {!result && showError && <p className="error-message">Please answer all questions.</p>}
            {!!result && <p className='quiz-result'>You scored {count}/{questions.length} correct answers</p>}
            
            </form>
    
        </div>
    )
}