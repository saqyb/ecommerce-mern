const express = require("express");
const router = express.Router();
require("../db/connection");
const {
  addOrder,
  getOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/order");

router.post("/order", addOrder);
router.post("/getOrder", getOrder);
router.delete("/order", deleteOrder);
router.patch("/order", updateOrder);
module.exports = router;
