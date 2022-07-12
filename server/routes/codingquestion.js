const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const { addQuestion } = require("../controller/codingquestion");

const router = express.Router();

router
  .route("/codingquestion/:exam_id")
  .put(isAuthenticUser, addQuestion)
  .post(isAuthenticUser, addQuestion)
  .get(isAuthenticUser, addQuestion);

module.exports = router;
