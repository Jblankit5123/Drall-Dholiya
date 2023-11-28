import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Updated")
      return;
    }
    const isAuthenticated = true;

    if (isAuthenticated) {
      onLogin();
      navigate("/uncontrolled-board");
    } else {
      console.error("Authentication failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
