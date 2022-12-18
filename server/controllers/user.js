const User = require("../models/user");
const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());

const multer = require("multer");
const fs = require("fs");
var imageName = null;
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/users");
  },
  filename: (req, file, callback) => {
    // imageName = Date.now() + file.originalname;
    const replaced = file.originalname.replaceAll(" ", "-");
    imageName = Date.now() + replaced;
    callback(null, imageName);
  },
});

exports.uploadDP = multer({ storage: storage });

exports.addUser = async (req, res) => {
  const { id, name, email, password, cpassword } = req.body;
  if (!id || !name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Please Send Complete User Data" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email Already Exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords Dont Match" });
    } else {
      const user = new User({ id, name, email, password, cpassword });
      const userRegistered = await user.save();
      if (userRegistered) {
        return res
          .status(401)
          .json({ message: "User Registered Successfully" });
      } else {
        return res.status(500).json({ error: "Failed to register User" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getUser = async (req, res) => {
  console.log(req.body);
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Plz send complete data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken", token, {
          expiresIn: 5000,
          httpOnly: true,
        });
        return res.status(201).json({ message: "logged in Successfully" });
      } else {
        return res.status(500).json({ error: "User Not Found" });
      }
    } else {
      return res.status(500).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getVendor = async (req, res) => {
  const { id } = req.body;
  try {
    if (id) {
      const vendor = await User.findOne({ id: id }, { id: 1, name: 1, dp: 1 });
      if (vendor) {
        res.json(vendor);
      } else {
        return res.status(500).json({ error: "Data Not Found" });
      }
    } else {
      return res.status(500).json({ error: "ID not found" });
    }
  } catch (err) {
    console.log(err);
  }
  // res.send(req.todos);
};

exports.deleteUser = async (req, res) => {};
exports.updateUser = async (req, res) => {
  const { id, name, email, dp, password, cpassword } = req.body;
  if (req.file) {
    var post = {
      id,
      name,
      email,
      dp: imageName,
    };
    const user = await User.findOne({ id: id });
    if (user.dp) {
      await fs.unlink("../client/public/users/" + user.dp, (err) => {
        //delete file from directory
        if (err) console.log(err);
        else {
          console.log("file deleted");
        }
      });
    }
  } else {
    var post = {
      id,
      name,
      email,
    };
  }

  if (!id || !name || !email) {
    res.status(422).json({ error: "Plz send complete data" });
  }
  try {
    const user = await User.findOneAndUpdate({ id: id }, post);

    //   const blog = new Blog({ userId, id, categoryID, title, body });
    // const blogSaved = await blog.save();
    if (user) {
      return res.status(201).json({ message: "Profile Updated Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Update Profile" });
    }
  } catch (err) {
    console.log(err);
  }
};
