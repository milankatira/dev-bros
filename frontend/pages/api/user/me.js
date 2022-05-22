import ErrorHandler from "../../../utils/errorhandler";
import Profile from "../../../models/profileModel";
import userModel from "../../../models/userModel";
import connectDb from "../../../middleware/mongoose";
const jwt = require("jsonwebtoken");

const Get_profile = async (req, res) => {
  try {
    if (req.method == "GET") {
      const { token } = req.cookies;

      if (!token) {
        throw new ErrorHandler(
          "Please login to access this resource",
          401
        );
      }

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findById(decodedData.id);

      const profile = await Profile.findOne({
        user_id: user.id,
      });
      res.status(201).json({
        success: true,
        profile,
        user,
      });
    }
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export default connectDb(Get_profile);
