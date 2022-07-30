const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  AddResult
} = require("../controller/result");

const router = express.Router();

router.route("/submit_exam").post(isAuthenticUser, AddResult);

module.exports = router;