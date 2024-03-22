
import ProductCard from '../../components/ProductCard/ProductCard'
import { Card } from 'semantic-ui-react'

export default function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
