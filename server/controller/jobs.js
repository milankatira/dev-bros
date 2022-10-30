const Jobs = require("../database/jobs");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddJob = catchAsyncError(async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      compensation,
      employment_type,
      salary_preference,
      travel_requirements,
      is_telecommute,
      skills,
    } = req.body;
    const job = await Jobs.create({
      title,
      description,
      location,
      compensation,
      employment_type,
      salary_preference,
      travel_requirements,
      is_telecommute,
      skills,
      user_id: req.user.id,
    });
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.GetAllJobs = catchAsyncError(async (req, res, next) => {
  try {
    const jobs = await Jobs.find();
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
