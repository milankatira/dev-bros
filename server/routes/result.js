const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const { AddResult, generateExamReport } = require("../controller/result");

const router = express.Router();

router.route("/submit_exam").post(isAuthenticUser, AddResult);

router.route("/generate_exam_report").post(generateExamReport);

// generateExamReport;
module.exports = router;
