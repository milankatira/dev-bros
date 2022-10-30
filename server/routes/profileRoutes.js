const express = require("express");

const {
  Create_profile,
  Get_profile,
  Update_profile,
} = require("../controller/profileController");

const { isAuthenticUser } = require("../middleware/auth");

const router = express.Router();

router.route("/create").post(isAuthenticUser, Create_profile);

router.route("/update-profile").post(isAuthenticUser, Update_profile);

router.route("/get-profile").get(isAuthenticUser, Get_profile);

module.exports = router;
