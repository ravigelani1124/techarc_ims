const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    application_code: {
      type: String,
      required: [true, "Application code is required"],
    },
    application_type: {
      type: String,
      required: [true, "Application type is required"],
    },
    application_id: {
      type: String,
      required: [true, "Application id is required"],
    },

    appsub_code: {
      type: String,
      required: [true, "Application sub code is required"],
    },
    appsub_type: {
      type: String,
      required: [true, "Application sub type is required"],
    },
    appsub_id: {
      type: String,
      required: [true, "Application sub id is required"],
    },

    documents: {
      type: [
        {
          document_code: {
            type: String,
            required: [true, "Document code is required"],
          },
          document_name: {
            type: String,
            required: [true, "Document name is required"],
          },
          record_status: { type: Boolean, default: true },
          is_optional: { type: Boolean, default: false },
        },
      ],
      default: [],
    },

    consultant_id: {
      type: String,
      required: [true, "Consultant id is required"],
    },
    consultant_code: {
      type: String,
      required: [true, "Consultant code is required"],
    },
    consultant_name: {
      type: String,
      required: [true, "Consultant name is required"],
    },

    timeslot_id: {
      type: String,
      required: [true, "Timeslot id is required"],
    },

    timeslot_date: {
      type: String,
      required: [true, "Timeslot date is required"],
    },

    timeslot_start_time: {
      type: String,
      required: [true, "Timeslot start time is required"],
    },

    timeslot_end_time: {
      type: String,
      required: [true, "Timeslot end time is required"],
    },

    user_id: {
      type: String,
      required: [true, "User id is required"],
    },

    user_name: {
      type: String,
      required: [true, "User name is required"],
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    consultant_fee : { type: Number, required: true },
    is_active : { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;