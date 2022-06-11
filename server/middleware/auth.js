const jwt = require("jsonwebtoken");
const userModel = require("../database/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  console.log(req.cookies);
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decodedData.id);

  next();
});



exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};
