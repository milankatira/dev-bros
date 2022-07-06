const ExamModal = require("../database/exam");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.AddExam = catchAsyncError(async (req, res, next) => {
  try {
    const {
      exam_name,
      description,
      exam_type,
      total_mark,
      passing_mark,
      totalQuestion,
    } = req.body;
    const exam = await ExamModal.create({
      exam_name,
      description,
      exam_type,
      total_mark,
      passing_mark,
      user_id: req.user.id,
      totalQuestion,
    });

    res.status(201).json({
      success: true,
      exam,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.UpdateExam = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const examValue = await ExamModal.findByIdAndUpdate(id, req.body);
    const exam = await examValue.save();
    res.status(201).json({
      success: true,
      exam,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.deleteExam = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const exam = await ExamModal.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      exam,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getExamById = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const exam = await ExamModal.findById(id);
    res.status(201).json({
      success: true,
      exam,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.GetAllExam = catchAsyncError(async (req, res, next) => {
  try {
    const limit =
      req.query && req.query.itemsPerPage ? req.query.itemsPerPage : 10;
    const skip = req.query && req.query.offset ? req.query.offset : 0;

    const exam = await ExamModal.find()
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      exam,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
