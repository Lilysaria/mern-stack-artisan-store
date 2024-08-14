import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ user, onLogout }) => {
  return (
    <nav className="nav">
      <div className="nav-items">
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
