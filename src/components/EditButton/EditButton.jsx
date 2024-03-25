import { Link } from 'react-router-dom'
import './EditButton.css';

export default function EditButton({ productId}) {
    return (
        <div className="button-container">
            <Link to={`/editpage/${productId}`} className="edit-product-link">Edit Product</Link>
        </div>
    );
}