const { Gig } = require("../models/gig");
const { Review } = require("../models/review");

exports.CreateReview = async (req, res, next) => {
  if (req.isSeller) {
    return res.status(400).json({
      status: false,
      message: "Seller cannot create a review",
    });
  }

  const { gigId, star, desc } = req.body;

  try {
    if (req.isSeller) {
      return res.status(400).json({
        status: false,
        message: "Seller cannot create a review",
      });
    }
    const review = await Review.findOne({ gigId, userId: req.user });
    if (review) {
      return res.status(400).json({
        status: false,
        message: "Review Already been created",
      });
    }
    const newReview = await Review.create({
      star,
      desc,
      userId: req.user,
      gigId,
    });

    await newReview.save();

    const starUpdate = await Gig.findByIdAndUpdate(gigId, {
      $inc: { totalStars: star, starNumber: 1 },
    });

    res.status(201).json({
      status: true,
      message: `Review is added succesfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Occored in Createing Review",
      error,
    });
  }
};

exports.getReviews = async (req, res, next) => {
  const { gigId } = req.params;
  try {
    const reviews = await Review.find({ gigId });

    res.status(200).json({
      status: true,
      message: "reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Occored in getting Review",
      error,
    });
  }
};

exports.DeleteReview = async (req, res, next) => {
  try {
    const toBeDeleted = await Review.findOne({
      _id: req.params.id,
      userId: req.user,
    });
    if (!toBeDeleted) {
      res.status(400).json({
        status: false,
        message: "unable to find your review to delete",
      });
    }

    const deleted = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: "commint is succesfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Occored to delete the review Review",
      error,
    });
  }
};

// const CreateReview = async (req,res, next) => {
//   try {
//   } catch (error) {}
// };
