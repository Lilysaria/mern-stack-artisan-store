const express = require('express');
const router = express.Router();
const products = require('../../controllers/products');


// route for creating a new product
router.post('/', products.createProduct);

// route for listing all products
router.get('/', products.listProducts);
router.post('/', products.createProduct);
router.get('/:productId', products.viewProduct);

router.put('/:productId', products.updateProduct);

module.exports = router;