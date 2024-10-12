import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Image, Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
import { getToken, getUserIdFromToken } from '../../utils/auth';

// define the main component
export default function SingleProductPage() {
  // Use next.js router to get the productId from the URL
  const router = useRouter();
  const { productId } = router.query;

  // state to store the product data
  const [product, setProduct] = useState(null);

  // useeffect hook to fetch product data when the component mounts or productId changes
  useEffect(() => {
    if (productId) {
      async function getProduct() {
        try {
          // Fetch product data from the API
          const response = await axios.get(`/api/products`, { params: { productId } });
          // Update the product state with the fetched data
          setProduct(response.data);
        } catch (err) {
          console.error('Error fetching product:', err);
        }
      }
      getProduct();
    }
  }, [productId]);

  // function to add the product to the cart
  const addToCart = () => {
    try {
      // get the current cart from localStorage or initialize an empty array
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      // check if the product already exists in the cart
      const productExists = storedCart.find(
        (item) => item.productId === productId
      );

      if (productExists) {
        // If the product exists, increase its quantity
        productExists.quantity += 1;
      } else {
        // If it doesn't exist, add it to the cart
        storedCart.push({
          productId,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });
      }

      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(storedCart));
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding product to cart:', err);
      alert('Failed to add product to cart.');
    }
  };

  // function to add the product to favorites
  const addToFavorites = async () => {
    try {
      // fet the user's token and ID
      const token = getToken();
      const userId = getUserIdFromToken();

      // Check if the user is logged in
      if (!token || !userId) {
        alert('Please log in to add favorites.');
        return;
      }

      // send a request to add the product to favorites
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

      // check the response and show appropriate message
      if (response.status === 200) {
        alert('Product added to favorites!');
      } else {
        alert('Failed to add product to favorites.');
      }
    } catch (err) {
      console.error('Error adding to favorites:', err);
      alert('Failed to add product to favorites. Please try again.');
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
              <p>
                Description: <br />
                {product.description}
              </p>
              <p>Price: ${product.price}</p>
              <Button onClick={addToCart} color="green">
                Add to Cart
              </Button>
              <Button onClick={addToFavorites} color="blue">
                Add to Favorites
              </Button>
            </>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
