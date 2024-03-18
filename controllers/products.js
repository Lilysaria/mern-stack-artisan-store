const Product = require('../models/product');

module.exports = {
  createProduct,
  listProducts,
  viewProduct,
  updateProduct
};

async function createProduct(req, res) {
    try {
      const createdProduct = await Product.create(req.body);
      console.log(createdProduct, " <- createdProduct"); // Debugging purpose
      res.status(201).json(createdProduct)
    } catch (error) {
      console.error('Error creating product:', error); 
     
      res.status(500).json(error.message); 
    }
  }

  async function listProducts(req, res) {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json(error);
    }
  }

  // view single product | CRUD: Read (ingle Item)
async function viewProduct(req, res) {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json('Product not found');
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json(error);
    }
  }

  async function updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true });
  
      if (!updatedProduct) {
        return res.status(404).json('Product not found');
      }
  
    
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json(error);
    }
  }