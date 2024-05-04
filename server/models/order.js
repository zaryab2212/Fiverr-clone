const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    paymentIntent: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  { timestamps: true }
);

exports.Order = mongoose.model("Order", orderSchema);
