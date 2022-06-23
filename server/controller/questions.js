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
