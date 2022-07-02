const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const { AddAssignExam } = require("../controller/assignExam");

const router = express.Router();

router.route("/assignexam").post(isAuthenticUser, AddAssignExam);

module.exports = router;