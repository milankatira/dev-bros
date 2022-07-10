const QuestionModal = require("../database/question");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.addQuestion = catchAsyncError(async (req, res, next) => {
  try {
    if (req.body && req.body.data.questions) {
      const questionData = await Promise.all(
        req.body.data.questions.map(async (qus) => {
          const newQus = new QuestionModal({
            question: qus.question,
            answer: qus.answer,
            level: qus.level,
            mcqs: qus.mcqs,
            exam_id: req.body.exam_id,
            company_id: req.user.id,
          });
          const createdQus = await newQus.save();
          return createdQus;
        })
      );

      res.status(201).json({
        success: true,
        questionData,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.RemoveQuestion = catchAsyncError(async (req, res, next) => {
  try {
    const { exam_id, question_id } = req.body;
    const question = await QuestionModal.findById(question_id);
    if (question.exam_id.length > 0) {
      question.exam_id.remove(exam_id);
      await QuestionModal.findByIdAndUpdate(question_id, question);
      res.status(201).json({
        success: true,
      });
    } else {
      return next(new ErrorHandler("not found", 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

exports.updateQuestion = catchAsyncError(async (req, res, next) => {
  try {
    const { question, mcqs, answer, level, exam_id } = req.body.questions[0];
    const { id } = req.params;
    const packet = {
      question,
      answer,
      level,
      mcqs,
      exam_id,
      company_id: userId,
    };
    const Data = await QuestionModal.findByIdAndUpdate(id, packet);
    res.status(201).json({
      success: true,
      Data,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getQuestion = catchAsyncError(async (req, res, next) => {
  try {
    const Data = await QuestionModal.find({
      exam_id: req.params.exam_id,
    });
    res.status(201).json({
      success: true,
      Data,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
