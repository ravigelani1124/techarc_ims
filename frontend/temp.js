const express = require('express');
const SunCalc = require('suncalc');

const app = express();
const PORT = 3000;

// API endpoint to determine if it's shiny or dark outside
app.get('/shiny-or-dark', (req, res) => {
  const { latitude, longitude } = req.query;

  // Check if latitude and longitude are provided
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const { sunrise, sunset } = SunCalc.getTimes(new Date(), latitude, longitude);

  // Get current time
  const currentTime = new Date();

  // Determine whether it's shiny or dark
  const isShiny = currentTime > sunrise && currentTime < sunset;

  // Send response
  res.json({ isShiny });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


