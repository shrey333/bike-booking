const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  startHour: {
    type: Date,
    required: true,
  },
  endHour: {
    type: Date,
    required: true,
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      stars: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: Boolean,
    default: false,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = {Bike};