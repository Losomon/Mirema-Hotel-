import mongoose, { Schema } from 'mongoose';

export type UserRole = 'admin' | 'member';

export interface UserDoc extends mongoose.Document {
  email: string;
  passwordHash: string;
  role: UserRole;
}

const userSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'member'],
      default: 'member'
    }
  },
  { timestamps: true }
);

export default mongoose.model<UserDoc>('User', userSchema);

