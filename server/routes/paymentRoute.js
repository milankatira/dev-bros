const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  /* Sending the stripe api key to the client. */
} = require("../controller/paymentController");
const router = express.Router();
const { isAuthenticUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticUser, processPayment);

router.route("/stripeapikey").get(isAuthenticUser, sendStripeApiKey);

module.exports = router;
