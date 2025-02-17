const mongoose = require("mongoose");

module.exports = async () => {
  const mongoURI = process.env.MONGODB_URI;
  console.log(`Connecting to MongoDB at ${mongoURI}`);
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error occurred while connecting to MongoDB!", err);
    if (err.name === "MongoNetworkError") {
      console.error(
        "Network error: Please ensure your MongoDB server is running and accessible."
      );
    } else if (err.name === "MongoServerSelectionError") {
      console.error(
        "Server selection error: Please ensure your MongoDB URI is correct and the server is accessible."
      );
    } else {
      console.error("Unexpected error:", err);
    }
  }
};
