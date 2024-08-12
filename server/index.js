const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRoutes");
const { productRouter } = require("./routes/productRoutes");
const { cartRouter } = require("./routes/cartRoutes");
const { requireAuth } = require("./middleware/requireAuth");
const { favoriteRouter } = require("./routes/favoriteRoutes");
const { orderRouter } = require("./routes/orderRoutes");
const { checkoutRouter } = require("./routes/checkoutRoutes");

const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("db connected and server running on port 7000")
    );
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/api/auth", userRouter);
app.use("/api/products", requireAuth, productRouter);
app.use("/api/cart", requireAuth, cartRouter);
app.use("/api/favorite", requireAuth, favoriteRouter);
app.use("/api/orders", requireAuth, orderRouter);
app.use("/api/checkout", requireAuth, checkoutRouter);
