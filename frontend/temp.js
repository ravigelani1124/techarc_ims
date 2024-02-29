// models/TimeSlot.js

const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
// routes/timeSlot.js

const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');

// Create a time slot
router.post('/', async (req, res) => {
  try {
    const timeSlot = await TimeSlot.create(req.body);
    res.status(201).json(timeSlot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all time slots
router.get('/', async (req, res) => {
  try {
    const timeSlots = await TimeSlot.find();
    res.json(timeSlots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add other CRUD routes (GET, PUT, DELETE) as needed

module.exports = router;

// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const timeSlotRouter = require('./routes/timeSlot');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/timeSlots', timeSlotRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
