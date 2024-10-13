import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUserIdFromToken } from '../utils/auth';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = getToken(); // retrieve the token
      const userId = getUserIdFromToken(); // get the user ID from the token

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
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        favorites.map((item) => <div key={item._id}>{item.name}</div>)
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
