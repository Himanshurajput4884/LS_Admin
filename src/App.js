import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import AdminDash from "./components/AdminDash";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dash" element={<AdminDash />} />
      <Route path="/create" element={<AdminDash />} />
    </Routes>
  );
}

export default App;
