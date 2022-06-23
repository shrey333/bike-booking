const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.js");
const router = express.Router();
const { User } = require("../models/user.model.js");

router.get("/", verifyToken, verifyAdmin, (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", verifyToken, verifyAdmin, (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", verifyToken, verifyAdmin, (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.patch(
  "/change-user-status/:id",
  verifyToken,
  verifyAdmin,
  (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(
      id,
      { $set: { status: !req.body.currentStatus } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

module.exports = router;