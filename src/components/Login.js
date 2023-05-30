import React, { useState } from 'react'
import { NavLink ,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

    const [inpval, setInpval] = useState({
        username: "",
        password: "",
    });

    const history = useNavigate();

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };


    const loginuser = async(e) => {
        e.preventDefault();

        const { username, password } = inpval;

        if(!username || !password){
          toast.error("All fields are required.", {
            position:"top-center"
          })
        }
        else{
          try{
            const response = await fetch("http://localhost:8009/admin", {
              method:"POST",
              headers:{
                "Content-Type":"application/json",
              },
              body:JSON.stringify({
                username, password
              })
            });

            const data = await response.json();

            console.log(data);
            localStorage.setItem("adminDataToken", data.token);
            history("/dash");
            setInpval({...inpval, username:"", password:""});
          }
          catch(err){
            console.log("Error: ", err);
          }

                    
        }
                
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Admin</h1>
                        
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="username">Username</label>
                            <input type="text" value={inpval.username} onChange={setVal} name="username" placeholder='Enter Your Username' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            
                                <input type="password" onChange={setVal} value={inpval.password} name="password" placeholder='Enter Your password' />
                            
                        </div>

                        <button className='btn' onClick={loginuser}>Login</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Login