const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  categoryId: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: false },
  quantity: { type: Number, required: false },
  sold: { type: Number, default: 0, required: true },
  image: { type: String, required: false },
  order: [
    {
      userId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
