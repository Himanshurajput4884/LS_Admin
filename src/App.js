import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import AdminDash from "./components/AdminDash";
import CreateQuiz from "./components/CreateQuiz";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dash" element={<AdminDash />} />
      <Route path="/create" element={<CreateQuiz />} />
    </Routes>
  );
}

export default App;
