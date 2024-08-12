const { Order, Product, Cart } = require("../models/schemas");

const getAllOrders = async (req, res) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id }).populate("products");

    res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
  }
};

const createOrder = async (req, res) => {
  const { _id } = req.user;

  const { products_id, shippingAddress } = req.body;
  const products = await Product.find({ _id: { $in: products_id } });

  const amount = products.reduce((acc, product) => acc + product.price, 0);
  try {
    const order = await Order.create({
      user: _id,
      shippingAddress,
      products: products_id,
      amount,
    });
    console.log(order);
    await order.populate("products");
    res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
};
