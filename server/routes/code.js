const express = require("express");
const { isAuthenticUser } = require("../middleware/auth");

const { compileCode } = require("../controller/code");

const router = express.Router();

router.route("/compilecode").post(isAuthenticUser, compileCode);

module.exports = router;
