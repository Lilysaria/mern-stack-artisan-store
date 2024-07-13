import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import SignUpPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import userService from './utils/userService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = userService.getUser();
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  function handleSignUpOrLogin() {
    const loggedInUser = userService.getUser();
    if (loggedInUser) setUser(loggedInUser);
  }

  return (
    <div className="app-container">
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<SingleProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
