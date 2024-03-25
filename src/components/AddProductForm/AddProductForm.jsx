import { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import './AddProductForm.css';

export default function AddProductForm({handleAddProduct}) {
const [state, setState] = useState({
   name: '',
   description:'',
   price: '',
   imageUrl:'' 
});

function handleChange(e){
    setState({
        ...state, 
        [e.target.name]: e.target.value
    })
}

function handleSubmit(e){
    e.preventDefault()
 

   
    handleAddProduct(state)
}

return (
  <div className="add-product-form-container">
    <Segment>
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Form.Input
        className="form-control"
        name="name"
        value={state.name}
        placeholder="product name"
        onChange={handleChange}
        required
      />
      <Form.Input
        className="form-control"
        type="description"
        name="description"
        placeholder="product description"
        onChange={handleChange}
      />
      <Form.Input
        className="form-control"
        type="photo"
        name="imageUrl"
        placeholder="image"
        onChange={handleChange}
      />
      <Form.Input
        className="form-control"
        type="number"
        name="price"
        placeholder="price"
        onChange={handleChange}
      />
      <Button type="submit" className="btn">
        add product
      </Button>
    </Form>
  </Segment>
</div>
);
}