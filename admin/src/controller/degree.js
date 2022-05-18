const Degree = require("../model/degree");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddDegree = catchAsyncError(async (req, res, next) => {
  try {
    const data = await Degree.create(req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateDegree = catchAsyncError(async (req, res, next) => {
  try {
    let degree = await Degree.findById(req.params.id);

    if (!degree) {
      return next(new ErrorHandler("degree not found", 404));
    }

    degree = await Degree.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      degree,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteDegree = catchAsyncError(async (req, res, next) => {
  let degree = await Degree.findById(req.params.id);

  if (!degree) {
    return next(new ErrorHandler("degree not found", 404));
  }

  degree = await Degree.remove();

  res.status(200).json({
    success: true,
    message: "degree deleted successfully",
  });
});

exports.GetDegree = catchAsyncError(async (req, res, next) => {
  const degree = await Degree.find();

  res.status(200).json({
    success: true,
    degree,
  });
});
