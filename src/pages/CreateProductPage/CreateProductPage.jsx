import { useState } from 'react';
import React from "react";
import AddProductForm from "../../components/AddProductForm/AddProductForm"
import tokenService from '../../utils/tokenService';
import userService from '../../utils/userService';


export default function CreateProductPage() {
    const[products, setProducts] = useState([]);


async function handleAddProduct(productInfo) {
    console.log(productInfo, " formData from addPost form")

	try {
		// Since we are sending a photo
		// we are sending a multipart/formdData request to express
		// so express needs to have multer setup on this endpoint!
		const response = await fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify(productInfo), // < No jsonify because we are sending a photo
			headers: {
                'Content-Type': 'application/json',
					// convention for sending jwts, tokenService is imported above
					Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
					//and and it to our api request
					// so the server knows who the request is coming from when the client is trying to make a POST
				}
		})

		const data = await response.json();
		//       res.status(201).json({ post }); this value is from express/posts/create controller
		console.log(data, ' response from post request! This from express')
		setProducts([data.products, ...products])
	} catch(err){
		console.log(err.message)
		console.log('CHECK YOUR SERVER TERMINAL!!!!')
	}

  }


return (
    <div>
<h2>Create a new produc</h2>
<AddProductForm handleAddProduct={handleAddProduct} />
    </div>
)
}