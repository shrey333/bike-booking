const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("unauthorized request");
  }
  let payload = jwt.verify(token, "secretKEY");
  if (!payload) {
    return res.status(401).send("unauthorized request");
  }
  res.locals.userType = payload.userType;
  res.locals.userId = payload.id;
  User.findById(payload.id)
    .then((user) => {
      if (!user.emailVerified) {
        return res.status(400).send("Email is not verified yet");
      }
      if (user.status) {
        return res.status(400).send("Please wait until admin verifies you");
      }
      next();
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

function verifyAdmin(req, res, next) {
  console.log(res.locals);
  if (res.locals.userType !== 1) {
    return res.status(401).send("unauthorized request");
  }
  next();
}

module.exports = { verifyToken, verifyAdmin };