import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../../utils/auth';
import Link from 'next/link';
import styles from './LoginForm.module.css';

const LoginForm = ({ handleSignUpOrLogin }) => {
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
      const response = await axios.post('/api/users', { ...formData, action: 'login' });
      console.log('Login successful:', response.data);
      saveToken(response.data.token);
      handleSignUpOrLogin();
    } catch (error) {
      console.error('Login Error:', error.response?.data || error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
        <p className={styles.signupLink}>
          Don&apos;t have an account? <Link href="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
