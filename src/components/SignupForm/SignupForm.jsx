import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../../utils/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', {
        ...formData,
        action: 'signup'
      });
      saveToken(response.data.token);
      router.push('/dashboard'); // redirect to dashboard after successful signup
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles['signup-container']}>
      <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2>Sign Up</h2>
        <div className={styles['form-group']}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles['signup-button']}>
          Sign Up
        </button>
        {error && <p className={styles['error-message']}>{error}</p>}
        <p className={styles['signup-link']}>
          Already have an account? <Link href="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
