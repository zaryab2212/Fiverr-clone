const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: " invalid users",
      });
    }
    const verifyUser = await bcrypt.compare(req.body.password, user.password);

    if (!verifyUser) {
      return res.status(400).json({
        status: false,
        message: " invalid Credentials",
      });
    }

    const token = jwt.sign(
      { user: user._id, isSeller: user.isSeller },
      process.env.JWT_SECRET
    );
    const { password, ...userData } = user._doc;
    // const user = { password, ...loginuser };
    // delete user.password;

    res
      .status(200)
      .cookie("token", token, {
        maxAge: new Date(Date.now() + 99999999),
        httpOnly: true,
      })
      .json({
        userData,
        token,
        status: true,
        message: " User Loged in succesfully",
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Occored in Logging inr",
      error,
    });
  }
};

exports.userRegister = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (user) {
      return res.status(400).json({
        status: false,
        message: "User Already Exsist Plesae try to login",
      });
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    const newUser = { ...req.body, password: hashedPass };

    const newuser = await User.create(newUser);
    await newuser.save();

    res.status(201).json({
      newUser,
      status: true,
      message: " New user in added successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erroe Occored in Register User",
      error,
    });
  }
};

exports.userLogOut = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        status: true,
        message: " user Logout successfully",
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Occored to logout User",
      error,
    });
  }
};

exports.userInfo = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ status: false, message: "please login first" });
  }
  const usr = await User.findById(req.user);
  if (!usr) {
    return res
      .status(400)
      .json({ status: false, message: "not a valid you, login again" });
  }
  return res
    .status(200)
    .json({ status: true, message: "user data fetch succesfully", user: usr });
};
