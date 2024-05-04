const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    gigId: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      default: 1,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

exports.Review = mongoose.model("Review", reviewSchema);
