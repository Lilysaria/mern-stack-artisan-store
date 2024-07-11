const Product = require('../models/product');

async function listProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function viewProduct(req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json('Product not found');
    }
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  listProducts,
  viewProduct,
};
