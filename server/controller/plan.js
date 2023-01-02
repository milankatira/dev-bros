const Plan = require("../database/plans");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddPlan = catchAsyncError(async (req, res, next) => {
  try {
    const plan = await Plan.create(req.body);

    res.status(201).json({
      success: true,
      plan,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdatePlan = catchAsyncError(async (req, res, next) => {
  try {
    let plan = await Plan.findById(req.params.id);

    if (!plan) {
      return next(new ErrorHandler("plan not found", 404));
    }

    plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      plan,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeletePlan = catchAsyncError(async (req, res, next) => {
  let plan = await Plan.findById(req.params.id);

  if (!plan) {
    return next(new ErrorHandler("plan not found", 404));
  }

  plan = await Plan.remove();

  res.status(200).json({
    success: true,
    message: "plan deleted successfully",
  });
});

exports.GetPlan = catchAsyncError(async (req, res) => {
  const plan = await Plan.find();

  res.status(200).json({
    success: true,
    plan,
  });
});
