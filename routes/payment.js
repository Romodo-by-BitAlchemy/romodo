const express = require("express");
const { processPayments } = require("../controller/paymentController");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayments);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;