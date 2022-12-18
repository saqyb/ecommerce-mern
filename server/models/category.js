const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: false },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
