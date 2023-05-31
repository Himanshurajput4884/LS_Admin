import React, { useState, useEffect } from "react";

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
    <div
      className="main"
      style={{
        border: "2px solid black",
        padding: "10px 10px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div>
        <p>Quiz Name: {quiz.quizname}</p>
        <p>Subject1: {quiz.choice1}</p>
        <p>Subject2: {quiz.choice2}</p>
        <p>Subject3: {quiz.choice3}</p>
        <p>Prize: {quiz.prize}</p>
        <p>Date: {formattedDate}</p>
        <p>Time:{quiz.time}</p>
      </div>
      <div>
        <button> Start Quiz </button>
      </div>
    </div>
  );
}

export default Quizes;
