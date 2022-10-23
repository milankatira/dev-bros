const QuestionModal = require("../database/coding_question");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.addQuestion = catchAsyncError(async (req, res, next) => {
  try {
    const packet = {
      exam_id: req.params.exam_id,
      question: req.body.question,
      level: req.body.level,
      company_id: req.user.id,
    };

    const codingquestionData = await QuestionModal.create(packet);

    res.status(201).json({
      success: true,
      codingquestionData,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getcodingquestion = catchAsyncError(async (req, res, next) => {
  try {
    const codingquestionData = await QuestionModal.find({
      exam_id: req.params.exam_id,
    });

    res.status(201).json({
      success: true,
      codingquestionData,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getcodingquestionbyId = catchAsyncError(async (req, res, next) => {
  try {
    const codingquestionData = await QuestionModal.findById(req.params._id);
    res.status(201).json({
      success: true,
      codingquestionData,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.updateQuestion = catchAsyncError(async (req, res, next) => {
  try {
    const packet = {
      question: req.body.question,
      level: req.body.level,
      company_id: req.user.id,
    };

    const codingquestionData = await QuestionModal.findByIdAndUpdate(
      req.params._id,
      packet
    );

    res.status(201).json({
      success: true,
      codingquestionData,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
