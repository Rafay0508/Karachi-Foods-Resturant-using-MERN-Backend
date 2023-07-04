const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useunifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
      writeConcern: {
        w: "majority",
      },
    });
    console.log(`mongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("error in mongodb connection" + error);
    process.exit();
  }
};

module.exports = connectDB;
