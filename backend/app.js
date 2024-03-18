const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const TimeSlot = require('./api/models/TimeSlot');
const cron = require("node-cron");
const moment = require("moment");

const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const dbName = process.env.MONGO_DBNAME || 'techarc';

const authRoutes = require('./api/routes/authRoutes');
const organizationRoute = require('./api/routes/organizationRoute');
const serviceRoute = require('./api/routes/serviceRoute');
const bookAppointmentRoute = require('./api/routes/bookAppointmentRoute');
const appicationRoute = require('./api/routes/applicationRoute');
const documentRoute = require('./api/routes/documentRoute');
app.set('view engine', 'ejs'); 

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}${dbName}`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/organization', organizationRoute);
app.use('/api/visatype', serviceRoute);
app.use('/api/bookappointment', bookAppointmentRoute);
app.use('/api/application', appicationRoute);
app.use('/api/document', documentRoute);


cron.schedule("* * * * *", async () => {
  try {
    const currentTime = moment(); // Get current date and time

    // Find time slots where current time exceeds end time
    const outdatedTimeSlots = await TimeSlot.find({
      record_status: true, // Select only active time slots
    });  

    // Update record_status of outdated time slots
    for (const timeSlot of outdatedTimeSlots) {
      const endDate = moment(`${timeSlot.date} ${timeSlot.end_time}`, "DD/MM/YYYY HH:mm");
      console.log("End date:", endDate);
      if (currentTime.isAfter(endDate)) {
        timeSlot.record_status = false;
        console.log("Time slot updated:", timeSlot);
        await timeSlot.save();
      }
    }

    console.log("Record statuses updated successfully.");
  } catch (error) {
    console.error("Error updating record statuses:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

