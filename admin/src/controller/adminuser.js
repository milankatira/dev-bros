const User = require("../model/user");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const dotenv = require("dotenv");

dotenv.config({ path: "../config/config.env" });

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const user = await User.create(req.body);

  sendToken(user, 201, res);

});



exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please provide email and password", 400));
  }
  const user = await User.findOne({ email })
  if (!user) {
    return next(new ErrorHandler("email or password is incorrect", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("email or password is incorrect", 400));
  }
  sendToken(user, 200, res);
});


