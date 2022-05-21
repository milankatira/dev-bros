const express = require("express");

const {
  AddCity,
  UpdateCity,
  DeleteCity,
  GetCity,
  GetCityByid,
} = require("../controller/city");

const router = express.Router();

router.route("/city").get(GetCity).post(AddCity);

router.route("/city/:id").get(GetCityByid).put(UpdateCity).delete(DeleteCity);

module.exports = router;
