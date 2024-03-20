import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList"
import AddProductButton from "../../components/AddProductButton/AddProductButton"
import AddProductForm from "../../components/AddProductForm/AddProductForm"
import { Grid } from "semantic-ui-react";
import tokenService from '../../utils/tokenService';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);



    // C(R)UD
  async function getProducts() {
    try {

		// This is going to express to get the posts
		// so this is the start of loading

      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await response.json();
      // AFTER THIS WE HAVE THE DATA BACK FROM SERVER
      // CHECK THE DATA then update state!
      console.log(data);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  }


   function handleButtonClick() {
    setProducts()
   }


   
  useEffect(() => {
    // This useEffect is called when the page loads

    // Don't forget to call the function
    getProducts();
  }, []);
    return (

    <Grid>
      <Grid.Row>
        <Grid.Column>
        
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <ProductList products={products} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
}
