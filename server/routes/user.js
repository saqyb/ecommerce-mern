const express = require("express");
const router = express.Router();
require("../db/connection");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const authenticate = require("../middlewares/authenticate");
const {
  addUser,
  getUser,
  deleteUser,
  updateUser,
  getVendor,
  uploadDP,
} = require("../controllers/user");

router.post("/user", addUser);
router.post("/login", getUser);
router.delete("/user", deleteUser);
router.patch("/user", uploadDP.single("dp"), updateUser);
router.post("/vendor", getVendor);

router.get("/authenticate", authenticate, (req, res) => {
  // console.log("About page from Auth");
  res.send(req.rootUser);
});

router.get("/logout", (req, res) => {
  console.log("User Logged out");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logged out");
});

module.exports = router;
