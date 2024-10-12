import ProductCard from '../../components/ProductCard/ProductCard';
import { Card } from 'semantic-ui-react';
import styles from './ProductList.module.css';

export default function ProductList({ products }) {
  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <div className={styles.productCard} key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
