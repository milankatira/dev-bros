const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  AddAssignExam,
  GetAssignExam,
  getAssignCandidate,
  updateNotifyStatus,
  getMcqQuestion,
} = require("../controller/assignExam");

const router = express.Router();

router
  .route("/assignexam")
  .post(isAuthenticUser, AddAssignExam)
  .get(isAuthenticUser, GetAssignExam);

router.route("/assigncandidate").get(isAuthenticUser, getAssignCandidate);
router.route("/examquestion/:exam_id").get(getMcqQuestion);

router.route("/notify/:id").post(isAuthenticUser, updateNotifyStatus);
// :exam_id/:examlink
// getMcqQuestion;
module.exports = router;
