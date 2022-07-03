const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const { AddAssignExam, GetAssignExam } = require("../controller/assignExam");

const router = express.Router();

router
  .route("/assignexam")
  .post(isAuthenticUser, AddAssignExam)
  .get(isAuthenticUser, GetAssignExam);

module.exports = router;