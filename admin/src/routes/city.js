const express = require("express");

const {
  AddCity,
  UpdateCity,
  DeleteCity,
  GetCity,
} = require("../controller/city");

const router = express.Router();

router.route("/city").get(GetCity).post(AddCity);

router.route("/city/:id").put(UpdateCity).delete(DeleteCity);

module.exports = router;
