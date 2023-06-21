import React from 'react'
import './index.css'

export default function(props) {

    function startQuiz() {
        props.setQuizStarted(true)
    }

    return (
        <div className='intro-screen'>
            <h1>Quizzical</h1>
            <p>Test your knowledge</p>
            <button onClick={startQuiz}>Start quiz</button>
            <div className='blob'></div>
        </div>   
    )
}