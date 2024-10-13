import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar/NavBar';
import userService from '../utils/userService';
import '../../globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = userService.getUser();
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  function handleSignUpOrLogin() {
    const loggedInUser = userService.getUser();
    if (loggedInUser) setUser(loggedInUser);
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
    router.push('/');
  }

  return (
    <div className="app-container">
      <NavBar user={user} onLogout={handleLogout} />
      <Component {...pageProps} user={user} handleSignUpOrLogin={handleSignUpOrLogin} />
    </div>
  );
}

export default MyApp;
