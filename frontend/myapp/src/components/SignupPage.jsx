import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';
import './SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
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
      console.log(formData);
      // Make sure to update the URL to the correct HTTPS endpoint
      const response = await axios.post('http://localhost:8000/user/signup', formData, {
            
      });
      console.log('User registered successfully:', response.data);
      alert("User Added successfully");
      // Optionally, you can redirect the user to the login page after successful registration
      navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure, display error message, etc.
    }
  };

  return (
    <div class="signup-container">
  <h1>Signup Page</h1>
  <form onSubmit={handleSubmit}>
    <div>
      <label>Name:</label>
      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        required 
      />
    </div>
    <div>
      <label>Email:</label>
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />
    </div>
    <div>
      <label>Phone Number:</label>
      <input 
        type="text" 
        name="phoneNumber" 
        value={formData.phoneNumber} 
        onChange={handleChange} 
        required 
      />
    </div>
    <div>
      <label>Password:</label>
      <input 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        required 
      />
    </div>
    <button type="submit">Signup</button>
  </form>
  <p>Already have an account?<Link to='/'> LOGIN!</Link></p>
</div>

  );
}

export default SignupPage;
