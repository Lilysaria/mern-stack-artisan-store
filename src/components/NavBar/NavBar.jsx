import React from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';

const NavBar = ({ user, onLogout }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarItems}>
        <Link href="/" className={styles.active}>
          Home
        </Link>
        <Link href="/products">Products</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/favorites">Favorites</Link>
        <Link href="/cart">Cart</Link>
        {user ? (
          <button onClick={onLogout} className={styles.logoutButton}>
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
