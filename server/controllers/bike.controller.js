const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth.js");
const { Bike } = require("../models/bike.model.js");

router.get("/", verifyToken, (req, res) => {
  Bike.find()
    .then((bikes) => res.json(bikes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  Bike.findById(id)
    .then((bikes) => res.json(bikes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/rating/:id", verifyToken, (req, res) => {
  Bike.aggregate([
    {
      $unwind: {
        path: "$ratings",
      },
    },
    {
      $group: {
        _id: {
          stars: "$ratings.stars",
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        ratings: {
          $push: {
            rating: "$_id.stars",
            count: "$count",
          },
        },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/rating/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const userId = res.locals.userId;
  const bike = Bike.findOne(
    { _id: id },
    { ratings: { $elemMatch: { user: userId } } }
  );
  if (bike) {
    return res.status(400).send("You already given rating to this bike");
  }
  Bike.findByIdAndUpdate(
    id,
    { $push: { ratings: { user: req.body.user, stars: req.body.stars } } },
    { new: true }
  )
    .then((rating) => {
      res.json(rating);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", verifyToken, verifyAdmin, (req, res) => {
  Bike.create(req.body)
    .then((bike) => res.json(bike))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", verifyToken, verifyAdmin, (req, res) => {
  const { id } = req.params;
  Bike.findByIdAndUpdate(id, req.body, { new: true })
    .then((bike) => res.json(bike))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.patch(
  "/change-bike-status/:id",
  verifyToken,
  verifyAdmin,
  (req, res) => {
    const { id } = req.params;
    Bike.findByIdAndUpdate(id, { $set: { status: !req.body.currentStatus } })
      .then((bike) => res.json(bike))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

module.exports = router;