const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'member'], default: 'member' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

