import React from 'react'
import Intro from "./intro-page.jsx"
import QuestionsPage from "./questions-page.jsx"

function App() {
  const [quizStarted, setQuizStarted] = React.useState(true)

  return (
    <>
      {quizStarted ?
                    <QuestionsPage
                    
                    />
                    
                    : <Intro
                      setQuizStarted={setQuizStarted}
                    
                    />
          }
    </>
  )
}

export default App
