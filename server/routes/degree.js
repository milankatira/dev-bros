const express = require("express");

const {
  AddDegree,
  UpdateDegree,
  DeleteDegree,
  GetDegree,
} = require("../controller/degree");

const router = express.Router();

router.route("/degree").get(GetDegree).post(AddDegree);

router.route("/degree/:id").put(UpdateDegree).delete(DeleteDegree);

module.exports = router;
