const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  productsId: [
    {
      id: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  cost: { type: Number, required: true },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
