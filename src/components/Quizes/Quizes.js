import React from 'react'

function Quizes( {quiz} ) {



  return (
    <div className='main' style={{border:"2px solid black", padding:"10px 10px", borderRadius:"10px", display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
        <div>
        <p>
            Quiz Name: {quiz.quizname}
        </p>
        <p>
            Subject1: {quiz.choice1}
        </p>
        <p>
            Subject2: {quiz.choice2}
        </p>
        <p>
            Subject3: {quiz.choice3}
        </p>
        <p>
            Prize: {quiz.prize}
        </p>
        </div>
        <div>
            <button> Start Quiz </button>
        </div>
    </div>
  )
}

export default Quizes
