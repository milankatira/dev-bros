const express = require("express");

const {
  AddState,
  UpdateState,
  DeleteState,
  GetState,
} = require("../controller/state");

const router = express.Router();

router.route("/state").get(GetState).post(AddState);

router.route("/state/:id").put(UpdateState).delete(DeleteState);

module.exports = router;
