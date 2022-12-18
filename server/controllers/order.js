const Order = require("../models/order");
const Product = require("../models/product");

exports.addOrder = async (req, res) => {
  const { id, userId, productsId, cost } = req.body;
  // console.log(req.body);
  if (!id || !userId || !productsId || !cost) {
    res.status(422).json({ error: "Plz Send Complete Data" });
  }
  // Get All Products that are ordered to update there quantity

  var pIds = [];
  productsId.map((item) => {
    pIds.push(item.id);
  });
  const Products = await Product.find({
    id: { $in: pIds },
  });

  var updatedProducts = [];

  Products.forEach((element) => {
    const OrderedProduct = productsId.find((item) => {
      return item.id == element.id;
    });
    const updatedOrder = [
      ...element.order,
      { userId: userId, quantity: OrderedProduct.quantity },
    ];
    const updatedQuantity = element.quantity - OrderedProduct.quantity;
    const update = {
      ...element._doc,
      quantity: updatedQuantity,
      order: updatedOrder,
    };
    updatedProducts.push(update);
  });
  // console.log(updatedProducts);

  try {
    const order = new Order({ id, userId, productsId, cost });
    const orderSaved = await order.save();
    updatedProducts.map(async (item) => {
      await Product.findOneAndUpdate({ id: item.id }, item);
    });

    if (orderSaved) {
      return res.status(201).json({ message: "Order Saved Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Saved Order" });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getOrder = async (req, res) => {
  const { userId } = req.body;
  if (userId) {
    const order = await Order.find({ userId: userId });
    if (order) {
      res.json(order);
    } else {
      return res.status(500).json({ error: "Product Not Found" });
    }
  } else {
    const order = await Order.find({});
    if (order) {
      res.json(order);
    } else {
      return res.status(500).json({ error: "Product Not Found" });
    }
  }
};
exports.updateOrder = async (req, res) => {
  const { id, userId, productsId, cost } = req.body;
  if (!id || !userId || !productsId || !cost) {
    return res.status(422).json({ error: "Please Send Complete Data" });
  }
  try {
    const update = await Order.findOneAndUpdate({ id: id }, req.body);
    if (update) {
      res.status(201).json({ message: "Order Updated Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Update Order" });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.deleteOrder = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(422).json({ error: "Plz Send Order ID" });
  }
  try {
    const deleted = await Order.findOneAndDelete({ id: id });
    if (deleted) {
      return res.status(201).json({ message: "Order Deleted Successfully" });
    } else {
      return res.status(500).json({ error: "Failed to Delete Order" });
    }
  } catch (err) {
    console.log(err);
  }
};
