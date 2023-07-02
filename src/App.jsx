import React from 'react'
import Intro from "./intro-page.jsx"
import Quiz from "./quiz.jsx"

function App() {
  const [quizStarted, setQuizStarted] = React.useState(true)

  return (
    <>
      {quizStarted ?
                    <Quiz
                    
                    />
                    
                    : <Intro
                      setQuizStarted={setQuizStarted}
                    
                    />
          }
    </>
  )
}

export default App
