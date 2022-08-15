const SubcriptionPlan = require("../database/subcription_plans");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddSubcriptionPlan = catchAsyncError(async (req, res, next) => {
  try {
    const subcription_plan = await SubcriptionPlan.create(req.body);

    res.status(201).json({
      success: true,
      subcription_plan,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateSubcriptionPlan = catchAsyncError(async (req, res, next) => {
  try {
    let subcription_plan = await SubcriptionPlan.findById(req.params.id);

    if (!subcription_plan) {
      return next(new ErrorHandler("subcription_plan not found", 404));
    }

    subcription_plan = await SubcriptionPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      subcription_plan,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteSubcriptionPlan = catchAsyncError(async (req, res, next) => {
  let subcription_plan = await SubcriptionPlan.findById(req.params.id);

  if (!subcription_plan) {
    return next(new ErrorHandler("subcription_plan not found", 404));
  }

  subcription_plan = await SubcriptionPlan.remove();

  res.status(200).json({
    success: true,
    message: "subcription_plan deleted successfully",
  });
});

exports.GetSubcriptionPlan = catchAsyncError(async (req, res, next) => {
  const subcription_plan = await SubcriptionPlan.find();

  res.status(200).json({
    success: true,
    subcription_plan,
  });
});
