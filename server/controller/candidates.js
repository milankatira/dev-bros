const userModal = require("../database/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.GetCandidates = catchAsyncError(async (req, res, next) => {
  try {
    const candidates = await userModal.find({ role: "candidate" });
    res.status(201).json({
      success: true,
      candidates,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
