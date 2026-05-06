const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => res.json({ status: 'OK', message: 'Mirema Backend running!' }));

app.get('/api/rooms', (req, res) => {
  // Mock rooms
  res.json([
    { id: 1, name: 'Standard', price: 100 },
    { id: 2, name: 'Deluxe', price: 150 },
    { id: 3, name: 'Suite', price: 250 }
  ]);
});

app.post('/api/bookings', (req, res) => {
  // Mock booking
  res.json({ message: 'Booking created!', id: Date.now() });
});

// Mongo connect (add MONGO_URI to .env)
// Mongo connection (optional - comment out if no local Mongo)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Mongo connection failed (ok for dev):', err.message));
} else {
  console.log('No MONGO_URI - using mock data (production: set .env)');
}


app.listen(PORT, () => console.log(`Server on port ${PORT}`));

