const jwt = require("jsonwebtoken");
const { User } = require("../models/schemas");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ error: "Authorization token is required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT);
    req.user = await User.findById({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Request not authorized" });
    console.log("xxx");
  }
};
module.exports = { requireAuth };
