const ResultModal = require("../database/result");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddResult = catchAsyncError(async (req, res, next) => {
  try {
    const { assign_exam_id, exam_id, questions } = req.body;

    const result = await ResultModal.create({
      candidate_id: req.user.id,
      assign_exam_id,
      exam_id,
      questions,
    });

    res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
