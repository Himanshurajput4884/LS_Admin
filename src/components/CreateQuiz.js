import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function CreateQuiz() {
  const navigate = useNavigate();
  const [formData, setData] = useState({
    quizname: "",
    choice1: "",
    choice2: "",
    choice3: "",
    prize: "",
    date: "",
    time: "",
  });

  const setVal = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };
  const setDate = (date) =>{
    setData({...formData, date:date})
  }
  const setTime = (time) =>{
    setData({...formData, time:time})
  }

  console.log(formData);

  let token = localStorage.getItem("adminDataToken");

  const handleCreateNewQuiz = async (e) => {
    e.preventDefault();
    const { quizname, choice1, choice2, choice3, prize, date, time } = formData;

    try {
      if (!quizname || !choice1 || !choice2 || !choice3 || !prize) {
        toast.error("All fields are required", {
          position: "top-center",
        });
      } else {
        const data = await fetch("http://localhost:8008/newquiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": token,
            Accept: "application/json",
          },
          body: JSON.stringify({ quizname, choice1, choice2, choice3, prize, date, time }),
        });

        const res = await data.json();

        if(res.message === "Quiz created."){
          toast.success("Quiz Created", {
            position: "top-right",
          });
  
          setTimeout(() => {
            navigate("/dash");
          }, 3000);
        }

      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Hello Admin, Create Quiz</h1>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="name">
              <h5>Quiz Name</h5>
            </label>
            <input
              type="text"
              value={formData.quizname}
              onChange={setVal}
              name="quizname"
              placeholder="Enter Quizname"
            />
          </div>
          <div className="form_input" style={{display: "flex",
    "flex-direction": "column"}}>
            <label htmlFor="Subject 1"><h5> Subject 1 </h5></label>
            <select
              id="subject1"
              name="choice1"
              value={formData.choice1}
              onChange={setVal}
              style={{    border: "1px solid #d4d0d0",
              "border-radius": "10px",
              padding: "2px 2px"}}
            >
              <option value=""> Choose </option>
              <option value="animals">Animals</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
              <option value="country_dish">Countries Dishes</option>
              <option value="european_cities">European Cities</option>
              <option value="football">Football</option>
              <option value="capital_guess">Guess Capitals</option>
              <option value="hitler">Hitler</option>
              <option value="space">Space</option>
              <option value="world_war1">World War 1</option>
            </select>
          </div>
          <div className="form_input" style={{display: "flex",
    "flex-direction": "column"}}>
            <label htmlFor="Subject 2"><h5> Subject 2 </h5></label>
            <select
              id="subject2"
              name="choice2"
              value={formData.choice2}
              onChange={setVal}
              style={{    border: "1px solid #d4d0d0",
              "border-radius": "10px",
              padding: "2px 2px"}}
            >
              <option value=""> Choose </option>
              <option value="animals">Animals</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
              <option value="country_dish">Countries Dishes</option>
              <option value="european_cities">European Cities</option>
              <option value="football">Football</option>
              <option value="capital_guess">Guess Capitals</option>
              <option value="hitler">Hitler</option>
              <option value="space">Space</option>
              <option value="world_war1">World War 1</option>
            </select>
          </div>
          <div className="form_input" style={{display: "flex",
    "flex-direction": "column"}}>
            <label htmlFor="Subject 3"><h5> Subject 3 </h5></label>
            <select
              id="subject3"
              name="choice3"
              value={formData.choice3}
              onChange={setVal}
              style={{    border: "1px solid #d4d0d0",
                "border-radius": "10px",
                padding: "2px 2px"}}
            >
              <option value=""> Choose </option>
              <option value="animals">Animals</option>
              <option value="badminton">Badminton</option>
              <option value="chess">Chess</option>
              <option value="country_dish">Countries Dishes</option>
              <option value="european_cities">European Cities</option>
              <option value="football">Football</option>
              <option value="capital_guess">Guess Capitals</option>
              <option value="hitler">Hitler</option>
              <option value="space">Space</option>
              <option value="world_war1">World War 1</option>
            </select>
          </div>
          <div className="form_input">
            <label htmlFor="Prize Money">
              <h5> Prize </h5>
            </label>
            <input
              type="number"
              name="prize"
              value={formData.prize}
              onChange={setVal}
            />
          </div>
          <div>
            <label htmlFor="date"><h5> Date </h5></label>
            <DatePicker
              selected={formData.date}
              onChange={setDate}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select date"
              style={{    border: "1px solid grey",
                "border-radius": "5px",
                padding: "4px 4px",
                width: "100%"}}
            />
          </div>
          <div style={{display: "flex",
    "flex-direction": "row",
    "justify-content": "space-between",
    width: "30%", margin:"8px 0px"}}>
            <label htmlFor="time"><h5> Time </h5></label>
            <TimePicker
              value={formData.time}
              onChange={setTime}
              disableClock
              clearIcon={null}
              format="HH:mm"
              placeholder="Select time"
            />
          </div>
          <button className="btn" onClick={handleCreateNewQuiz}>
            Create
          </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
}

export default CreateQuiz;
