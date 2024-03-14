const mangoose = require("mongoose");

const consultantServiceSchema = new mangoose.Schema({
  services: { type: [{ type: String }], default: [] },  
  consultant_id: { type: String },
}, { timestamps: true });

const ConsultantServices = mangoose.model("ConsultantService", consultantServiceSchema);
module.exports = ConsultantServices;
