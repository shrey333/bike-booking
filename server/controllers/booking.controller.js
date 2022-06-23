const express = require("express");
const router = express.Router();
const moment = require("moment");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.js");
const { Booking } = require("../models/booking.model.js");
const { Bike } = require("../models/bike.model");

router.get("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  Booking.findById(id)
    .populate("bike")
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json(err));
});

router.get("/", verifyToken, (req, res) => {
  Booking.find({ user: res.locals.userId })
    .populate("bike")
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json(err));
});

router.post("/", verifyToken, (req, res) => {
  const bike = Bike.findById(req.body.bike);
  if (!bike || bike.status) {
    res.status(400).send("Bike is deactivated by admin, try again later");
  }
  Booking.create(req.body)
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
