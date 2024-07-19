const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // references userSchema
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
