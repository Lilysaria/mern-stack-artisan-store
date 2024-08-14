import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = ({ handleSignUpOrLogin }) => {
  return <LoginForm handleSignUpOrLogin={handleSignUpOrLogin} />;
};

export default LoginPage;
