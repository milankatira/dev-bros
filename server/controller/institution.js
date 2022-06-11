const Institution = require("../database/institution");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddInstitution = catchAsyncError(async (req, res, next) => {
  try {
    const institution = await Institution.create(req.body);

    res.status(201).json({
      success: true,
      institution,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateInstitution = catchAsyncError(async (req, res, next) => {
  try {
    let institution = await Institution.findById(req.params.id);

    if (!institution) {
      return next(new ErrorHandler("institution not found", 404));
    }

    institution = await Institution.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      institution,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteInstitution = catchAsyncError(async (req, res, next) => {
  let institution = await Institution.findById(req.params.id);

  if (!institution) {
    return next(new ErrorHandler("institution not found", 404));
  }

  institution = await Institution.remove();

  res.status(200).json({
    success: true,
    message: "institution deleted successfully",
  });
});

exports.GetInstitution = catchAsyncError(async (req, res, next) => {
  const institution = await Institution.find();

  res.status(200).json({
    success: true,
    institution,
  });
});
