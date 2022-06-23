const mongoose = require("mongoose");
const moment = require("moment");

const bookingSchema = new mongoose.Schema({
  bookingId: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

bookingSchema.path("startTime").validate(function (value) {
  let bikeId = this.bike;
  let newStartTime = new Date(
    moment(value).format("YYYY-MM-DD HH:mm")
  ).getTime();

  return Booking.find({ bike: bikeId }).then((bookings) => {
    return bookings.every((booking) => {
      let existingStartTime = new Date(
        moment(booking.startTime).format("YYYY-MM-DD HH:mm")
      ).getTime();
      if (newStartTime === existingStartTime) {
        throw new Error(
          `Booking could not be saved. There is a clash with an existing booking`
        );
      }
      return false;
    });
  });
}, `{REASON}`);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = {Booking};
