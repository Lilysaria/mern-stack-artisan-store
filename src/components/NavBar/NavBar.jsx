import React, { useState } from 'react';
import { Menu, Container, Button, Dropdown, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import styles from './NavBar.module.css';

const NavBar = ({ user, onLogout }) => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu inverted fixed="top" className={styles.menu}>
      <Container>
        <Menu.Item
          as={Link}
          href="/"
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          header
        >
          ForestFinds
        </Menu.Item>
        <Menu.Item
          as={Link}
          href="/products"
          name='products'
          active={activeItem === 'products'}
          onClick={handleItemClick}
        >
          <Icon name="box" /> Products
        </Menu.Item>
        <Menu.Item
          as={Link}
          href="/about"
          name='about'
          active={activeItem === 'about'}
          onClick={handleItemClick}
        >
          <Icon name="info circle" /> About
        </Menu.Item>
        <Menu.Item
          as={Link}
          href="/contact"
          name='contact'
          active={activeItem === 'contact'}
          onClick={handleItemClick}
        >
          <Icon name="phone" /> Contact
        </Menu.Item>
        <Menu.Item
          as={Link}
          href="/favorites"
          name='favorites'
          active={activeItem === 'favorites'}
          onClick={handleItemClick}
        >
          <Icon name="heart" /> Favorites
        </Menu.Item>
        <Menu.Item
          as={Link}
          href="/cart"
          name='cart'
          active={activeItem === 'cart'}
          onClick={handleItemClick}
        >
          <Icon name="shopping cart" /> Cart
        </Menu.Item>

        <Menu.Menu position="right">
          {user ? (
            <Dropdown item text='Account'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item as={Link} href="/login">
              <Button inverted>Login</Button>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default NavBar;
