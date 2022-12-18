const express = require("express");
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");
var imageName = null;
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/products");
  },
  filename: (req, file, callback) => {
    // imageName = Date.now() + file.originalname;
    const replaced = file.originalname.replaceAll(" ", "-");
    imageName = Date.now() + replaced;
    callback(null, imageName);
  },
});

exports.upload = multer({ storage: storage });

// CREATE PRODUCTS

exports.addProduct = async (req, res) => {
  const { id, categoryId, title, description, price, quantity, userId } =
    req.body;
  const image = imageName;
  // if (!id || !categoryId || !title || !description || !price || !quantity) {
  //   res.status(422).json({ error: "Plz send complete data" });
  // }
  try {
    const product = new Product({
      id,
      categoryId,
      title,
      description,
      price,
      quantity,
      image,
      userId,
    });
    const productSaved = await product.save();
    if (productSaved) {
      return res.status(201).json({ message: "Product Added Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Add Product" });
    }
  } catch (err) {
    console.log(err);
  }
};

// READ PRODUCTS

exports.getProducts = async (req, res) => {
  const { id } = req.body;
  try {
    if (id) {
      const products = await Product.findOne({ id: id });
      if (products) {
        res.send(products);
      } else {
        return res.status(500).json({ error: "Product Not Found" });
      }
    } else {
      const products = await Product.find({});
      if (products) {
        res.send(products);
      } else {
        return res.status(500).json({ error: "Products Not Found" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// UPDATE PRODUCTS

exports.updateProduct = async (req, res) => {
  const { id, categoryId, title, description, price, quantity } = req.body;
  // if (!id || !categoryId || !title || !description || !price || !quantity) {
  //   res.status(422).json({ error: "Plz send complete data" });
  // } else
  console.log(req.body);
  try {
    const update = await Product.findOneAndUpdate({ id: id }, req.body);
    if (update) {
      return res.status(201).json({ message: "Product Updated Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Update Product" });
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE PRODUCTS

exports.deleteProduct = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(422).json({ error: "ID not found" });
  }
  try {
    const ProductObj = await Product.findOne({ id: id });
    const deleted = await Product.findOneAndDelete({ id: id });
    if (deleted) {
      await fs.unlink(
        "../client/public/products/" + ProductObj.image,
        (err) => {
          //delete file from directory
          if (err) console.log(err);
          else {
            console.log("file deleted");
          }
        }
      );
      return res.status(201).json({ message: "Product Deleted Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Delete Product" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.searchProduct = async (req, res) => {
  const { categoryId, userId } = req.body;
  if (userId) {
    const Products = await Product.find({
      // title: req.body.title,
      userId: userId,
    });
    if (!Products || Products.length === 0)
      res.status(400).send({ error: "No Product was found" });
    else res.status(200).json(Products);
  } else if (categoryId) {
    const Products = await Product.find({
      // title: req.body.title,
      categoryId: categoryId,
    });
    if (!Products || Products.length === 0)
      res.status(400).send({ error: "No Product was found" });
    else res.status(200).json(Products);
  } else {
    const queryString = req.body.title;
    if (queryString) {
      const queryStrings = queryString.split(" ");
      allQueries = [{ title: req.body.title }];
      queryStrings.forEach((element) => {
        allQueries.push({ title: { $regex: String(element), $options: "i" } });
      });
      const Products = await Product.find({
        // title: req.body.title,
        $or: allQueries,
      });
      if (!Products || Products.length === 0)
        res.status(400).send({ error: "No Product was found" });
      else res.status(200).json(Products);
    }
  }
};
