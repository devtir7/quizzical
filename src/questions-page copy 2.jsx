import React from 'react'
import './index.css'
import Question from "./Question.jsx"
import {nanoid} from "nanoid"
import {decode} from 'html-entities';

export default function() {
    const [questions, setQuestions] = React.useState()
    
    // const fetchData = async () => {
    //     const response = 

    //     if (!response.ok) {
    //         throw new Error("Data could not be fetched")
    //     }
    //     else {
    //         return response.json()
    //     }
    // }

    React.useEffect(() => {
        async function getQuestions() {
            const res = await fetch('https://opentdb.com/api.php?amount=5')
            const data = await res.json()

            var tempArr = data.results.map(item => {
                return {
                    ...item,
                    id: nanoid()
                }
            })
            setQuestions(tempArr)  
            // setQuestions(() => data.results?.map(item => {
            //     return {
            //         ...item,
            //         nanoid: nanoid()
            //     }
            // }))

            // var tempArr = function () {
            //     return data.results.map(item => {
            //         return {
            //             ...item,
            //             id: nanoid()
            //         }
            //     })
            // }

            // console.log(tempArr)

           
            // setQuestions(oldRes => {
            //     return {
            //         ...oldRes,
            //         nanoid: nanoid()
            //     }
            // })
        }
        getQuestions()
    }, [])
React.useEffect(() => {
  console.log(questions); // Log updated value of questions
}, [questions]);

    return (
        
        <div className='questions-page'>

            <Question
                key={questions[0]?.id}
                value={decode(questions[0]?.question)}
                correctAns={questions[0]?.correct_answer}
                incorrectChoices={questions[0]?.incorrect_answers}
            />
            <Question
                key={questions[1]?.id}
                value={decode(questions[1]?.question)}
                correctAns={questions[1]?.correct_answer}
                incorrectChoices={questions[1]?.incorrect_answers}
            />
            <Question
                key={questions[2]?.id}
                value={decode(questions[2]?.question)}
                correctAns={questions[2]?.correct_answer}
                incorrectChoices={questions[2]?.incorrect_answers}
            />
            <Question
                key={questions[3]?.id}
                value={decode(questions[3]?.question)}
                correctAns={questions[3]?.correct_answer}
                incorrectChoices={questions[3]?.incorrect_answers}
            />                     
            <Question
                key={questions[4]?.id}
                value={decode(questions[4]?.question)}
                correctAns={questions[4]?.correct_answer}
                incorrectChoices={questions[4]?.incorrect_answers}
            />
            
            <div className='blob'></div>
    
        </div>
    )
}