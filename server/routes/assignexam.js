const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  AddAssignExam,
  GetAssignExam,
  getAssignCandidate,
  updateNotifyStatus,
} = require("../controller/assignExam");

const router = express.Router();

router
  .route("/assignexam")
  .post(isAuthenticUser, AddAssignExam)
  .get(isAuthenticUser, GetAssignExam);

router.route("/assigncandidate").get(isAuthenticUser, getAssignCandidate);

router.route("/notify/:id").post(isAuthenticUser, updateNotifyStatus);

module.exports = router;
