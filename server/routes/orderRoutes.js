const express = require("express");

const { getAllOrders, createOrder } = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.post("/create-order", createOrder);

module.exports = { orderRouter };
