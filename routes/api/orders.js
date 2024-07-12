const express = require('express');
const router = express.Router();
const orders = require('../../controllers/orders');

router.post('/cart', orders.addToCart);

router.get('/cart', orders.viewCart);

router.put('/cart', orders.updateCart);

router.delete('/cart/:productId', orders.removeItemFromCart);

module.exports = router;
