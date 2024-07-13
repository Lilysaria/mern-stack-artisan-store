import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
import { getToken, getUserIdFromToken } from '../../utils/auth';

export default function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    }

    getProduct();
  }, [productId]);

  const addToCart = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const productExists = storedCart.find((item) => item.productId === productId);

      if (productExists) {
        productExists.quantity += 1;
      } else {
        storedCart.push({ productId, name: product.name, price: product.price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(storedCart));
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding product to cart:', err);
      alert('Failed to add product to cart.');
    }
  };

  const addToFavorites = async () => {
    try {
      const token = getToken();
      const userId = getUserIdFromToken();

      if (!userId) {
        alert('User ID is missing. Please log in again.');
        return;
      }

      console.log('Adding to favorites:', productId, userId, token);

      const response = await axios.post(
        `/api/users/${userId}/favorites`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Add to favorites response:', response);

      if (response.status === 200) {
        alert('Product added to favorites!');
      } else {
        alert('Failed to add product to favorites.');
      }
    } catch (err) {
      console.error('Error adding to favorites:', err);
    }
  };

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          {product && (
            <>
              <h2>{product.name}</h2>
              <Image src={product.imageUrl} alt={product.name} />
              <p>Description: <br />{product.description}</p>
              <p>Price: ${product.price}</p>
              <Button onClick={addToCart} color='green'>Add to Cart</Button>
              <Button onClick={addToFavorites} color='blue'>Add to Favorites</Button>
            </>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
