const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  userType: {
    type: Number,
    default: 0,
  },
});

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  },
  token: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Token = mongoose.model("token", tokenSchema);

module.exports = { User, Token };