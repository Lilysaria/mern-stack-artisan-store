import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import tokenService from '../../utils/tokenService';
import EditProductForm from '../../components/EditProductForm/EditProductForm';

export default function EditPage() {

    const[product, setProduct] = useState();
    const { productId } = useParams(); // needed for editing. to get productId
//productId comes from URL of page. the Id is specified in <routes tag in parent component
    
  useEffect(() => {
    getProductInfo();
  }, []);



    async function getProductInfo() {
    try {
      
        const response = await fetch(`/api/products/${productId}`, {
          method: "GET",
          headers: {
            // convention for sending jwts, tokenService is imported above
            Authorization: "Bearer " + tokenService.getToken(), // < this is how we get the token from localstorage
            //and and it to our api request
            // so the server knows who the request is coming from when the client is trying to make a POST
          },
        });
        //.ok property comes from fetch, and it checks the status code, since profile not found
        // is a 404 the code throws to the fetch block
        if (!response.ok)
          throw new Error("Whatever you put in here goes to the catch block");
        // this is recieving and parsing the json from express
        const data = await response.json();
        console.log(data);
        setProduct(data.product);
    
      } catch (err) {
        console.log(err.message);
      }
    }


    //gets called when press"add product" and handles the updated details
    async function handleEditProduct(productInfo) {
        console.log(productInfo, " formData from addPost form")
    
        try {
            // Since we are sending a photo
            // we are sending a multipart/formdData request to express
            // so express needs to have multer setup on this endpoint!
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                body: JSON.stringify(productInfo), // < No jsonify because we are sending a photo
                headers: {
                    'Content-Type': 'application/json',
                        // convention for sending jwts, tokenService is imported above
                        Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
                        //and and it to our api request
                        // so the server knows who the request is coming from when the client is trying to make a POST
                    }
            })
    
            if (!response.ok)
            throw new Error("Whatever you put in here goes to the catch block");
          // this is recieving and parsing the json from express
          const data = await response.json();
          console.log(data);
          setProduct(data.product);
      
        } catch (err) {
          console.log(err.message);
        }
      }
    
    
    return (
        <div>
    <h2>Edit a produc</h2>
    {product && <EditProductForm product={product} handleEditProduct={handleEditProduct} />}

        </div>
    )
    }
