const AssignExamModal = require("../database/assignExam");
const ExamModel = require("../database/exam");
// ExamModal
const UserModel = require("../database/userModel");
const GroupModel = require("../database/candidate_group");
const AssignExamModel = require("../database/assignExam");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
exports.AddAssignExam = catchAsyncError(async (req, res, next) => {
  try {
    const exam_link = uuidv4();

    const { exam_id, isGroup, id, name, date, start_time, end_time } = req.body;
    //candidate_id
    let assignExam;
    if (isGroup) {
      assignExam = await AssignExamModal.create({
        exam_id,
        isGroup,
        group_id: id,
        name,
        date,
        start_time,
        end_time,
        exam_link,
      });
    } else {
      assignExam = await AssignExamModal.create({
        exam_id,
        isGroup,
        candidate_id: id,
        name,
        date,
        start_time,
        end_time,
        exam_link,
      });
    }
    res.status(201).json({
      success: true,
      assignExam,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.GetAssignExam = catchAsyncError(async (req, res, next) => {
  try {
    const assignExam = await AssignExamModal.find({
      company_id: req.user.id,
    });
    res.status(201).json({
      success: true,
      assignExam,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getAssignCandidate = catchAsyncError(async (req, res, next) => {
  try {
    const query = {
      user_id: mongoose.Types.ObjectId(req.user.id),
    };

    const exams = await ExamModel.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "assigned_candidates",
          localField: "_id",
          foreignField: "exam_id",
          as: "candidates",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    const examList = await ExamModel.populate(exams, {
      path: "candidates.candidate_id",
      model: UserModel,
      GroupModel,
      select: "name email phone",
    });

    const examData = await ExamModel.populate(examList, {
      path: "candidates.group_id",
      model: GroupModel,
      select: "candiidates",
      populate: {
        path: "candidates",
        model: UserModel,
        select: "name email phone",
      },
    });

    res.status(201).json({
      success: true,
      assignExam: examData,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.updateNotifyStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const assignExam = await AssignExamModal.findByIdAndUpdate(id, {
    notify: req.body.notify,
  });

  res.status(201).json({
    success: true,
    assignExam,
  });
});

exports.getMcqQuestion = catchAsyncError(async (req, res, next) => {
  const { exam_id } = req.params;
  const query1 = {
    exam_id: mongoose.Types.ObjectId(exam_id),
  };
  const query = {
    _id: mongoose.Types.ObjectId(exam_id),
  };

  const examData = await ExamModel.findById(exam_id);
  const exam = await ExamModel.aggregate([
    { $match: query },
    {
      $lookup: {
        from: "questions",
        as: "questions",
        pipeline: [
          { $match: query1 },
          { $sample: { size: examData.totalQuestion } },
        ],
      },
    },
    {
      $project: {
        date: 1,
        description: 1,
        end_time: 1,
        exam_name: 1,
        exam_type: 1,
        start_time: 1,
        total_mark: 1,
        user_id: 1,
        _id: 1,
        "questions._id": 1,
        "questions.question": 1,
        "questions.mcqs": 1,
        "questions.level": 1,
      },
    },
  ]);

  res.status(201).json({
    success: true,
    exam,
  });
});
