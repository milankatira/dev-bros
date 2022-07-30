const AssignExamModal = require("../database/assignExam");
const ExamModel = require("../database/exam");
const UserModel = require("../database/userModel");
const GroupModel = require("../database/candidate_group");

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
  try {
    const { id } = req.params;

    const assignExam = await AssignExamModal.findByIdAndUpdate(id, {
      notify: req.body.notify,
    });

    res.status(201).json({
      success: true,
      assignExam,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
