const mongoose = require("mongoose");

const consultantFeesSchema = new mongoose.Schema({
    consultant_fees : { type: Number, default: 100 },
    consultant_id: { type: String }
}, { timestamps: true });


const ConsultantFees = mongoose.model("ConsultantFees", consultantFeesSchema);
module.exports = ConsultantFees;