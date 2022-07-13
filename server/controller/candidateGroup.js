const GroupModal = require("../database/candidate_group");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddGroup = catchAsyncError(async (req, res, next) => {
  try {
    const { profile_url, name, title, description, userId } = req.body;
   console.log(userId,"DD")
    JSON.parse(userId);
    const group = await GroupModal.create({
      profile_url,
      name,
      title,
      description,
      candidates: JSON.parse(userId),
      user_id: req.user.id,
    });

    res.status(201).json({
      success: true,
      group,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.GetGroup = catchAsyncError(async (req, res, next) => {
  try {
    const limit =
      req.query && req.query.itemsPerPage ? req.query.itemsPerPage : 10;
    const skip = req.query && req.query.offset ? req.query.offset : 0;

    const group = await GroupModal.find({ user_id: req.user.id })
      .limit(Number(limit))
      .skip(Number(skip));
    res.status(201).json({
      success: true,
      group,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateGroup = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await GroupModal.findByIdAndUpdate(id, req.body);
    res.status(201).json({
      success: true,
      group,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.DeleteGroup = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await GroupModal.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      group,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
