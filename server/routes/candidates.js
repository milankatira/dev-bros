const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const { GetCandidates } = require("../controller/candidates");

const router = express.Router();

router.route("/candidates").get(isAuthenticUser, GetCandidates);

module.exports = router;
