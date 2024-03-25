
import ProductCard from '../../components/ProductCard/ProductCard'
import { Card } from 'semantic-ui-react'
import './ProductList.css';

export default function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
          <div className="product-card" key={product._id}>
          <ProductCard product={product} />
          </div>
      ))}
    </div>
  );
}
