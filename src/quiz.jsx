import React from 'react'
import './index.css'
import Question from './question.jsx'
import {nanoid} from "nanoid"
import {decode} from 'html-entities';

export default function() {
    const [count, setCount] = React.useState(0) //used to count how many answers the user got right
    const [result, setResult] = React.useState(+false) //keeps track of whether the quiz has been submitted
    const [questions, setQuestions] = React.useState([]) //used to store the fetched questions
    const [loading, setLoading] = React.useState(false) //used to enable or disable the form's submit button while the quiz is being reset
    const [fetching, setFetching] = React.useState(true) //used to show or hide the form's submit button while the quiz is being initialized for the first time
    const [showQuizError, setShowQuizError] = React.useState(false) //keeps track of whether the error message prompting the user to select all answers should be displayed
    const [errorAPI, setErrorAPI] = React.useState(null) //stores the error message in case of an error occurring while fetching questions from the OpenTrivia API
    
    //function used to add a delay in ms before executing the next line of code
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms))

    //fetches random questions from the OpenTrivia API and stores them in the 'questions' state variable
    async function getQuestions() {
            try {
                const res = await fetch('https://opentdb.com/api.php?amount=5')

                if (!res.ok) {
                    throw Error("Could not retrieve questions")
                }

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
                setFetching(false)
            }
            catch(e) {
                setErrorAPI(e.message)
                console.log(e.message)
            }
        }

    React.useEffect(() => {
        getQuestions()
    }, [])

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

    //function that runs when the form's submit button is clicked 
    async function handleSubmit(event) {
        event.preventDefault()

        //check if each question has a non-blank selectedAnswer and store the result in allAnswered
        const allAnswered = questions.every(question => question.selectedAnswer !== "")

        //if even a single question has a blank selectedAnswer, error message is displayed
         if (!allAnswered) {
            setShowQuizError(true);
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
            await delay(500)
            setCount(0)      //reset correct answer count to 0
            setResult(+false) //set result i.e. quiz submitted to false
            setShowQuizError(false) //hides the error message upon quiz reset
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
                    incorrectChoices={question.incorrect_answers.map(ans => decode(ans))} //maps through each item of incorrect_answers and applies the decode function on them to get rid of HTML entities
                    handleSelection={handleSelection}
                    result={result}
                    isCorrect={question.isCorrect}
                    disabled={result ? true : false}
                    handleSubmit={handleSubmit}
                />
            )
        })
        
    return (
        
        <div>
            {/* displays error in case of failing to fetch questions from OpenTrivia API */}
            {errorAPI && <h2>{errorAPI}</h2>}

            {/* conditionally renders form,its submit button, questions, and answer choices
                if the questions have been fetched from the OpenTrivia API successfully */}
            {fetching ? (
                <h1 className="loading-screen">Loading questions...</h1>
            ) : (
            
                <form onSubmit={handleSubmit}>
                    
                    <fieldset>
                        <div className='question-section'>
                            {renderQuestions()}
                        </div>
                    </fieldset>
                    
                {/* Switches text of button depending on state of result and loading
                    Button is disabled depending on the state of loading */}
                <button className="quiz-button" disabled={loading}>{loading ? "Resetting..." : (result ? "Play again" : "Check answers")}</button>

                {/* Conditional rendering of error message prompting user to select an answer for each question */}
                {!result && showQuizError && <p className="error-message">Please answer all questions.</p>}

                {/* Conditional rendering of the user's quiz score */}
                {!!result && <p className='quiz-result'>You scored {count}/{questions.length} correct answers</p>}
                
                </form>
                )}
    
        </div>
    )
}