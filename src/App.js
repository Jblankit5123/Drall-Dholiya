import './App.css';
import React, { useState } from "react";
import BoardContainer from './Component/BoardColumn';
import LoginForm from "./Component/LoginForm";
import "@lourenci/react-kanban/dist/styles.css";
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="App">
      <h4 style={{ textAlign: 'center' }}>React Trello</h4>

      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <button onClick={handleLogout} className='button-logout '>
            Logout
          </button>
          <BoardContainer type="uncontrolled" />
        </>
      )}
    </div>
  );
}

export default App;
