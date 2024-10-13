import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import userService from '../utils/userService';
import '../../globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = userService.getUser();
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  return (
    <div className="app-container">
      <NavBar user={user} onLogout={handleLogout} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
