const City=require("../database/city");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddCity = catchAsyncError(async (req, res, next) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json({
      success: true,
      city,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateCity = catchAsyncError(async (req, res, next) => {
  try {
    let city = await City.findById(req.params.id);

    if (!city) {
      return next(new ErrorHandler("city not found", 404));
    }

    city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      city,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteCity = catchAsyncError(async (req, res, next) => {
  let city = await City.findById(req.params.id);

  if (!city) {
    return next(new ErrorHandler("city not found", 404));
  }

  city = await City.remove();

  res.status(200).json({
    success: true,
    message: "city deleted successfully",
  });
});

exports.GetCity = catchAsyncError(async (req, res, next) => {
  const city = await City.find();
  res.status(200).json({
    success: true,
    city,
  });
});



exports.GetCityByid = catchAsyncError(async (req, res, next) => {
  let city = await City.findById(req.params.id);
  res.status(200).json({
    success: true,
    city,
  });
});
