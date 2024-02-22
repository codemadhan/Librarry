import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login', formData);
      console.log('User object:', response.data);
      // You can handle the user object here, such as storing it in state or localStorage
      //const user = response.data;
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>LOGIN PAGE</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>EMAIL:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>PASSWORD:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      <p>Don't have an account?<Link to='/signup'>signup here !</Link></p>

    </div>
  );
}

export default LoginPage;

