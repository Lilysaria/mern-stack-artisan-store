import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { getToken, getUserIdFromToken } from '../utils/auth';
import styles from '../styles/Favorites.module.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = getToken();
      const userId = getUserIdFromToken();

      if (!token || !userId) {
        console.error('No token or user ID found, user might not be logged in.');
        return;
      }

      try {
        const response = await axios.get(`/api/users/${userId}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Fetch Favorites Error:', error.response?.data || error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Favorites</h1>
      {favorites.length > 0 ? (
        <div className={styles.favoritesList}>
          {favorites.map((item) => (
            <Link href={`/product/${item._id}`} key={item._id} className={styles.favoriteItem}>
              {item.imageUrl && (
                <Image 
                  src={item.imageUrl} 
                  alt={item.name} 
                  width={200} 
                  height={200} 
                  className={styles.productImage}
                />
              )}
              <div className={styles.productName}>{item.name}</div>
              <div className={styles.productPrice}>${item.price}</div>
            </Link>
          ))}
        </div>
      ) : (
        <p className={styles.message}>You haven't added any favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
