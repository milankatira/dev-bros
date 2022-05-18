const express = require("express");

const {
  AddUserRoll,
  UpdateUserRoll,
  DeleteUserRoll,
  GetUserRoll,
} = require("../controller/user_roll");

const router = express.Router();

router.route("/user_roll").get(GetUserRoll).post(AddUserRoll);

router.route("/user_roll/:id").put(UpdateUserRoll).delete(DeleteUserRoll);

module.exports = router;
