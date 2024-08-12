const { Favorite } = require("../models/schemas");

const createFavoriteItem = async (req, res) => {
  const { _id } = req.user;
  try {
    const exist = await Favorite.find({
      user: _id,
      item: req.body.favoriteItem,
    });
    if (exist.length > 0) {
      res.status(200).json({ message: "Item already in Favorite" });
    }
    if (exist.length === 0) {
      const item = await Favorite.create({
        user: _id,
        item: req.body.favoriteItem,
      });
      await item.populate("item");
      res.status(200).json(item);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getFavoriteItems = async (req, res) => {
  const { _id } = req.user;
  try {
    const favorite = await Favorite.find({ user: _id }).populate("item");
    res.status(200).json(favorite);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteFavoriteItem = async (req, res) => {
  try {
    const deletedItem = await Favorite.findByIdAndDelete(req.body.favoriteItem);
    res.status(200).json(deletedItem);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createFavoriteItem,
  getFavoriteItems,
  deleteFavoriteItem,
};
