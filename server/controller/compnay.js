const Company = require("../database/company");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddCompany = catchAsyncError(async (req, res, next) => {
  try {
    const {
      name,
      address,
      description,
      company_url,
      number_of_eployees,
      foundation_year,
      headquter,
      logo,
      cover_picture,
    } = req.body;
    const company = await Company.create({
      name,
      address,
      description,
      company_url,
      number_of_eployees,
      foundation_year,
      headquter,
      logo,
      cover_picture,
      user_id: req.user.id,
    });
    res.status(201).json({
      success: true,
      company,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
