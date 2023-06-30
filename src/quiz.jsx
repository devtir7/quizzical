import React from 'react'
import './index.css'
import Question from './question.jsx'
import {nanoid} from "nanoid"
import {decode} from 'html-entities';

export default function() {
    const [count, setCount] = React.useState(0)
    const [result, setResult] = React.useState(+false) //keeps track of whether the quiz has been submitted
    const [questions, setQuestions] = React.useState([])
    const [loaded, setLoaded] = React.useState(false) 
    
    // const fetchData = async () => {
    //     const response = 

    //     if (!response.ok) {
    //         throw new Error("Data could not be fetched")
    //     }
    //     else {
    //         return response.json()
    //     }
    // }

    async function getQuestions() {
            const res = await fetch('https://opentdb.com/api.php?amount=5')
            const data = await res.json()

            var temp = data.results.map(item => {
                return {
                    ...item,
                    id: nanoid(),
                    selectedAnswer: '',
                    isCorrect: null,
                    selectedAnswerID: 0
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

    function handleSubmit(event) {
        event.preventDefault()

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

        //if clicked play again
        //reset count to 0
        //fetch random questions again from OpenTrivia API
        //set result to false
        else {
            setCount(0)
            getQuestions()
            setResult(+false)
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
                
            <button className="quiz-button">{result ? "Play again" : "Check answers"}</button>

            {!!result && <p className='quiz-result'>You scored {count}/{questions.length} correct answers</p>}
            
            </form>
    
        </div>
    )
}