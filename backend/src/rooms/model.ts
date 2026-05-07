import mongoose, { Schema } from 'mongoose';

export interface RoomDoc extends mongoose.Document {
  name: string;
  description?: string;
  price: number;
  capacity: number;
  amenities?: string[];
  imageUrl?: string;
  isActive: boolean;
}

const roomSchema = new Schema<RoomDoc>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    amenities: [{ type: String, trim: true }],
    imageUrl: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<RoomDoc>('Room', roomSchema);
