const express = require("express");
const router = express.Router();
require("../db/connection");
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  upload,
  searchProduct,
} = require("../controllers/product");

router.post("/product", upload.single("image"), addProduct);
router.get("/product", getProducts);
router.delete("/product", deleteProduct);
router.patch("/product", updateProduct);
router.post("/search", searchProduct);
router.post("/productCategory", searchProduct);
router.post("/store", searchProduct);
module.exports = router;
