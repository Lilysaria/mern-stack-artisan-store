import ProductsPage from '../../pages/ProductsPage/ProductsPage';
import ProductCard from '../../components/ProductCard/ProductCard'
import { Card } from 'semantic-ui-react'

export default function ProductList({products}) {

    return (
      <Card.Group>
        {products.map(product => (
            <ProductCard key={product._id} product={product} />
        )
            )}


      </Card.Group>
    );
    
}

