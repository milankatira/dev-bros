const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  addQuestion,
  getcodingquestion,
  getcodingquestionbyId,
  updateQuestion,
} = require("../controller/codingquestion");

const router = express.Router();

router
  .route("/codingquestion/:exam_id")
  .put(isAuthenticUser, addQuestion)
  .post(isAuthenticUser, addQuestion)
  .get(isAuthenticUser, getcodingquestion);

router
  .route("/singlecodingquestion/:_id")
  .get(isAuthenticUser, getcodingquestionbyId)
  .put(isAuthenticUser, updateQuestion);

module.exports = router;
