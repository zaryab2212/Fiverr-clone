const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      // required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    coverPath: {
      type: String,
    },
    picturePath: {
      type: [String],
    },
    starNumber: {
      type: Number,
      default: 0,
      //   enum: ["1", "2", "3", "4", "5"],
    },
    cat: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    images: {
      type: [String],
    },
    shortTitle: {
      type: String,
      // required: true,
    },
    shortDesc: {
      type: String,
      // required: true,
    },
    deliveryTime: {
      type: Number,
      // required: true,
    },
    revisionNumber: {
      type: Number,
      // required: true,
    },
    sales: {
      type: Number,
      // required: true,
      default: 0,
    },
    features: {
      type: [String],
    },
  },
  { timestamps: true }
);

exports.Gig = mongoose.model("Gig", gigSchema);
