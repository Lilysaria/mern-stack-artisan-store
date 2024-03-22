
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
   console.log(product);
  return (
        <div>
<h2>{product.name}</h2>
  <Link to={`/product/${product._id}`}>View Product</Link>
</div>
    );
}