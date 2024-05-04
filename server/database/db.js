const mongoose = require("mongoose");

exports.connection = async () => {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/fiver");
    await mongoose.connect(
      "mongodb+srv://jessiep1232:4fVQwba1hdPflvsv@fivercluster.uzuz6kj.mongodb.net/"
    );
    console.log("Data Base is connected");
  } catch (error) {
    console.log("Data Base connection error", error);
  }
};

// password  4fVQwba1hdPflvsv
