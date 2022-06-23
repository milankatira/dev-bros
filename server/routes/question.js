const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  addQuestion,
} = require("../controller/questions");

const router = express.Router();

router.route("/questions").post(isAuthenticUser, addQuestion);

module.exports = router;
