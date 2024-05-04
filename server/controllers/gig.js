const { Gig } = require("../models/gig");

exports.fetchAllGigs = async (req, res) => {
  try {
    const q = req.query;
    const filters = {
      ...(q.user && { userId: q.user }),
      ...(q.cat && { cat: q.cat }),
      ...((q.min || q.max) && {
        price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
      }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };

    const gigs = await Gig.find(filters).populate("userId");

    res.status(200).json({
      status: true,
      message: "Gigs fetched Successfully",
      gigs,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erroe Occored in Logging inr",
      error,
    });
  }
};
exports.fetchSingleGig = async (req, res) => {
  try {
    const { id } = req.params;

    const gig = await Gig.findById(id).populate("userId");

    if (!gig) {
      return res.status(400).json({
        status: false,
        message: "Unable to find gig",
      });
    }
    res.status(200).json({
      status: true,
      message: "Gig Data fetched successfully",
      gig,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erroe Occored in Logging inr",
      error,
    });
  }
};

exports.deleteGig = async (req, res) => {
  try {
    const { id } = req.params;
    const findGig = await Gig.findById(id);

    if (!findGig) {
      return res.status(400).json({
        status: false,
        message: "Unable to find gig to delete",
      });
    }

    if (req.user.toString() !== findGig.userId.toString()) {
      return res.status(400).json({
        status: false,
        message: "You are not Authorized to delete this gig",
      });
    }

    const deletedGig = await Gig.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Gig is deleted Succesfully",
      deletedGig,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erroe Occored in Logging inr",
      error,
    });
  }
};

exports.createGig = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.isSeller) {
      return res.status(400).json({
        status: false,
        message: "This is not seller account",
      });
    }

    const newGig = await Gig.create({
      userId: req.user,
      ...req.body,
    });
    await newGig.save();

    res.status(201).json({
      status: true,
      message: "Gig is Creaated Succesfully",
      newGig,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Occured in creating gig",
      error,
    });
  }
};
