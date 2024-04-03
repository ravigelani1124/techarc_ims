const TimeSlot = require("../models/TimeSlot");
const addTimeSlot = async (req, res) => {
  try {
    const { day, start_time, end_time,  created_by, updated_by } = req.body;
      console.log(day, start_time, end_time)
      if(!day || !start_time || !end_time) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "All fields are required",
        });
      }

    const timeSlot = new TimeSlot({
      day,
      start_time,
      end_time,      
      created_by,
      updated_by,
    });

    await timeSlot.save();

    return res.status(200).json({
      status: "success",
      data: {},
      message: "Time slot added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// create an api to get timeslot by consultat id
// Context from Function backend/api/controllers/bookAppointmentController.js:getTimeSlotById

const getTimeSlotById = async (req, res) => {
  try {
    const { id } = req.params;  
    console.log(id)
    const timeSlot = await TimeSlot.find( { created_by: id });
    return res.status(200).json({
      status: "success",
      data: timeSlot,
      message: "Time slot fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const changeTimeSlotStatus = async (req, res) => {
  try {
    const { id } = req.body;    
    const timeSlot = await TimeSlot.findById(id);
    
    if(timeSlot.is_available === true) {
      await TimeSlot.deleteOne({ _id: id }); // Hard delete the time slot
      return res.status(200).json({
        status: "success",
        data: timeSlot,
        message: "Time slot deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Time slot already booked we can't delete it",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}



module.exports = {
  addTimeSlot,
  getTimeSlotById,
  changeTimeSlotStatus
}