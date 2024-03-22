import { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

export default function EditProductForm({product, handleEditProduct}) {
const [state, setState] = useState(product);

function handleChange(e){
    setState({
        ...state, 
        [e.target.name]: e.target.value
    })
}

function handleSubmit(e){
    e.preventDefault()
 

   
    handleEditProduct(state)
}

return (
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
        value={state.description}
        placeholder="product descriptione"
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
        placeholder="pricec"
        onChange={handleChange}
      />
      <Button type="submit" className="btn">
        ADD PUPPY
      </Button>
    </Form>
  </Segment>

);
}