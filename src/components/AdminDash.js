import React, {useState, useEffect} from 'react'
import Quizes from './Quizes/Quizes';
import { useNavigate } from 'react-router-dom';


function AdminDash() {
    const [currQuiz, setCurrQuiz]  = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const getAllQuiz = async()=>{
            const data = await fetch(`http://localhost:8008/allquizes`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                },
            });

            const res = await data.json();
            if(res.message === "Success"){
                console.log(res.quizes);
                setCurrQuiz(res.quizes);
            }
            else{
                console.log("Quiz not fetched");
            }
        }
        getAllQuiz();
    },[])


    const handleCreateQuiz = (e) =>{
        e.preventDefault();
        navigate("/create")
    }

  return (
    <section>
        <div>
            <h1>All Quizes</h1>
            <h5> Pending Quizes </h5>
        </div>
        <div>
            {
                currQuiz.length ? 
                <div>
                    {
                        currQuiz.map((v) => {
                            return (
                                <Quizes quiz = {v}/>
                            )
                        })
                    }
                </div>
                :
                <div>
                    There are no quiz pending.
                </div>    
            }
        </div>
        <div>
            <h5> Create New Quiz </h5>
            <button onClick={handleCreateQuiz}> Create Quiz </button>
        </div>
    </section>
  )
}

export default AdminDash
