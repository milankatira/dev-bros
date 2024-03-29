const EmployementType = require("../database/employment_type");

const catchAsyncError = require("../middleware/catchAsyncError");

exports.GetEmployement_type = catchAsyncError(async (req, res) => {
  const Employement_type = await EmployementType.find();

  res.status(200).json({
    success: true,
    Employement_type,
  });
});
