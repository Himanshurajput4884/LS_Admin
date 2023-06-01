import React, { useState, useEffect } from "react";
import Quizes from "./Quizes/Quizes";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function AdminDash() {
  const [currQuiz, setCurrQuiz] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllQuiz = async () => {
      const data = await fetch(`http://localhost:8008/allquizes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await data.json();
      if (res.message === "Success") {
        console.log(res.quizes);
        setCurrQuiz(res.quizes);
      } else {
        console.log("Quiz not fetched");
      }
    };
    getAllQuiz();
  }, []);

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    navigate("/create");
  };

  return (
    <section>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"10px 10px"}}>
        <h1>All Quizes</h1>
      </div>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Card style={{width: '80%', padding:"20px 60px"}}>
        <h5> Upcoming Quizes </h5>
        {currQuiz.length ? (
          <div>
            {currQuiz.map((v) => {
              return <Quizes quiz={v} />;
            })}
          </div>
        ) : (
          <div>There are no quiz pending.</div>
        )}
      </Card>
      </div>
      <div
        style={{
          width: "100%",
          display:"flex",
          "justify-content": "center",
          "align-items": "center",
          padding: "10px 10px",
        }}
      >
        <Button style={{ alignItems: "center" }} onClick={handleCreateQuiz}>
          {" "}
          Create Quiz{" "}
        </Button>
      </div>
    </section>
  );
}

export default AdminDash;
