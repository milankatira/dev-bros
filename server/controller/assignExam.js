const AssignExamModal = require("../database/assignExam");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { v4: uuidv4 } = require("uuid");

exports.AddAssignExam = catchAsyncError(async (req, res, next) => {
  try {
  const exam_link = uuidv4();

    const {
      exam_id,
      isGroup,
      id,
      name,
      date,
      start_time,
      end_time,
    } = req.body;
    const assignExam = await AssignExamModal.create({
      exam_id,
      isGroup,
      group_id: id,
      name,
      date,
      start_time,
      end_time,
      exam_link,
    });

    res.status(201).json({
      success: true,
      assignExam,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

