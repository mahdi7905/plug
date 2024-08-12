const { Product } = require("../models/schemas");

const addProductController = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
  }
};
const productsController = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {}
};

module.exports = {
  addProductController,
  productsController,
};
