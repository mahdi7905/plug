const express = require("express");
const { checkoutController } = require("../controllers/checkoutController");

const checkoutRouter = express.Router();

checkoutRouter.post("/", checkoutController);

module.exports = {
  checkoutRouter,
};
