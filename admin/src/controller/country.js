const Country = require("../model/country");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddCountry = catchAsyncError(async (req, res, next) => {
  try {
    const data = await Country.create(req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateCountry = catchAsyncError(async (req, res, next) => {
  try {
    let country = await Country.findById(req.params.id);

    if (!country) {
      return next(new ErrorHandler("Country not found", 404));
    }

    country = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      country,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteCountry = catchAsyncError(async (req, res, next) => {
  let country = await Country.findById(req.params.id);

  if (!country) {
    return next(new ErrorHandler("Country not found", 404));
  }
  await Country.remove();

  res.status(200).json({
    success: true,
    message: "Country deleted successfully",
  });
});

exports.GetCountry = catchAsyncError(async (req, res, next) => {
  const country = await Country.find();

  res.status(200).json({
    success: true,
    country,
  });
});
