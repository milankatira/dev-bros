const Designation = require("../model/designation");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddDesignation = catchAsyncError(async (req, res, next) => {
  try {
    const data = await Designation.create(req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateDesignation = catchAsyncError(async (req, res, next) => {
  try {
    let designation = await Designation.findById(req.params.id);

    if (!designation) {
      return next(new ErrorHandler("designation not found", 404));
    }

    designation = await Designation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      designation,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteDesignation = catchAsyncError(async (req, res, next) => {
  let designation = await Designation.findById(req.params.id);

  if (!designation) {
    return next(new ErrorHandler("designation not found", 404));
  }

  designation = await Designation.remove();

  res.status(200).json({
    success: true,
    message: "designation deleted successfully",
  });
});

exports.GetDesignation = catchAsyncError(async (req, res, next) => {
  const designation = await Designation.find();

  res.status(200).json({
    success: true,
    designation,
  });
});
