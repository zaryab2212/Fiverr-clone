const express = require("express");
const { Message } = require("../models/message");
const { Conversation } = require("../models/conversation");
const router = express.Router();

exports.createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create({
      conversationId: req.bosy.conversationId,
      userId: req.user,
      desc: req.body.desc,
    });

    await newMessage.save();

    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
        lastMessage: req.body.desc,
      },
      { new: true }
    );

    res.status(201).json({
      status: true,
      message: "Message sent succesfully",
      newMessage,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Message save failed",
      error,
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const message = await Conversation.find({
      ...(req.isSeller ? { sellerId: req.user } : { buyerId: req.user }),
    }).sort({ lastMessage: -1 });

    res.status(200).json({
      status: true,
      message: "Message found succesfully",
      message,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Message failed",
      error,
    });
  }
};
// exports.createMessage = async (req,res) => {
//   try {
//   } catch (error) {}
// };

module.exports = router;
