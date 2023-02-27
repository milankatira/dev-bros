const ExamModal = require("../database/exam");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const UserModel = require("../database/userModel");
const ResultModal = require("../database/result");
const { default: mongoose } = require("mongoose");

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
    const exam = await ExamModal.findById(id).populate({
      path: "user_id",
      select: "firstName lastName email phoneNo",
      model: UserModel,
    });
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

    const { name } = req.query;
    const { type } = req.query;

    const query = {};

    if (name) {
      query.exam_name = new RegExp(name, "i");
    }
    if (type) {
      query.exam_type = type;
    }

    const exam = await ExamModal.find(query)
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

exports.getMyresult = catchAsyncError(async (req, res) => {
  const getMyresult = async (userId) => {
    try {
      const query = {
        candidate_id: mongoose.Types.ObjectId(userId),
      };
      const Result = await ResultModal.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "exams",
            localField: "exam_id",
            foreignField: "_id",
            as: "exam",
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      // const CodeingResult = await CodingResultAModal.aggregate([
      //   { $match: query },
      //   {
      //     $lookup: {
      //       from: "exams",
      //       localField: "exam_id",
      //       foreignField: "_id",
      //       as: "exam",
      //     },
      //   },
      //   { $sort: { createdAt: -1 } },
      // ]);
      const Data = [...Result];
      return Data;
    } catch (error) {
      console.log(error);
    }
  };


  
  const Result = await getMyresult(req.user.id);

  return res.status(200).json({
    status: "success",
    message: "result fetch successfully",
    results: {
      Result,
    },
  });
});
