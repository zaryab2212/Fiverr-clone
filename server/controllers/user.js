const { User } = require("../models/user");

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Id not found",
      });
    }

    if (req.user.toString() !== user._id.toString()) {
      return res.status(400).json({
        status: false,
        message: "This is not your account to be deleted",
      });
    }

    const deletedUser = await User.findOneAndDelete(id);

    res.status(200).json({
      status: true,
      message: "User deleted succesfully",
      deletedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error Occored in deleting User",
      error,
    });
  }
};
