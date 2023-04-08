const mongoose = require("mongoose");
exports.connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/MernImgUpload");
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
