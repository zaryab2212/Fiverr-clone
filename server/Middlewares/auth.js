const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");

exports.authorized = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        status: false,
        message: "It seems you need to login again",
      });
    }

    const verfyUser = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verfyUser) {
      return res.status(400).json({
        status: false,
        message: "Not an authorized User",
      });
    }
    req.user = verfyUser.user;
    req.isSeller = verfyUser.isSeller;

    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Authention failed",
      error,
    });
  }
};
