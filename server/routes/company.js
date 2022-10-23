const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  AddCompany,
  getCompany,
  updateCompany,
} = require("../controller/company");

const router = express.Router();

router.route("/company").get(isAuthenticUser, getCompany);

router.route("/company").post(isAuthenticUser, AddCompany);

router.route("/company").put(isAuthenticUser, updateCompany);

module.exports = router;
