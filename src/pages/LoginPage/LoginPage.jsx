import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../../utils/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);
      saveToken(response.data.token);
    } catch (error) {
      console.error('Login Error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={handleChange} />
      <input type="password" name="password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
