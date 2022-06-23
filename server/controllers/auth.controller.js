const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Token } = require("../models/user.model");
const crypto = require("crypto");
const sendEmail = require("../utils/sendemail");

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).send("Invalid email or password");
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result) {
              const token = jwt.sign(
                { id: user._id, userType: user.userType },
                "secretKEY"
              );
              res
                .status(200)
                .send({ token: token, id: user._id, userType: user.userType });
            } else {
              res.status(401).send("Invalid password");
            }
          })
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/signup", (req, res) => {
  if (req.body.userType) {
    res.status(200).send("UserType field is not expected");
  } else {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      req.body.password = hash;
      User.create(req.body)
        .then(async (user) => {
          let token = await new Token({
            userId: user._id,
            token: (Math.random() + 1).toString(36).substring(7),
          }).save();
          console.log(token.token);
          await sendEmail(
            user.email,
            "Verify your account",
            `Your verification code is ${token.token}`
          );
          res.send("An Email is sent to your account for verification");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    });
  }
});

router.get("/resend-verify/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("Invalid user");

  const oldToken = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (oldToken) {
    await Token.findByIdAndRemove(oldToken._id);
  }
  let token = await new Token({
    userId: user._id,
    token: (Math.random() + 1).toString(36).substring(7),
  }).save();
  console.log("email code--->", token.token);
  // await sendEmail(
  //   user.email,
  //   "Verify your account",
  //   `Your verification code is ${token.token}`
  // );
  res.send("An Email is sent to your account for verification");
});

router.get("/verify/:id/:token", async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid user");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid verification code");

    await User.findByIdAndUpdate(
      user._id,
      { $set: { emailVerified: true } },
      { new: true }
    );
    await Token.findByIdAndRemove(token._id);

    res.send("email verified successfully");
  } catch (error) {
    res.status(400).send("An error occurred");
  }
});

module.exports = router;