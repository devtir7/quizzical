import { useState } from "react"
import Intro from "./intro-page.jsx"
import Quiz from "./quiz.jsx"

import "./index.css"

function App() {
  const [quizStarted, setQuizStarted] = useState(false)

  return (
    <>{quizStarted ? <Quiz /> : <Intro setQuizStarted={setQuizStarted} />}</>
  )
}

export default App
