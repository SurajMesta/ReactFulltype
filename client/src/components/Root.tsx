import React, { useState,useEffect } from "react";

import QuizCard from "./QuizCard";
import { fetchQuiz } from "../API";
import { Difficulty } from "../API";
import { QuestionState } from "../API";
import { setTotalAnswers } from "../utils";
import {connect} from 'react-redux'
import '../App.css'
import {Redirect} from 'react-router-dom'


const TOTAL_QUESTIONS = 10;

export type AnsObj={
  question:string;
  answer:string;
  correct:boolean;
  correct_answer:string
}

const Root = (props:any) => {

 useEffect(()=>{
   fetch('/home',{
     method:'GET',
     headers:{
       'Accept':'application/json',
       'Authorization':"Bearer "+sessionStorage.getItem('token')
     }
   }).then(res=> res.json()).then(data=>{

     console.log(data.initials)
     props.getInit(data.initials)
     
   }).catch((err)=>{
     console.log(err)
   })

 },[])

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [useranswers, setUseranswers] = useState<AnsObj[]>([]);
  const [number, setNumber] = useState(0);
  const [gameover, setGameover] = useState(true);
  const [score, setScore] = useState(0);
  const[isanswered,setIsanswered]=useState(true)
  const[newgame,setNewgame]=useState(true)
  const[finalscore,setFinalscore]=useState(0)
  const[diff,setDiff]=useState(Difficulty.EASY)

  const startQuiz = async () => {
    setLoading(true);
    setGameover(false);

    const result = await fetchQuiz(TOTAL_QUESTIONS, diff);
    setQuestions(result);
    console.log(result)
    

    setLoading(false);
    setNewgame(false)

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer=e.currentTarget.value
    const correct=questions[number].correct_answer === answer
    const question=questions[number].question
    const correct_answer=questions[number].correct_answer

    const AnsObj={
      question,
      answer,
      correct,
      correct_answer
    }
   
    setUseranswers((data)=> [...data,AnsObj])
    if(correct) {
      setScore((prev)=> prev+10)
   
    } 



    setIsanswered(false)


    if(number==TOTAL_QUESTIONS-1){
      setGameover(true)
      setFinalscore(score)
      setNumber(0)
      setLoading(true)
      setUseranswers([])
      setNewgame(false)

    }


  };

  const nextQuestion = () => {



      setNumber((data)=> data+1)
    

      setIsanswered(true)












  };

  const clearFinalSc=()=>{
  setFinalscore(0)
  setScore(0)
  setNewgame(true)
  }

  const selValChange=(val:any)=>{
   
    setDiff(val)

  }

  if(!sessionStorage.getItem('token')) return <Redirect to="/signin"/>

  return (
    <React.Fragment>

        <div className="back-div">
        <div className="row ">
            <div className="col s12">
            <div className="card" id="main-card">
           <div className="card-title center-align">
           <h2 style={{color:'snow',textShadow:'2px 2px 2px #000'}}>React-Quiz</h2>
           
           </div>

           <div className="card-content">
           {newgame?(<p className="center-align" style={{color:'#382933',fontSize:'1.3rem',textShadow:"0.5px  #fff"}}> Please start the Quiz By Clicking on Start Button....</p>):(null)}
  {gameover && !newgame?(<span>Final-Score: &nbsp;{finalscore}</span>):(null)}
        <div className="card-body">

       { gameover ?(<div>
         <span>Select Difficulty: </span>

        <select name="" id="" onChange={(e)=>{
        selValChange(e.currentTarget.value)
        }} className='dropdown-trigger btn' style={{backgroundColor:'grey'}}>
       
           <option value={Difficulty.EASY}  >Easy</option>
           <option value={Difficulty.HARD}>Hard</option>
           <option value={Difficulty.MEDIUM}>Medium</option>
         </select>







       
       </div>
           
       ):(null)}
      

      <br/>
          {gameover ? (
            <button
              className="btn btn-md btn-info"
              onClick={() => {
                startQuiz();
                clearFinalSc()
              }}
            >
              {newgame?('Start-Quiz'):('Restart')}
            </button>
          ) : null}
          {!gameover ? <p className="center-align" style={{color:'#523906',fontSize:'1.5rem'}}>Score:{score}</p> : null}

          {loading &&!gameover &&(<p>Loading....</p>) }
          {!loading && !gameover && (
            <QuizCard
              question={questions[number].question}
              answers={questions[number].answers}
              questionnr={number + 1}
              totalquestions={TOTAL_QUESTIONS}
              callback={checkAnswer}
              useranswer={useranswers ? useranswers[number] : undefined}
            />
          )}
        </div>
           </div>

           <div className="card-footer">
          {!gameover && !loading && number !== TOTAL_QUESTIONS-1  && !isanswered  && (
            <button
              className="btn waves-effect waves-light "
              onClick={() => {
                nextQuestion();
              }}
              style={{width:'100%'}}
            >
              Next-Question
            </button>
          )}
        </div>

        </div>
            </div>
        </div>
        
       
        </div>












      
    </React.Fragment>
  );
};

const mapDispatchToProps=(dispatch:any)=>{
  return{
     getInit:(value:any)=>{
       dispatch({type:"ADD_INIT",payload:value})

     }
  }

}

export default connect(null,mapDispatchToProps)(Root);

