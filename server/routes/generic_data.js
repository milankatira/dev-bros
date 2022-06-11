const express = require("express");

const { GetCity } = require("../controller/city");

const { GetCountry } = require("../controller/country");

const { GetDegree } = require("../controller/degree");

const { GetDesignation } = require("../controller/designation");

const { GetInstitution } = require("../controller/institution");

const { GetPlan } = require("../controller/plan");

const { GetState } = require("../controller/state");

const { GetSubcriptionPlan } = require("../controller/subcription_plans");

const { GetUserRoll } = require("../controller/user_roll");

const { GetSkill } = require("../controller/skill");

const { GetEmployement_type } = require("../controller/employement_type");
const router = express.Router();

router.route("/city").get(GetCity);

router.route("/country").get(GetCountry);

router.route("/degree").get(GetDegree);

router.route("/designation").get(GetDesignation);

router.route("/institution").get(GetInstitution);

router.route("/plan").get(GetPlan);

router.route("/state").get(GetState);

router.route("/subcription_plan").get(GetSubcriptionPlan);

router.route("/user_roll").get(GetUserRoll);

router.route("/skill").get(GetSkill);

router.route("/employement_type").get(GetEmployement_type);

module.exports = router;
