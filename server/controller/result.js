const ResultModal = require("../database/result");
const UserModel = require("../database/userModel");
const AssignModel=require("../database/assignExam");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const path = require("path");
const hogan = require("hogan.js");
const fs = require("fs");
const moment = require("moment");
const sendExamEmail = require("../helpers/email");
const AssignModal = require("../database/assignExam");
const ExamModal = require("../database/exam");
const GroupModel=require("../database/candidate_group");
const { status } = require("../constant/status");

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

exports.generateExamReport = catchAsyncError(async (req, res) => {
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

  if (results && results.length > 0) {
    const newReport = Promise.all(
      results.map(async (result) => {
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
          ).populate({
            path: "candidate_id",
            model: UserModel,
            select: "firstName lastName email phoneNo",
          });
          return newResult;
        }
      })
    );
    const reportDetails = new Promise((resolve) => {
      resolve(newReport);
    });

    const newGeneratedReport = await reportDetails;
    res.status(201).json({
      success: true,
      results: newGeneratedReport,
    });
  } else {
    const getReportdata = async (resultData) => {
      const { assign_exam_id } = resultData;

      const results = await ResultModal.find({
        assign_exam_id,
      }).populate({ path: "candidate_id", select: "name email phone" });
      return results;
    };

    const existingReport = await getReportdata(req.body);
    res.status(201).json({
      success: true,
      results: existingReport,
    });
  }
});

exports.updateResultController = catchAsyncError(async (req, res) => {
  const { id, user_marks, assign_exam_id } = req.body;
  const findExamDetails = async (resultData) => {
    const { assign_exam_id } = resultData;
    const exam = await AssignModal.findById(assign_exam_id).populate({
      path: "exam_id",
      model: ExamModal,
      select: "description exam_type user_id",
      populate: {
        path: "user_id",
        model: UserModel,
        select: "phone email company_id",
        // populate: {
        //   path: "company_id",
        //   model: UserModel,
        // },
      },
    });

    return exam;
  };

  const updateResult = async (id, user_marks) => {
    const exam = await ResultModal.findById(id).populate("exam_id");
    if (exam) {
      const passingMark = exam.exam_id.passing_mark;
      const isPassed = passingMark <= user_marks;
      const newResult = await ResultModal.findByIdAndUpdate(
        id,
        {
          user_marks,
          total: exam.exam_id.total_mark,
          passing_marks: exam.exam_id.passing_mark,
          is_passed: isPassed,
        },
        { new: true }
      ).populate({ path: "candidate_id", select: "name email phone" });
      return newResult;
    }
  };

  const generatesReport = await updateResult(id, user_marks, assign_exam_id);
  if (generatesReport) {
    const email = [];
    // eslint-disable-next-line array-callback-return
    if (generatesReport.is_passed) {
      email.push(generatesReport.candidate_id.email);
    }
    if (email.length > 0) {
      const packet = {
        assign_exam_id,
      };
      const examDetails = await findExamDetails(packet);
      const template = fs.readFileSync(
        path.join(__dirname, "../email-template", "email_passed_exam.hjs"),
        "utf-8"
      );
      const compiledTemplate = hogan.compile(template);

      let singleMail;
      if (email.length === 1) {
        singleMail = true;
      } else {
        singleMail = false;
      }

      await sendExamEmail(
        singleMail,
        email,
        email,
        `Hirefast-Result declaration from ${examDetails.name}`,
        "",
        compiledTemplate.render({
          examDetails,
          date: moment(examDetails.date).format("DD/MM/YYYY"),
        })
      );
    }
    // return generatesReport;

    res.status(201).json({
      success: true,
      results: generatesReport,
    });
  }
});

exports.getCandidateStatus = catchAsyncError(async (req, res) => {
  
    const { assign_exam_id } = req.params;

    const getCandidateStatus = async (assign_exam_id) => {
      try {
        const examData = await AssignModel.findById(assign_exam_id);

        await AssignModel.populate(examData, {
          path: "candidate_id",
          model: UserModel,
          select: "firstName lastName email phone",
        });

        await AssignModel.populate(examData, {
          path: "exam_id",
          model: ExamModal,
          select: "exam_type",
        });
        const exam = await AssignModel.populate(examData, {
          path: "group_id",
          model: GroupModel,
          select: "candiidates",
          populate: {
            path: "candidates",
            model: UserModel,
            select: "firstName lastName email phone",
          },
        });
        let results;

        // if (examData.exam_id.exam_type === exam_type.MCQ) {
          results = await ResultModal.find({
            assign_exam_id,
          }).populate({ path: "candidate_id", select: "name email phone" });
        // } else {
        //   results = await CodingResultModal.find({
        //     assign_exam_id,
        //   }).populate({ path: "candidate_id", select: "name email phone" });
        // }

        const resultData = [];

        await results.forEach((result) => {
          resultData.push({
            user: result.candidate_id,
            result: result.is_passed,
            status: result.status,
            user_marks: result.user_marks,
          });
        });

        if (!examData.isGroup) {
          const ResultData = resultData.filter(
            (d) => String(d.user._id) === String(examData.candidate_id._id)
          );
          if (ResultData.length > 0) {
            if (ResultData[0].user_marks == null) {
              return [
                { status: ResultData[0].status, user: examData.candidate_id },
              ];
            }
            return [
              {
                status: ResultData[0].result ? status.pass : status.fail,
                user: examData.candidate_id,
              },
            ];
          }
          return [{ status: status.notStarted, user: examData.candidate_id }];
        }

        const GroupexamReport = await exam.group_id.candidates.map((user) => {
          const ResultData = resultData.filter(
            (d) => String(d.user._id) === String(user._id)
          );
          if (ResultData.length > 0) {
            if (ResultData[0].user_marks == null) {
              return { status: ResultData[0].status, user };
            }
            return {
              status: ResultData[0].result ? status.pass : status.fail,
              user,
            };
          }
          return { status: status.notStarted, user };
        });

        return GroupexamReport;
      } catch (error) {
        console.log("error", error);
      }
    };

    const exams = await getCandidateStatus(assign_exam_id);
    return res.status(200).json({
      status: "success",
      message: "suucessss",
      results: {
        exams,
      },
    });
});
