
import { Link } from 'react-router-dom'
import './AddProductButton.css'

export default function AddProductButton({addProduct}) {
    return (

      <div className="button-container">
      <Link to="/createpage"  className="add-product-link" >Add product</Link>
      </div>
    );
    
}