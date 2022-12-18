const express = require("express");
const router = express.Router();
require("../db/connection");
const {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");

router.post("/category", addCategory);
router.get("/category", getCategory);
router.post("/getCategory", getCategory);

router.delete("/category", deleteCategory);
router.patch("/category", updateCategory);
module.exports = router;
