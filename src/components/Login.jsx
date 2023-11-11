import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/authActions';

const Login = ({ onLogin }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
        email,
        password,
      });
      console.log(process.env.REACT_APP_SERVER_URL);
      toast.success('Login successful');

      console.log(response.data);
      navigate('/');
      const token = response.data.token;
      const username = response.data.user.name;
      const userEmail = response.data.user.email;

      dispatch(loginSuccess(token, username, userEmail));

      localStorage.setItem('token', token);

      setEmail('');
      setPassword('');

      if (onLogin) {
        onLogin();
      }
    } catch (error) {
      console.log(error.response);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn lg" type="submit">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
