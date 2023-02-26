const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const { AddResult, generateExamReport, updateResultController, getCandidateStatus } = require("../controller/result");

const router = express.Router();

router.route("/submit_exam").post(isAuthenticUser, AddResult);

router.route("/generate_exam_report").post(generateExamReport);

router.route("/update_exam_report").post(updateResultController);

router.route("/getStatus/:assign_exam_id").get(getCandidateStatus);

module.exports = router;
