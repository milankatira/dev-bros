const express = require("express");

const {
  AddCountry,
  UpdateCountry,
  DeleteCountry,
  GetCountry,
} = require("../controller/country");

const router = express.Router();

router.route("/country").get(GetCountry).post(AddCountry);

router.route("/country/:id").put(UpdateCountry).delete(DeleteCountry);

module.exports = router;
