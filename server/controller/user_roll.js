const UserRoll = require("../database/user_rolls");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddUserRoll = catchAsyncError(async (req, res, next) => {
  try {
    const userRoll = await UserRoll.create(req.body);

    res.status(201).json({
      success: true,
      userRoll,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateUserRoll = catchAsyncError(async (req, res, next) => {
  try {
    let userRoll = await UserRoll.findById(req.params.id);

    if (!userRoll) {
      return next(new ErrorHandler("userRoll not found", 404));
    }

    userRoll = await UserRoll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      userRoll,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteUserRoll = catchAsyncError(async (req, res, next) => {
  let userRoll = await UserRoll.findById(req.params.id);

  if (!userRoll) {
    return next(new ErrorHandler("userRoll not found", 404));
  }

  userRoll = await UserRoll.remove();

  res.status(200).json({
    success: true,
    message: "userRoll deleted successfully",
  });
});

exports.GetUserRoll = catchAsyncError(async (req, res) => {
  const userRoll = await UserRoll.find();

  res.status(200).json({
    success: true,
    userRoll,
  });
});
