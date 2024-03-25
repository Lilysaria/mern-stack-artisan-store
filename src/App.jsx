import { Route, Routes } from "react-router-dom";
import { useState } from 'react'
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import SignUpPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import EditPage from "./pages/EditPage/EditPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
// ANY component that is rendered by a route, should be stored in the 
// pages folder. Every page is like an app component
import userService from "./utils/userService";

function App() {
  // the userService.getUser() when the page loads it goes into localstorage and looks for a jwt
  // token, decodes and sets it in state
  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin(){
    // we call this function after userService.login(), or userService.signup()
    // in order to get the token sent back from express and store the decoded token in the state
    setUser(userService.getUser())
  }
  return (
    <>
    <NavBar />

    <Routes>
    <Route path="/" element={<h1>Home Page</h1>} />
    <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
    <Route path='/signup' element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
    <Route path="/homepage" element = {<HomePage />} />
    <Route path="/productspage" element = {<ProductsPage />} />
    <Route path="/product/:productId" element = {<SingleProductPage />} />
    <Route path="/createpage" element = {<CreateProductPage />} />
    <Route path="/editpage/:productId" element={<EditPage />} />
    <Route path="/product/:productId/edit" element = {<EditPage />} />
  </Routes>
  </>
  );
}

export default App;
