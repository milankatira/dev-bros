const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  addQuestion,
  getQuestion
} = require("../controller/questions");

const router = express.Router();

router.route("/questions").post(isAuthenticUser, addQuestion);

router.route("/questions/:exam_id").get(isAuthenticUser, getQuestion);

module.exports = router;
