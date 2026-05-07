import mongoose, { Schema } from 'mongoose';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface BookingDoc extends mongoose.Document {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: BookingStatus;
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
}

const bookingSchema = new Schema<BookingDoc>(
  {
    guestName: { type: String, required: true },
    guestEmail: { type: String, required: true },
    guestPhone: { type: String, required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    notes: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Enforce checkOut > checkIn
bookingSchema.path('checkOut').validate(function (value: Date) {
  // this refers to the document being validated
  return this.checkIn instanceof Date && value > this.checkIn;
}, 'Check-out date must be after check-in date');

export default mongoose.model<BookingDoc>('Booking', bookingSchema);