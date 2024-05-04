const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "username feild is required"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "email feild is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password feild is required"],
    },
    picturePath: {
      type: String,
    },
    image: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: [Number, "phone only can be in number formate"],
    },
    desc: {
      type: String,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", userSchema);
