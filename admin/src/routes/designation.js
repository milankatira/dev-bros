const express = require("express");

const {
  AddDesignation,
  UpdateDesignation,
  DeleteDesignation,
  GetDesignation,
} = require("../controller/designation");

const router = express.Router();

router.route("/designation").get(GetDesignation).post(AddDesignation);

router
  .route("/designation/:id")
  .put(UpdateDesignation)
  .delete(DeleteDesignation);

module.exports = router;
