const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  addQuestion,
  getQuestion,
  RemoveQuestion
} = require("../controller/questions");

const router = express.Router();

router.route("/questions").post(isAuthenticUser, addQuestion);

router.route("/removequestions").post(isAuthenticUser, RemoveQuestion);

router.route("/questions/:exam_id").get(isAuthenticUser, getQuestion);

module.exports = router;
