const Profile = require("../database/profileModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

exports.Create_profile = catchAsyncError(async (req, res, next) => {
  try {
    const { location, profile_pic } = req.body;

    const data = {
      location,
      profile_pic,
      user_id: req.user.id,
    };

    const profile = await Profile.create(data);
    res.status(201).json({
      success: true,
      profile,
    });
  } 
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.Get_profile = catchAsyncError(async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user_id: req.user.id,
    });
    res.status(201).json({
      success: true,
      profile,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.Update_profile = catchAsyncError(async (req, res, next) => {
  const { location, profile_pic } = req.body;
  try {
    const profile = await Profile.findOneAndUpdate({
      user_id: req.user.id,
      location,
      profile_pic,
    });
    res.status(201).json({
      success: true,
      profile,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
