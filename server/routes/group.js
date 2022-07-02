const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");
const {
  AddGroup,
  GetGroup,
  DeleteGroup,
  UpdateGroup,
} = require("../controller/candidateGroup");

const router = express.Router();

router
  .route("/group")
  .get(isAuthenticUser, GetGroup)
  .post(isAuthenticUser, AddGroup);

router
  .route("/group/:id")
  .put(isAuthenticUser, UpdateGroup)
  .delete(isAuthenticUser, DeleteGroup);

router.route("/group/:id");

module.exports = router;
