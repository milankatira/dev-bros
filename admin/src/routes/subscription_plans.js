const express = require("express");

const {
  AddSubcriptionPlan,
  UpdateSubcriptionPlan,
  DeleteSubcriptionPlan,
  GetSubcriptionPlan,
} = require("../controller/subcription_plans");

const router = express.Router();

router
  .route("/subcription_plan")
  .get(GetSubcriptionPlan)
  .post(AddSubcriptionPlan);

router
  .route("/subcription_plan/:id")
  .put(UpdateSubcriptionPlan)
  .delete(DeleteSubcriptionPlan);

module.exports = router;
