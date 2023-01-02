const State = require("../database/state");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddState = catchAsyncError(async (req, res, next) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json({
      success: true,
      state,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateState = catchAsyncError(async (req, res, next) => {
  try {
    let state = await State.findById(req.params.id);

    if (!state) {
      return next(new ErrorHandler("State not found", 404));
    }

    state = await State.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      state,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteState = catchAsyncError(async (req, res, next) => {
  let state = await State.findById(req.params.id);

  if (!state) {
    return next(new ErrorHandler("State not found", 404));
  }
  await State.remove();

  res.status(200).json({
    success: true,
    message: "State deleted successfully",
  });
});

exports.GetState = catchAsyncError(async (req, res) => {
  const state = await State.find();

  res.status(200).json({
    success: true,
    state,
  });
});
