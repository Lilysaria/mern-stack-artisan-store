import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = getToken();
        const response = await axios.get('/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error('Fetch Favorites Error', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favorites.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
