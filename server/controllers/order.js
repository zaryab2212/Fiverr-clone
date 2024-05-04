const { Gig } = require("../models/gig");
const { Order } = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    if (req.isSeller) {
      return res.status(400).json({
        status: false,
        message: "Sellet can not create order",
      });
    }
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(400).json({
        status: false,
        message: "this gig is not available",
      });
    }

    const newOrder = await Order.create({
      gigId: gig._id,
      title: gig.title,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.user,
      paymentIntent: "The payment intedt",
    });

    await newOrder.save();

    res.status(201).json({
      status: true,
      message: "Order is created succesfully",
      newOrder,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Uable to create the user",
      error,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.user } : { buyerId: req.user }),
    });

    if (!orders) {
      res.status(400).json({
        status: false,
        message: "unable to find order",
      });
    }

    res.status(200).json({
      status: true,
      message: "user Orders found succesfully",
      orders,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "order could not be created",
      error,
    });
  }
};
