import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ProductList from '../components/ProductList/ProductList';

const Products = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <ProductList products={products} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Products;
