const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    guestName: { type: String, required: true },
    guestEmail: { type: String, required: true },
    guestPhone: { type: String, required: true },
    roomName: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);