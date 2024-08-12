const express = require("express");
const {
  getCartItems,
  createCartItem,
  deleteCart,
} = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.get("/", getCartItems);
cartRouter.post("/add-to-cart", createCartItem);
cartRouter.post("/remove-cart-item", deleteCart);

module.exports = { cartRouter };
