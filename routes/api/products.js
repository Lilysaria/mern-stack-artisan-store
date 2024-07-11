const express = require('express');
const router = express.Router();
const products = require('../../controllers/products');

router.get('/', products.listProducts);

router.get('/:productId', products.viewProduct);

module.exports = router;
