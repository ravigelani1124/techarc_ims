const Appointment = require("../models/Appointment");
const UserConsultant = require("../models/UserConsultant");
const User = require("../models/User");
const TimeSlot = require("../models/TimeSlot");

const {  sendUserAppointmentEmail, sendConsultantAppointmentEmail } = require("../utils/email");

async function bookAppointment(req, res) {
    const {
      application_code,
      application_type,
      application_id,
      appsub_code,
      appsub_type,
      appsub_id,
      consultant_code,
      consultant_name,
      consultant_id,
      timeslot_id,
      timeslot_date,
      timeslot_start_time,
      timeslot_end_time,
      user_id,
      user_name,
      consultant_fee,
      documents,
      created_by
    } = req.body;
  
    try {
      const timeslot = await TimeSlot.findOne({ _id: timeslot_id });
      
      if (!timeslot) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "Time slot not found",
        });
      }
  
      timeslot.is_available = false;
  
      await timeslot.save();
  
      const appointment = new Appointment({
        application_code,
        application_type,
        application_id,
        appsub_code,
        appsub_type,
        appsub_id,
        consultant_code,
        consultant_name,
        consultant_id,
        timeslot_id,
        timeslot_date,
        timeslot_start_time,
        timeslot_end_time,
        user_id,
        user_name,
        documents,
        created_by,
        consultant_fee
      });
  
      const consultant = await UserConsultant.findOne({ _id: appointment.consultant_id });

      const user = await User.findOne({ _id: appointment.user_id });

      await Promise.all([
        appointment.save(),
        sendUserAppointmentEmail( appointment, consultant,user),
        sendConsultantAppointmentEmail(appointment, consultant,user),
      ]);
  
      return res.status(200).json({
        status: "success",
        data: appointment,
        message: "Appointment booked successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }


  async function getAppointmentByConsultantId(req, res) {
    try {
      const { id } = req.params;
      console.log("consultant id--------",id);
      const appointments = await Appointment.find({ consultant_id: id });
      
      if (!appointments) {
        return res.status(404).json({
          status: "failed",
          data: {},
          message: "Appointments not found",
        });
      }
      
      const data = []
      for (const appointment of appointments) {      
        const user = await User.findOne({ _id: appointment.user_id });

        const appointmentData ={
          appointment:appointment,
          user:user
        }        
        data.push(appointmentData);
      }
      
      return res.status(200).json({
        status: "success",
        data: data,
        message: "Appointments fetched successfully",
      });  
    }catch (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async function getAppointmentByUserId(req, res) {
    try {
      const { id } = req.params;
      const appointments = await Appointment.find({ created_by: id });
      if (!appointments) {
        return res.status(404).json({
          status: "failed",
          data: {},
          message: "Appointments not found",
        });
      }
  
      const data = []
      for (const appointment of appointments) {      
        const consultant = await UserConsultant.findOne({ _id: appointment.consultant_id });
        const appointmentData ={
          appointment:appointment,
          consultant:consultant
        }        
        data.push(appointmentData);
      }

      return res.status(200).json({
        status: "success",
        data: data,
        message: "Appointments fetched successfully",
      });  
    }catch (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async function changeAppointmentStatus(req, res) {
    const { id } = req.params;
    const { isActive } = req.body;
    const appointment = await Appointment.findOne({ _id: id });
    if (!appointment) {
      return res.status(404).json({
        status: "failed",
        data: {},
        message: "Appointment not found",
      });
    }
    appointment.is_active = isActive;
    await appointment.save();
    return res.status(200).json({
      status: "success",
      data: appointment,
      message: "Appointment status updated successfully",
    });
  }



  

module.exports = { bookAppointment, getAppointmentByConsultantId, getAppointmentByUserId, changeAppointmentStatus };  