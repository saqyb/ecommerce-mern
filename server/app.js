const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
require("./db/connection");
app.use(express.json());
app.use(require("./routes/product"));
app.use(require("./routes/category"));
app.use(require("./routes/order"));
app.use(require("./routes/user"));

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Server is @ Home");
});

app.get("/about", (req, res) => {
  res.send("Server is at About");
});

app.listen(PORT, () => {
  console.log("Server is running @ " + PORT);
});
