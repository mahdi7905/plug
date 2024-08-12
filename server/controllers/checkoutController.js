const { Order } = require("../models/schemas");
const stripe = require("stripe")(process.env.STRIPE);

const checkoutController = async (req, res) => {
  const order = Order.findById(req.body.order_id).populate("products");
  console.log(order);

  const { id, order_id } = req.body;
  try {
    const order = await Order.findById(order_id).populate("products");
    const amount = Math.floor((order.amount / 1500) * 100);
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "CapMan Order",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000/orders",
    });
    if (payment.status === "succeeded") {
      order.paymentStatus = "Success";
      await order.save();
    }
    res.status(200).json({ order, success: true });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Payment Failed" });
  }
};

module.exports = { checkoutController };
