import React, { useEffect, useState } from 'react';
import './App.css';
import {quizDetail} from './Components/quizAPI'
import {QuestionType} from './Type/quiz_type'
import QuestionCard from './Components/questionCard'

function App() {

  let [quiz, setQuiz] = useState <QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState (0)
  let [score, setScore] = useState (0)


  useEffect(()=>{
    async function getApi() {
     const questions: QuestionType[] = await quizDetail(10, 'easy');
     console.log(questions)
     setQuiz(questions)
    }
    getApi()
  },[])

    //call back
    const handleSubmit = (e:React.FormEvent<EventTarget>, userAns: string)=>{
      e.preventDefault();
  
      // console.log(userAns)
  
      const currentQuestion :QuestionType = quiz[currentStep]
      // console.log("correct" + currentQuestion  .correct_answer + "user" + userAns)
  
      if(userAns === currentQuestion.correct_answer){
        setScore(++score)
      }
  
      if(currentStep !== quiz.length-1)
        setCurrentStep(++currentStep)   //for forwarding question
      else{
        alert(`You scored ${score} out of ${quiz.length}`)
        setCurrentStep(0)
      }
  
  } 

  if(!quiz.length)
  return <h3>Loading...</h3>

  return (
    <div className='App'>

      <h1 className='heading'>Typescript Quiz Application</h1>
      <h2 style={{textAlign:"center", padding:"15px", color:"yellow"}}> {score}/{quiz.length} </h2>

      <QuestionCard
      options={quiz[currentStep].option}
      question={quiz[currentStep].questions}
      callback={handleSubmit}
      />
    </div>
  );
}

export default App;
