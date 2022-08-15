const express = require("express");

const {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  GetInstitution,
} = require("../controller/institution");

const router = express.Router();

router.route("/institution").get(GetInstitution).post(AddInstitution);

router.route("/institution/:id").put(UpdateInstitution).delete(DeleteInstitution);

module.exports = router;
