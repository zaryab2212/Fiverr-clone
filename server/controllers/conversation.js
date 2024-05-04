const { Conversation } = require("../models/conversation");
const { User } = require("../models/user");

exports.createConversation = async (req, res) => {
  try {
    const newConversation = await Conversation.create({
      id: req.isSeller
        ? req.isSeller + req.body.to
        : req.body.to + req.isSeller,
      sellerId: req.isSeller ? req.user : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.user,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });

    await newConversation.save();

    res.status(201).json({
      status: true,
      message: "converstation is started succesfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occured to open up the conversations",
      error,
    });
  }
};
exports.getConversation = async (req, res) => {
  try {
    const Conversation = await Conversation.find({
      ...(req.isSeller ? { sellerId: req.user } : { buyerId: req.user }),
    });

    if (!Conversation) {
      res.status(404).json({
        status: false,
        message: "conversation not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Conversation found succesfully",
      Conversation,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occured in findconversation",
      error,
    });
  }
};
exports.getSingleConversation = async (req, res) => {
  try {
    const SingleConversation = await Conversation.findOne({
      id: req.params.id,
    });

    if (!SingleConversation) {
      res.status(404).json({
        status: false,
        message: "conversation not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Conversation found succesfully",
      SingleConversation,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occured in updating conversation",
      error,
    });
  }
};
exports.updateConversation = async (req, res) => {
  try {
    const toUpdate = await Conversation.findOne({ id: req.params.id });

    if (!toUpdate) {
      res.status(404).json({
        status: false,
        message: "conversation not found",
      });
    }

    const newUpdatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "conversation is updated",
      newUpdatedConversation,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occured in updating conversation",
      error,
    });
  }
};
