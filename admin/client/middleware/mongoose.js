import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(
    // process.env.MONGODB_URI
    "mongodb://localhost:27017/dev_bros"
    //    {
    //   // useNewUrlParser: true,
    //   // useUnifiedTopology: true,
    // }
  );
  return handler(req, res);
};

export default connectDb;
