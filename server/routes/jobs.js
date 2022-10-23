const { isAuthenticUser } = require("../middleware/auth");

const express = require("express");

const { AddJob, GetAllJobs } = require("../controller/jobs");

const router = express.Router();

router.route("/add-job").post(isAuthenticUser, AddJob);

router.route("/get-job").get(GetAllJobs);

module.exports = router;
