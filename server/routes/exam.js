const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const ExamController=require('../controller/exam')

const router = express.Router();


router.route("/exam").get(isAuthenticUser, ExamController.GetAllExam);

router.route("/exam").post(isAuthenticUser, ExamController.AddExam);

router.route("/exam/:id").get(isAuthenticUser, ExamController.getExamById);

router.route("/exam/:id").put(isAuthenticUser, ExamController.UpdateExam);

router.route("/exam/:id").delete(isAuthenticUser, ExamController.deleteExam);

module.exports = router;
