const express = require("express");
const {
  getFavoriteItems,
  createFavoriteItem,
  deleteFavoriteItem,
} = require("../controllers/favoriteController");

const favoriteRouter = express.Router();

favoriteRouter.get("/", getFavoriteItems);
favoriteRouter.post("/add-to-favorites", createFavoriteItem);
favoriteRouter.post("/delete-favorite", deleteFavoriteItem);

module.exports = { favoriteRouter };
