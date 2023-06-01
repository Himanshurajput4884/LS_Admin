import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

function Quizes({ quiz }) {
  const dateString = "2023-05-31T18:30:00.000Z";

  const quizname = quiz.quizname;
  const date = new Date(quiz.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  const token = localStorage.getItem("adminDataToken");

  const [hours, minutes] = quiz.date.split(":");

  const [startQuizToggle, setStartQuizToggle] = useState(true);

  const startQuiz = async () => {
    const data = await fetch(`http://localhost:8008/startquiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
        Accept: "application/json",
      },
      body: { quizname },
    });

    const res = await data.json();
  };
  const datetime = new Date(quiz.date);
  datetime.setHours(hours);
  datetime.setMinutes(minutes);
  useEffect(() => {
    const currentDatetime = new Date();

    if (
      datetime.getTime() === currentDatetime.getTime() &&
      startQuizToggle === true
    ) {
      startQuiz();
      setStartQuizToggle(false);
    } else {
      console.log("Not Mactched");
    }
  });

  return (
    <Card style={{margin:"4px 0px"}}>
        <Card.Header as="h5"> {quiz.quizname} </Card.Header>
        <Card.Body>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"100%"}}> 
            <div style={{display:"flex", flexDirection:"column"}}>
            <Card.Text>
            Subject 1: {quiz.choice1}
            </Card.Text>
            <Card.Text>
            Subject 2: {quiz.choice2}
            </Card.Text>
            <Card.Text>
            Subject 3: {quiz.choice3}
            </Card.Text>
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
            <Card.Text>
            Prize: $ {quiz.prize}
            </Card.Text>
            <Card.Text>
            Date: {formattedDate}
            </Card.Text>
            <Card.Text>
            Time:{quiz.time}
            </Card.Text>
            </div>
          {/* <Button onClick={handleRegisterQuiz} variant="primary" style={{height:"50px"}}> Register </Button> */}
          </div>
        </Card.Body>
      </Card>
  );
}

export default Quizes;
