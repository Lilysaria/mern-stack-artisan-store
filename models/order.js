import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
  }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // rferences userSchema for the user placing the order
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['cart', 'placed'], // should check if order is placed and show to admin
    //later when i make admin dashboard should be using the 'placed' for view
    default: 'cart',
  }
}, { timestamps: true });

// check if model is already defined
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
