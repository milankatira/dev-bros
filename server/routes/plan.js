const express = require("express");

const {
  AddPlan,
  UpdatePlan,
  DeletePlan,
  GetPlan,
} = require("../controller/plan");

const router = express.Router();

router.route("/plan").get(GetPlan).post(AddPlan);

router.route("/plan/:id").put(UpdatePlan).delete(DeletePlan);

module.exports = router;
