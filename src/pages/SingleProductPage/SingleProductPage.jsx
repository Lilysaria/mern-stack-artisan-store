import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList"
import ProductCard from "../../components/ProductCard/ProductCard";
import AddProductButton from "../../components/AddProductButton/AddProductButton"
import AddProductForm from "../../components/AddProductForm/AddProductForm"
import { Image, Grid } from "semantic-ui-react";
import tokenService from '../../utils/tokenService';
// this page is very similiar to ProductsPage.jsx
export default function SingleProductPage() {




    const { productId } = useParams();
    const [product, setProduct] = useState([]);



    // C(R)UD
  async function getProduct() {
    
    try {

		// This is going to express to get the posts
		// so this is the start of loading

      const response = await fetch(`/api/products/${productId}`, {
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
      
      setProduct(data);
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
    getProduct();
  }, []);
    return (

        <Grid>
        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column style={{ maxWidth: 750 }}>
            {product && (
              <>
                <h2>{product.name}</h2>
                <Image src={product.imageUrl} alt={product.name} />
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }