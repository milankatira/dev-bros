const Company = require("../database/company");
const Jimp = require("jimp");
const path = require("path");
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

    const buffer = Buffer.from(
      cover_picture.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    // const buffer = Buffer.from(cover_picture, "binary");
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    // 32478362874-3242342342343432.png

    const jimResp = await Jimp.read(buffer);
    jimResp
      .resize(150, Jimp.AUTO)
      .write(path.resolve(__dirname, `../static/${imagePath}`));

    const logobuffer = Buffer.from(
      logo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    // const logobuffer = Buffer.from(logo, "binary");
    const logoimagePath = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.png`;

    // 32478362874-3242342342343432.png

    const jimResplogo = await Jimp.read(logobuffer);
    jimResplogo
      .resize(150, Jimp.AUTO)
      .write(path.resolve(__dirname, `../static/${logoimagePath}`));

    const company = await Company.create({
      name,
      address,
      description,
      company_url,
      number_of_eployees,
      foundation_year,
      headquter,
      logo: logoimagePath,
      cover_picture: imagePath,
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

exports.getCompany = catchAsyncError(async (req, res, next) => {
  try {
    const company = await Company.findOne({
      user_id: req.user.id,
    });
    res.status(200).json({
      status: true,
      company,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.updateCompany = catchAsyncError(async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.user.id, req.body);
    res.status(200).json({
      status: true,
      company,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
