const express = require("express");
// const upload = require("../middleware/uploadAvatar");

const {
  addProductController,
  productsController,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/", productsController);
productRouter.post("/add-product", addProductController);

module.exports = { productRouter };
