const { Cart } = require("../models/schemas");

const createCartItem = async (req, res) => {
  const { _id } = req.user;
  try {
    const exist = await Cart.find({ item: req.body.cartItem, user: _id });
    if (exist.length > 0) {
      res.status(200).json({ message: "Item already in cart" });
    }
    if (exist.length === 0) {
      const item = await Cart.create({ user: _id, item: req.body.cartItem });
      await item.populate("item");
      res.status(200).json(item);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getCartItems = async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.find({ user: _id }).populate("item");
    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
  }
};
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.body.cartItem);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createCartItem,
  getCartItems,
  deleteCart,
};
