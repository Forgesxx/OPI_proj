import React, { useState } from 'react';
import { useAuth } from './AuthComponent';
import { useNavigate } from 'react-router-dom';
import './authPage.css'

const AuthComponent = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Login clicked');
      login();
      setEmail('');
      setPassword('');
      console.log('Navigating to /');
      navigate('/OPI_proj/mainScreenMovies');
    };
  
    return (
        <div className="auth-container">
          <h2 className="auth-heading">Авторизація</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label">
              Email:
              <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label className="auth-label">
              Пароль:
              <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button className="auth-button" type="submit">Увійти</button>
          </form>
        </div>
      );
    };
  
  export default AuthComponent;
  