const express = require("express");
const Category = require("../models/category");

// Create Category

exports.addCategory = async (req, res) => {
  const { id, name } = req.body;
  console.log("ADD Category");
  if (!id || !name) {
    res.status(422).json({ error: "Plz send complete data" });
  }
  try {
    const category = new Category({
      id,
      name,
    });

    const categorySaved = await category.save();
    if (categorySaved) {
      res.status(201).json({ message: "Category Saved Successfully" });
    } else {
      res.status(500).json({ error: "Failed to Save Category" });
    }
  } catch (err) {
    console.log(err);
  }
};

// Read Category

exports.getCategory = async (req, res) => {
  const { id } = req.body;
  console.log("GET CATEGORY");
  if (id) {
    const category = await Category.findOne({ id: id });
    if (category) {
      res.send(category);
    } else {
      return res.status(500).json({ error: "Category Not Found" });
    }
  } else {
    const category = await Category.find({});
    if (category) {
      res.send(category);
    } else {
      return res.status(500).json({ error: "Category Not Found" });
    }
  }
};

// Update Category

exports.updateCategory = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(422).json({ error: "Plz send complete data" });
  }
  try {
    const update = await Category.findOneAndUpdate({ id: id }, req.body);
    if (update) {
      res.status(201).json({ message: "Category Updated Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Update Category" });
    }
  } catch (err) {
    console.log(err);
  }
};

// Delete Category

exports.deleteCategory = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(422).json({ error: "ID not found" });
  }
  try {
    const deleted = await Category.findOneAndDelete({ id: id });
    if (deleted) {
      return res.status(201).json({ message: "Category Deleted Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Delete Category" });
    }
  } catch (err) {
    console.log(err);
  }
};
