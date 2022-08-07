const ResultModal = require("../database/result");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");

exports.AddResult = catchAsyncError(async (req, res, next) => {
  try {
    const { assign_exam_id, exam_id, questions } = req.body;

    const checkExam = await ResultModal.findOne({
      assign_exam_id,
      exam_id,
      candidate_id: req.user.id,
    });

    if (checkExam) {
      return next(new ErrorHandler("exam is already submitted", 400));
    }
    
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

exports.generateExamReport = catchAsyncError(async (req, res, next) => {
  const { assign_exam_id } = req.body;
  const query = {
    assign_exam_id: mongoose.Types.ObjectId(assign_exam_id),
    user_marks: null,
    total: null,
    passing_marks: null,
    is_passed: null,
  };

  const results = await ResultModal.aggregate([
    { $match: query },
    { $unwind: "$questions" },
    {
      $lookup: {
        from: "questions",
        localField: "questions.question_id",
        foreignField: "_id",
        as: "questionsFromDb",
      },
    },
    { $unwind: "$questionsFromDb" },
    {
      $project: {
        questions: 1,
        questionsFromDb: 1,
        exam_id: 1,
        assign_exam_id: 1,
        correct_answer: {
          $eq: ["$questionsFromDb.answer", "$questions.answer"],
        },
        easy_correct: {
          $eq: ["$questionsFromDb.level", "easy"],
        },
        medium_correct: {
          $eq: ["$questionsFromDb.level", "medium"],
        },
        hard_correct: {
          $eq: ["$questionsFromDb.level", "difficult"],
        },
        _id: 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        universities: {
          $push: { questions: "$questions", isCorrect: "$correct_answer" },
        },
        total_correct: {
          $sum: {
            $cond: [{ $eq: ["$correct_answer", true] }, 1, 0],
          },
        },
        easy_correct: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$correct_answer", true] },
                  { $eq: ["$easy_correct", true] },
                ],
              },
              1,
              0,
            ],
          },
        },
        medium_correct: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$correct_answer", true] },
                  { $eq: ["$medium_correct", true] },
                ],
              },
              1,
              0,
            ],
          },
        },
        hard_correct: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$correct_answer", true] },
                  { $eq: ["$hard_correct", true] },
                ],
              },
              1,
              0,
            ],
          },
        },

        easy_count: {
          $sum: {
            $cond: [{ $eq: ["$easy_correct", true] }, 1, 0],
          },
        },
        medium_count: {
          $sum: {
            $cond: [{ $eq: ["$medium_correct", true] }, 1, 0],
          },
        },
        hard_count: {
          $sum: {
            $cond: [{ $eq: ["$hard_correct", true] }, 1, 0],
          },
        },
      },
    },
  ]);

  console.log(results, "results");
  if (results && results.length > 0) {
    const newReport = Promise.all(
      await results.map(async (result) => {
        const exam = await ResultModal.findById(result._id).populate("exam_id");
        if (exam) {
          const newResult = await ResultModal.findByIdAndUpdate(
            result._id,
            {
              total: exam.exam_id.total_mark,
              passing_marks: exam.exam_id.passing_mark,
              easy_count: result.easy_count,
              medium_count: result.medium_count,
              hard_count: result.hard_count,
              easy_correct: result.easy_correct,
              medium_correct: result.medium_correct,
              hard_correct: result.hard_correct,
            },
            { new: true }
          ).populate({ path: "candidate_id", select: "name email phone" });
          return newResult;
        }
      })
    );
    const reportDetails = new Promise((resolve) => {
      resolve(newReport);
    });

    const newGeneratedReport = await reportDetails;
    // return newGeneratedReport;
    res.status(201).json({
      success: true,
      newGeneratedReport,
    });
  }
  res.status(201).json({
    success: true,
    //  result,
  });
  // return null;
});
