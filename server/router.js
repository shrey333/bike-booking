const express = require("express");
const router = express.Router();

const bookingController = require("./controllers/booking.controller.js");
const userController = require("./controllers/user.controller.js");
const bikeController = require("./controllers/bike.controller.js");
const authController = require("./controllers/auth.controller.js");

router.use("/booking", bookingController);
router.use("/user", userController);
router.use("/bike", bikeController);
router.use("/auth", authController);

module.exports = router;
