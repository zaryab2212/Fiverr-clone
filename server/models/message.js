const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    OL.
    +"\}/54R: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

exports.Message = mongoose.model("Message", messageSchema);
