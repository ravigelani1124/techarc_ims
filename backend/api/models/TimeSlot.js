const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema(
    {
        day: { type: String, required: [true, "Day is required"] },
        start_time: { type: String, required: [true, "Start time is required"] },
        end_time: { type: String, required: [true, "End time is required"] },
        record_status: { type: Boolean, default: true },    
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
        },
        updated_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
        },
        is_available: { type: Boolean, default: true },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "consultant",
            required: true,
        },
        updated_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "consultant",
            required: true,
        },
    },
    { timestamps: true }
);

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

module.exports = TimeSlot;